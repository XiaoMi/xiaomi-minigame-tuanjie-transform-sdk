using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using UnityEngine.UIElements;
using UnityEditor.PackageManager;
using PackageInfo = UnityEditor.PackageManager.PackageInfo;
using System.Reflection;
using Process = System.Diagnostics.Process;
using System.Threading;
using System;
using System.Threading.Tasks;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
//using UnityEngine.Windows;
using System.Linq;

namespace miqgame.editor
{
    public enum MiCLIMsgType
    {
        Action,
        StdOutput,
        ErrOutput,
        WarnOutput,
        Failed,
        Success,
        Finish
    }

    public class MiCLIWindow : EditorWindow
    {
        private static VisualTreeAsset micliWindowAsset = default;
        private static VisualTreeAsset listItemAsset = default;
        string gameDir;
        public EditorScriptObject config;
        Label gameDirLabel;

        ScrollView logListView;

        public static Color evenLineColor = new Color32(56, 56, 56, 255);
        public static Color oddLineColor = new Color32(63, 63, 63, 255);

        public Process process { private set; get; }
        public static Task currentTask { private set; get; }
        static Queue<(MiCLIMsgType, string, object)> cliMsgQueue = new Queue<(MiCLIMsgType, string, object)>();


        static MiCLIWindow()
        {
        }

        static Process CreatePlatformCmdProcess(string command, string workdir = null)
        {
#if UNITY_EDITOR_WIN
            var args = $"/c {command}";
            return UnityUtil.CreateCmdProcess("cmd.exe ",args , workdir, false);
#elif UNITY_EDITOR_OSX
            var shell = Environment.GetEnvironmentVariable("SHELL") ?? "/bin/zsh";
            return UnityUtil.CreateCmdProcess(shell, $"-li -c '{command}'", workdir, false);
#endif
        }

        static void OpenFolder(string path)
        {
#if UNITY_EDITOR_WIN
            UnityUtil.CreateCmdProcess("explorer.exe", path);
#elif UNITY_EDITOR_OSX
            UnityUtil.CreateCmdProcess("open", path);
#endif
        }

        public string CheckNpmVersion()
        {
            //Process process = null;
            LogInfo("检查npm...");
            using (var process = CreatePlatformCmdProcess("npm --version", gameDir))
            {
                var sbOut = new StringBuilder();
                var sbErr = new StringBuilder();
                process.OutputDataReceived += (sender, args) =>
                {
                    if (args.Data != null) sbOut.Append(args.Data);

                };

                process.ErrorDataReceived += (sender, args) =>
                {
                    if (args.Data != null)
                    {
                        LogErr(args.Data.ToString());
                    }
                };
                process.Start();
                process.BeginOutputReadLine();
                process.BeginErrorReadLine();
                process.WaitForExit();
                //process.Close();
                return process.ExitCode == 0 ? sbOut.ToString() : null;
            }
        }

        public int NpmInstall()
        {
            LogInfo("npm install");
            using (var process = CreatePlatformCmdProcess("npm install -D", gameDir))
            {

                var sbOut = new StringBuilder();
                var sbErr = new StringBuilder();
                process.OutputDataReceived += (sender, args) =>
                {
                    LogInfo(args.Data);
                    if (args.Data != null) sbOut.AppendLine(args.Data);
                };

                process.ErrorDataReceived += (sender, args) =>
                {
                    if (args.Data != null && args.Data.Length>0)
                    {
                        sbErr.AppendLine(args.Data);
                    }
                    else
                    {
                        return;
                    }
                    if(args.Data.Contains("npm warn"))
                    {
                        return;
                    }
                    LogErr(args.Data);
                };
                process.Start();
                process.BeginOutputReadLine();
                process.BeginErrorReadLine();
                process.WaitForExit();
                return process.ExitCode;
            }
        }

        public string CheckQGVersion()
        {
            LogInfo("检查quickgame-cli...");
            using (var process = CreatePlatformCmdProcess("qg --version", gameDir))//
            {
                string version = null;
                process.OutputDataReceived += (sender, args) =>
                {
                    if (args.Data != null)
                    {
                        Match match = Regex.Match(args.Data, @"\d+\.\d+\.\d+");
                        if (match.Success)
                        {
                            version = args.Data;
                        }
                    }
                };

                process.ErrorDataReceived += (sender, args) =>
                {
                    if (args.Data != null)
                    {
                        LogErr(args.Data.ToString());
                    }
                };
                process.Start();
                process.BeginOutputReadLine();
                process.BeginErrorReadLine();
                process.WaitForExit();
                //process.Close();
                return version;
            }
        }

        public int NpmInstallQG()
        {
            LogInfo("npm install quickgame-cli...");
            using (var process = CreatePlatformCmdProcess("npm install -g @quick-game/cli", gameDir))
            {
                process.OutputDataReceived += (sender, args) =>
                {
                    LogInfo(args.Data);
                };

                process.ErrorDataReceived += (sender, args) =>
                {
                    //if (args.Data != null && args.Data.Length > 0)
                    if (args.Data != null && args.Data.Contains("npm warn"))
                    {
                        LogWarn(args.Data);
                        return;
                    }
                    LogErr(args.Data);
                };
                process.Start();
                process.BeginOutputReadLine();
                process.BeginErrorReadLine();
                process.WaitForExit();
                return process.ExitCode;
            }
        }

        public int QuickGameBuild()
        {
            Debug.Log("start QuickGameBuild");
            var isDebug = true;// 
            if (config != null)
            {
                isDebug = config.ProjectConf.buildType == 0;
            }
            var cmd = isDebug ? "qg build" : "qg release"; 
            LogInfo(isDebug ? "构建Debug rpk..." : "构建release rpk..."); 
            using (var process = CreatePlatformCmdProcess(cmd, gameDir))
            {
                process.OutputDataReceived += (sender, arg) =>
                {
                    LogInfo(RemoveEscape(arg.Data) );
                };
                process.ErrorDataReceived += (sender, arg) =>
                {
                    if (arg.Data != null)
                    {
                        if (arg.Data.Contains("[WARN]"))
                        {
                            LogWarn(arg.Data);
                        }
                        else
                        {
                            LogErr(arg.Data);
                        }
                    }
                };
                process.Start();
                process.BeginOutputReadLine();
                process.BeginErrorReadLine();

                process.WaitForExit();
                return process.ExitCode;
            }
        }

        public void PostBuild()
        {
            currentTask = null;
        }

        public void StartBuild(string path)
        {
            Debug.Log("Start Quick Game Build");
            gameDir = Path.GetFullPath(path) ;// ;
            gameDirLabel.text = $"游戏工程目录:{gameDir}"; ;
            if (Directory.Exists(gameDir) == false)
            {
                Debug.LogWarning($"游戏目录:{gameDir} 不存在!!!");
                return;
            }
            currentTask = Task.Run(() =>
            {
                var frameworkFile = Path.Combine(path, "webgl.wasm.framework.unityweb.js");
                if (File.Exists(frameworkFile))
                {
                    File.Move(frameworkFile, Path.Combine(path, "src", "webgl.wasm.framework.unityweb.js"));
                    Debug.Log("move OK");
                }
                //用于记录构建时间Task
                var timeCount = Task.Run(() =>
                {
                    var startBuildTime = DateTime.Now;
                    while (currentTask!=null)
                    {
                        EditorApplication.delayCall += () =>
                        {
                            var duration = DateTime.Now - startBuildTime;                            
                            stateLabel.text = $"构建中...[{duration.ToString(@"hh\:mm\:ss")}]";
                        };
                        Thread.Sleep(1000);
                    }
                    EditorApplication.delayCall += () =>
                    {
                        var duration = DateTime.Now - startBuildTime;
                        stateLabel.text = $"构建结束[{duration.ToString(@"hh\:mm\:ss")}]";
                        var path = Path.Combine(gameDir, "dist");
                        Debug.Log(path.ToString());
                        if (Directory.Exists(path))
                        {
                            OpenFolder(Path.GetFullPath(path));
                        }
                    };
                });
                var versionNPM = CheckNpmVersion();
                if (versionNPM == null)
                {
                    LogErr("无法运行npm，请检查NodeJS安装状态和环境变量配置");
                    currentTask = null;
                    return;
                }
                else
                {
                    LogInfo($"npm version:{versionNPM}");
                }
                var versionQG = CheckQGVersion();
                if (versionQG != null)
                {
                    LogInfo($"quickgame-cli version:{versionQG}");
                    Debug.Log($"quickgame-cli version:{versionQG}");
                }
                else
                {
                    LogInfo($"未检测到quickgame-cli，开始安装...");
                    var installExitCode = NpmInstallQG();
                    Debug.Log($"[npm install quickgame-cli]finished with exitCode:{installExitCode}");
                    if (installExitCode != 0) {
                        LogErr($"quickgame安装失败，请确认网络情况并再次尝试构建或者手动安装");
                        currentTask = null;
                        return;
                    }
                }                
                var exitCode = QuickGameBuild();
                Debug.Log($"[npm run]finished with exitCode:{exitCode}");
                PostBuild();
            });
        }

        public static void StartQuickGameBuild(EditorScriptObject config)
        {         
            var path = Path.GetFullPath(Path.Combine(config.ProjectConf.DST, "minigame"));
            StartQuickGameBuild(path,config);
        }

        public static void StartQuickGameBuild(string path,EditorScriptObject config = null)
        {
            var wnd = ShowWindow() as MiCLIWindow;
            wnd.config = config;
            if (currentTask != null)
            {
                Debug.Log("已有1个构建命令正在运行");
                return;
            }
            wnd.StartBuild(path);
        }

        public static EditorWindow ShowWindow(Process process = null, string title = "快游戏打包")
        {
            MiCLIWindow wnd = GetWindow<MiCLIWindow>();
            wnd.titleContent = new GUIContent($"{title}");//
            return wnd;
        }

        private void OnEnable()
        {
            PackageInfo packageInfo = PackageInfo.FindForAssembly(Assembly.GetExecutingAssembly());
            micliWindowAsset = AssetDatabase.LoadAssetAtPath<VisualTreeAsset>(packageInfo.assetPath + "/Editor/UI/MiQGameBuildCLIMain.uxml");
            listItemAsset = AssetDatabase.LoadAssetAtPath<VisualTreeAsset>(packageInfo.assetPath + "/Editor/UI/OutputListItem.uxml");
            //if (packageInfo != null)
            //{
            //    Debug.Log("info " + packageInfo.assetPath);
            //    Debug.Log("info " + packageInfo.resolvedPath);
            //}
        }

        private void OnDisable()
        {
            //EditorApplication.delayCall -= delayCallback;

        }

        private void OnGUI()
        {
            //Debug.Log("size " + position);
        }
        Label stateLabel;

        public void CreateGUI()
        {
            VisualElement root = rootVisualElement;
            VisualElement main = micliWindowAsset.Instantiate();
            root.Add(main);
            gameDirLabel = root.Q<Label>("gameDir");
            logListView = root.Q<ScrollView>();
            stateLabel = root.Q<Label>("QBuildState");
            stateLabel.text = "";
            var openDist = root.Q<Button>("openDist");
        }

        public void LogOutput(string output, Color txtColor)
        {
            lock (cliMsgQueue)
            {
                cliMsgQueue.Enqueue((MiCLIMsgType.StdOutput, output, txtColor));
                EditorApplication.delayCall += ProcessOutput;
            }
        }

        public void LogInfo(string line)
        {
            LogOutput(line, Color.white);
        }

        public void LogErr(string line)
        {
            LogOutput(line, Color.red);
        }


        public void LogWarn(string line)
        {
            LogOutput(line, Color.yellow);
        }

        public void NotifyCLIBuildFinished(MiCLIMsgType type, string info)
        {
            lock (cliMsgQueue)
            {
            }
        }

        void ProcessOutput()
        {
            lock (cliMsgQueue)
            {
                while (cliMsgQueue.Count > 0)
                {
                    var (type, info, obj) = cliMsgQueue.Dequeue();

                    switch (type)
                    {
                        case MiCLIMsgType.StdOutput:
                        case MiCLIMsgType.ErrOutput:
                            {
                                if (info == null || info.Length < 1)
                                {
                                    continue;
                                }
                                string outputStr = new string(info.Where(
                                    c => {
                                        if (char.IsControl(c))
                                        {
                                            return false;
                                        }
                                        if (char.GetUnicodeCategory(c) == System.Globalization.UnicodeCategory.Control)
                                        {
                                            return false;
                                        }
                                        return true;
                                        }
                                ).ToArray());
                                outputStr = outputStr.Replace(@"\", @"/");
                                var logContent = $"[{DateTime.Now:HH:mm:ss}] {outputStr}";
                                var col = (Color)obj;
                                AddLogItemToListView(logContent, col);

                            }
                            break;
                        case MiCLIMsgType.Success:
                            break;
                        case MiCLIMsgType.Failed:
                            break;
                    }
                }
            }
        }

        void AddLogItemToListView(string content,Color color)
        {
            VisualElement item = listItemAsset.Instantiate();
            var label = item.Q<Label>("output");
            label.text = content;
            var isEven = (logListView.childCount & 0x01) == 0;
            item.style.backgroundColor = isEven ? evenLineColor : oddLineColor;
            label.style.color = color;
            logListView.Add(item);
        }

        public static string RemoveEscape(string input)
        {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < input.Length; i++)
            {
                var c = input[i];
                if (c == 0x1b)
                {
                    //Debug.Log("0x1b detect");
                    var j = i + 1;
                    if (j < input.Length && input[j] == '[')
                    {
                        j++;
                        while (j < input.Length && input[j] != 'm')
                        {
                            j++;
                        }
                        i = j;
                    }
                    else
                    {
                        continue;
                    }
                }
                sb.Append(c);
            }
            return sb.ToString();
        }
    }
}