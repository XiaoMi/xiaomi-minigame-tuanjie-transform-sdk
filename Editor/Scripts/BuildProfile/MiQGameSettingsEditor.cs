#if TUANJIE_1_5_OR_NEWER
using UnityEditor;
using UnityEditor.Build.Profile;
using UnityEngine;
using System.Collections.Generic;
using System;
using System.Text;
using Process = System.Diagnostics.Process;
using ProcessStartInfo = System.Diagnostics.ProcessStartInfo;
using System.IO;
using UnityEngine.Profiling;
using LitJson;

namespace miqgame.editor
{
    public class MiQGameSettingsEditor : MiniGameSettingsEditor
    {
        protected Vector2 scrollRoot;
        protected bool foldBaseInfo = true;
        protected bool foldSignInfo = true;
        protected bool foldDebugOptions = true;
        protected bool foldInstantGame = false;
        protected Texture loadingIcon;
        
        protected bool m_UpdateCDN = false;
        
        private Dictionary<string, string> formInputData = new Dictionary<string, string>();
        private Dictionary<string, int> formInputDataInt = new Dictionary<string, int>();
        private Dictionary<string, bool> formCheckboxData = new Dictionary<string, bool>();


        public static string SIGN_FILE_KEY = "signingFilePath";
        SerializedObject cachedSerializedObject;
        SerializedProperty cachedSerializedProperty;

        public override void OnMiniGameSettingsIMGUI(SerializedObject serializedObject, SerializedProperty miniGameProperty)
        {
            cachedSerializedObject = serializedObject;
            cachedSerializedProperty = miniGameProperty;
            OnSettingsGUI(serializedObject, miniGameProperty);
        }

        public static Process CreateCmdProcess(string cmd, string args, string workdir = null)
        {
            ProcessStartInfo startInfo = new ProcessStartInfo(cmd);
            startInfo.Arguments = args;
            startInfo.CreateNoWindow = true;
            startInfo.UseShellExecute = false;
            startInfo.RedirectStandardError = true;
            startInfo.RedirectStandardInput = true;
            startInfo.RedirectStandardOutput = true;
            startInfo.StandardErrorEncoding = Encoding.UTF8;
            startInfo.StandardOutputEncoding = Encoding.UTF8;
            if (!string.IsNullOrEmpty(workdir))
                startInfo.WorkingDirectory = workdir;
            return Process.Start(startInfo);
        }

        static int[] buildTypeValueArray = { 0, 1 };
        static string[] buildTypeStrArray = { "debug", "release" };
        static int[] logLevelValueArray = { 0, 1, 2, 3, 4, 5, 6 };
        static string[] logLevelStrArray = { "off", "error", "warn", "info", "log", "debug", "trace" };


        private void OnSettingsGUI(SerializedObject serializedObject, SerializedProperty miniGameProperty, bool showBuildPath = false)
        {
            loadData(serializedObject, miniGameProperty);
            scrollRoot = EditorGUILayout.BeginScrollView(scrollRoot);

            foldBaseInfo = EditorGUILayout.Foldout(foldBaseInfo, "基础配置");
            if (foldBaseInfo)
            {
                EditorGUILayout.BeginVertical("frameBox", GUILayout.ExpandWidth(true));
                formInput("gameName", "游戏名");
                formInput("packageName", "游戏包名");
                formInput("versionName", "版本号");                
                formInputInt("versionCode", "版本Code");
                formInput("minPlatformVersion", "最小平台版本");
                PathInput("iconPath", "小游戏Icon", null, Application.dataPath, "选择Icon", true, "png,jpg");

                if (showBuildPath)
                {
                    GUILayout.BeginHorizontal();
                    var dst = this.getDataInput("dst");
                    EditorGUILayout.LabelField(string.Empty, GUILayout.Width(10));
                    GUILayout.Label("导出路径", GUILayout.Width(140));
                    dst = GUILayout.TextField(dst, GUILayout.MaxWidth(EditorGUIUtility.currentViewWidth - 270));
                    if (GUILayout.Button(new GUIContent("打开"), GUILayout.Width(40)))
                    {
                        if (!dst.Trim().Equals(string.Empty))
                        {
                            EditorUtility.RevealInFinder(Util.ResolveBuildPath(dst));
                        }
                        GUIUtility.ExitGUI();
                    }
                    if (GUILayout.Button(new GUIContent("选择"), GUILayout.Width(40)))
                    {
                        var dstPath = EditorUtility.SaveFolderPanel("选择你的游戏导出目录", string.Empty, string.Empty);
                        if (dstPath != string.Empty)
                        {
                            dst = dstPath;
                        }
                    }
                    this.setData("dst", dst);
                    GUILayout.EndHorizontal();
                }

                this.formCheckbox("compressDataPackage", "压缩首包资源(?)", "将首包资源Brotli压缩, 降低资源大小.");
                this.formIntPopup("orientation", "游戏方向", new[] { "纵向", "横向" }, new[] { 0, 1});
                this.formInput("memorySize", "预分配堆大小", "单位MB，预分配内存值，超休闲游戏256/中轻度496/重度游戏768，需预估游戏最大UnityHeap值以防止内存自动扩容带来的峰值尖刺。");
                formIntPopup("buildType", "打包类型", buildTypeStrArray, buildTypeValueArray);
                formIntPopup("logLevel", "Log类型", logLevelStrArray, logLevelValueArray);
                EditorGUILayout.EndVertical();
            }


            

            foldSignInfo = EditorGUILayout.Foldout(foldSignInfo, "签名信息");
            if (foldSignInfo)
            {
                EditorGUILayout.BeginVertical("frameBox", GUILayout.ExpandWidth(true));
                var curPath = formInputData.ContainsKey("signingFilePath")? formInputData["signingFilePath"]:"";
                PathInput("signingFilePath", "签名文件目录",null,Application.dataPath, "签名目录",false);
                var path = formInputData["signingFilePath"];
                if (Directory.Exists(path))
                {
                    var debugPrivPath = Path.Combine(path, "debug", "private.pem");
                    FilePathExistLabel(debugPrivPath, "[OK]", "[缺失]");

                    var debugCertPath = Path.Combine(path, "debug", "certificate.pem");
                    FilePathExistLabel(debugCertPath,"[OK]","[缺失]");

                    var releasePrivPath = Path.Combine(path, "release", "private.pem");
                    FilePathExistLabel(releasePrivPath, "[OK]", "[缺失]");

                    var releaseCertPath = Path.Combine(path, "release", "certificate.pem");
                    FilePathExistLabel(releaseCertPath, "[OK]", "[缺失]");
                }
                EditorGUILayout.EndVertical();
            }

            foldDebugOptions = EditorGUILayout.Foldout(foldDebugOptions, "调试编译选项");
            if (foldDebugOptions)
            {
                EditorGUILayout.BeginVertical("frameBox", GUILayout.ExpandWidth(true));
#if TUANJIE_2022_3_OR_NEWER
                bool UseIL2CPP = PlayerSettings.GetScriptingBackend(BuildTargetGroup.WeixinMiniGame) == ScriptingImplementation.IL2CPP;
#else
                bool UseIL2CPP = true;
#endif
                this.formCheckbox("il2CppOptimizeSize", "Il2Cpp Optimize Size(?)", "对应于Il2CppCodeGeneration选项，勾选时使用OptimizeSize(默认推荐)，生成代码小15%左右，取消勾选则使用OptimizeSpeed。游戏中大量泛型集合的高频访问建议OptimizeSpeed，在使用HybridCLR等第三方组件时只能用OptimizeSpeed。(Dotnet Runtime模式下该选项无效)", !UseIL2CPP);
                this.formCheckbox("profilingFuncs", "Profiling Funcs");
                this.formCheckbox("profilingMemory", "Profiling Memory");
                EditorGUILayout.EndVertical();
            }

            EditorGUILayout.EndScrollView();

            saveData(serializedObject, miniGameProperty);
        }

        protected void loadData(SerializedObject serializedObject, SerializedProperty miniGameProperty)
        {
            serializedObject.UpdateIfRequiredOrScript();

            var ProjectConf = miniGameProperty.FindPropertyRelative("ProjectConf");
            if (m_UpdateCDN && ProjectConf.FindPropertyRelative("CDN").stringValue != getCDNPath(miniGameProperty)) 
            {
                m_UpdateCDN = false;
                ProjectConf.FindPropertyRelative("CDN").stringValue = getCDNPath(miniGameProperty);
                if (!ProjectConf.FindPropertyRelative("bundlePathIdentifier").stringValue.Contains("AS;"))
                {
                    ProjectConf.FindPropertyRelative("bundlePathIdentifier").stringValue += "AS;";
                }
                if (!ProjectConf.FindPropertyRelative("bundlePathIdentifier").stringValue.Contains("CUS/CustomAB;"))
                {
                    ProjectConf.FindPropertyRelative("bundlePathIdentifier").stringValue += "CUS/CustomAB;";
                }
                ProjectConf.FindPropertyRelative("dataFileSubPrefix").stringValue = "CUS";
            }
            //Mi
            setData("gameName", ProjectConf.FindPropertyRelative("gameName").stringValue);
            setData("packageName", ProjectConf.FindPropertyRelative("packageName").stringValue);
            setData("versionName", ProjectConf.FindPropertyRelative("versionName").stringValue);
            setData("versionCode", ProjectConf.FindPropertyRelative("versionCode").intValue);
            setData("iconPath", ProjectConf.FindPropertyRelative("iconPath").stringValue);
            setData("logLevel", ProjectConf.FindPropertyRelative("logLevel").intValue);
            setData("signingFilePath", ProjectConf.FindPropertyRelative("signingFilePath").stringValue);
            setData("buildType", ProjectConf.FindPropertyRelative("buildType").intValue);


            setData("projectName", PlayerSettings.productName);
            setData("appid", ProjectConf.FindPropertyRelative("Appid").stringValue);
            setData("cdn", ProjectConf.FindPropertyRelative("CDN").stringValue);
            setData("assetLoadType", ProjectConf.FindPropertyRelative("assetLoadType").intValue);
            setData("compressDataPackage", ProjectConf.FindPropertyRelative("compressDataPackage").boolValue);
            setData("videoUrl", ProjectConf.FindPropertyRelative("VideoUrl").stringValue);
            setData("orientation", (int)ProjectConf.FindPropertyRelative("Orientation").enumValueIndex);
            setData("bundleHashLength", ProjectConf.FindPropertyRelative("bundleHashLength").intValue.ToString());
            setData("bundlePathIdentifier", ProjectConf.FindPropertyRelative("bundlePathIdentifier").stringValue);
            setData("bundleExcludeExtensions", ProjectConf.FindPropertyRelative("bundleExcludeExtensions").stringValue);
            setData("preloadFiles", ProjectConf.FindPropertyRelative("preloadFiles").stringValue);
            
            var CompileOptions = miniGameProperty.FindPropertyRelative("CompileOptions");
            setData("developBuild", CompileOptions.FindPropertyRelative("DevelopBuild").boolValue);
            setData("scriptDebugging", CompileOptions.FindPropertyRelative("ScriptDebugging").boolValue);
            setData("autoProfile", CompileOptions.FindPropertyRelative("AutoProfile").boolValue);
            setData("scriptOnly", CompileOptions.FindPropertyRelative("ScriptOnly").boolValue);
            setData("il2CppOptimizeSize", CompileOptions.FindPropertyRelative("Il2CppOptimizeSize").boolValue);
            setData("profilingFuncs", CompileOptions.FindPropertyRelative("profilingFuncs").boolValue);
            setData("profilingMemory", CompileOptions.FindPropertyRelative("ProfilingMemory").boolValue);
            setData("deleteStreamingAssets", CompileOptions.FindPropertyRelative("DeleteStreamingAssets").boolValue);
            setData("cleanBuild", CompileOptions.FindPropertyRelative("CleanBuild").boolValue);
            setData("customNodePath", CompileOptions.FindPropertyRelative("CustomNodePath").stringValue);
            setData("webgl2", CompileOptions.FindPropertyRelative("Webgl2").boolValue);
            setData("iOSPerformancePlus", CompileOptions.FindPropertyRelative("enableIOSPerformancePlus").boolValue);
            setData("fbslim", CompileOptions.FindPropertyRelative("fbslim").boolValue);
                    this.setData("bgImageSrc", ProjectConf.FindPropertyRelative("bgImageSrc").stringValue);
            loadingIcon = AssetDatabase.LoadAssetAtPath<Texture>(ProjectConf.FindPropertyRelative("bgImageSrc").stringValue);
            setData("isCoverviewCustomized", ProjectConf.FindPropertyRelative("isCoverviewCustomized").boolValue);
            setData("memorySize", ProjectConf.FindPropertyRelative("MemorySize").intValue.ToString());
            setData("hideAfterCallMain", ProjectConf.FindPropertyRelative("HideAfterCallMain").boolValue);
            setData("dataFileSubPrefix", ProjectConf.FindPropertyRelative("dataFileSubPrefix").stringValue);
            setData("maxStorage", ProjectConf.FindPropertyRelative("maxStorage").intValue.ToString());
            setData("defaultReleaseSize", ProjectConf.FindPropertyRelative("defaultReleaseSize").intValue.ToString());
            setData("texturesHashLength", ProjectConf.FindPropertyRelative("texturesHashLength").intValue.ToString());
            setData("texturesPath", ProjectConf.FindPropertyRelative("texturesPath").stringValue);
            setData("needCacheTextures", ProjectConf.FindPropertyRelative("needCacheTextures").boolValue);
            setData("loadingBarWidth", ProjectConf.FindPropertyRelative("loadingBarWidth").intValue.ToString());
            setData("needCheckUpdate", ProjectConf.FindPropertyRelative("needCheckUpdate").boolValue);
            setData("disableHighPerformanceFallback", ProjectConf.FindPropertyRelative("disableHighPerformanceFallback").boolValue);
                    setData("autoAdaptScreen", CompileOptions.FindPropertyRelative("autoAdaptScreen").boolValue);
            setData("showMonitorSuggestModal", CompileOptions.FindPropertyRelative("showMonitorSuggestModal").boolValue);
            setData("enableProfileStats", CompileOptions.FindPropertyRelative("enableProfileStats").boolValue);
            setData("enableRenderAnalysis", CompileOptions.FindPropertyRelative("enableRenderAnalysis").boolValue);
            setData("brotliMT", CompileOptions.FindPropertyRelative("brotliMT").boolValue);
                    setData("AutoUploadOnBuild", miniGameProperty.FindPropertyRelative("AutoUploadOnBuild").boolValue);
            setData("buildVersion", ProjectConf.FindPropertyRelative("buildVersion").stringValue);
            setData("buildDescription", ProjectConf.FindPropertyRelative("buildDescription").stringValue);
        }

        protected void saveData(SerializedObject serializedObject, SerializedProperty miniGameProperty)
        {
            serializedObject.UpdateIfRequiredOrScript();

            var ProjectConf = miniGameProperty.FindPropertyRelative("ProjectConf");
            PlayerSettings.productName = this.getDataInput("projectName");
            //Mi
            ProjectConf.FindPropertyRelative("gameName").stringValue = getDataInput("gameName");
            ProjectConf.FindPropertyRelative("packageName").stringValue = getDataInput("packageName");
            ProjectConf.FindPropertyRelative("versionName").stringValue = getDataInput("versionName");
            ProjectConf.FindPropertyRelative("versionCode").intValue = getDataInputInt("versionCode");
            ProjectConf.FindPropertyRelative("iconPath").stringValue = getDataInput("iconPath");
            ProjectConf.FindPropertyRelative("logLevel").intValue = getDataInputInt("logLevel");
            ProjectConf.FindPropertyRelative("signingFilePath").stringValue = getDataInput("signingFilePath");
            ProjectConf.FindPropertyRelative("buildType").intValue = getDataInputInt("buildType");


            ProjectConf.FindPropertyRelative("Appid").stringValue = this.getDataInput("appid");
            ProjectConf.FindPropertyRelative("CDN").stringValue = this.getDataInput("cdn");
            ProjectConf.FindPropertyRelative("assetLoadType").intValue = this.getDataInputInt("assetLoadType");
            ProjectConf.FindPropertyRelative("compressDataPackage").boolValue = this.getDataCheckbox("compressDataPackage");
            ProjectConf.FindPropertyRelative("VideoUrl").stringValue = this.getDataInput("videoUrl");
            ProjectConf.FindPropertyRelative("Orientation").enumValueIndex = this.getDataInputInt("orientation");
            ProjectConf.FindPropertyRelative("DST").stringValue = serializedObject.FindProperty("m_BuildPath").stringValue;

            ProjectConf.FindPropertyRelative("bundleHashLength").intValue = int.Parse(this.getDataInput("bundleHashLength"));
            ProjectConf.FindPropertyRelative("bundlePathIdentifier").stringValue = this.getDataInput("bundlePathIdentifier");
            ProjectConf.FindPropertyRelative("bundleExcludeExtensions").stringValue = this.getDataInput("bundleExcludeExtensions");
            ProjectConf.FindPropertyRelative("preloadFiles").stringValue = this.getDataInput("preloadFiles");

            var CompileOptions = miniGameProperty.FindPropertyRelative("CompileOptions");

            CompileOptions.FindPropertyRelative("DevelopBuild").boolValue =
                serializedObject.FindProperty("m_PlatformSettings").FindPropertyRelative("m_Development").boolValue;
            CompileOptions.FindPropertyRelative("ScriptDebugging").boolValue = 
                serializedObject.FindProperty("m_PlatformSettings").FindPropertyRelative("m_AllowDebugging").boolValue;
            CompileOptions.FindPropertyRelative("AutoProfile").boolValue = this.getDataCheckbox("autoProfile");
            CompileOptions.FindPropertyRelative("ScriptOnly").boolValue = this.getDataCheckbox("scriptOnly");
            CompileOptions.FindPropertyRelative("Il2CppOptimizeSize").boolValue = this.getDataCheckbox("il2CppOptimizeSize");
            CompileOptions.FindPropertyRelative("profilingFuncs").boolValue = this.getDataCheckbox("profilingFuncs");
            CompileOptions.FindPropertyRelative("ProfilingMemory").boolValue = this.getDataCheckbox("profilingMemory");
            CompileOptions.FindPropertyRelative("DeleteStreamingAssets").boolValue = this.getDataCheckbox("deleteStreamingAssets");
            CompileOptions.FindPropertyRelative("CleanBuild").boolValue = this.getDataCheckbox("cleanBuild");
            CompileOptions.FindPropertyRelative("CustomNodePath").stringValue = this.getDataInput("customNodePath");
            CompileOptions.FindPropertyRelative("Webgl2").boolValue = this.getDataCheckbox("webgl2");
            CompileOptions.FindPropertyRelative("enableIOSPerformancePlus").boolValue = this.getDataCheckbox("iOSPerformancePlus");
            CompileOptions.FindPropertyRelative("fbslim").boolValue = this.getDataCheckbox("fbslim");

            ProjectConf.FindPropertyRelative("bgImageSrc").stringValue = this.getDataInput("bgImageSrc");
            ProjectConf.FindPropertyRelative("isCoverviewCustomized").boolValue = this.getDataCheckbox("isCoverviewCustomized");
            ProjectConf.FindPropertyRelative("MemorySize").intValue = getInt("memorySize");
            ProjectConf.FindPropertyRelative("HideAfterCallMain").boolValue = this.getDataCheckbox("hideAfterCallMain");
            ProjectConf.FindPropertyRelative("dataFileSubPrefix").stringValue = this.getDataInput("dataFileSubPrefix");
            ProjectConf.FindPropertyRelative("maxStorage").intValue = int.Parse(this.getDataInput("maxStorage"));
            ProjectConf.FindPropertyRelative("defaultReleaseSize").intValue = int.Parse(this.getDataInput("defaultReleaseSize"));
            ProjectConf.FindPropertyRelative("texturesHashLength").intValue = int.Parse(this.getDataInput("texturesHashLength"));
            ProjectConf.FindPropertyRelative("texturesPath").stringValue = this.getDataInput("texturesPath");
            ProjectConf.FindPropertyRelative("needCacheTextures").boolValue = this.getDataCheckbox("needCacheTextures");
            ProjectConf.FindPropertyRelative("loadingBarWidth").intValue = int.Parse(this.getDataInput("loadingBarWidth"));
            ProjectConf.FindPropertyRelative("needCheckUpdate").boolValue = this.getDataCheckbox("needCheckUpdate");
            ProjectConf.FindPropertyRelative("disableHighPerformanceFallback").boolValue = this.getDataCheckbox("disableHighPerformanceFallback");
            CompileOptions.FindPropertyRelative("autoAdaptScreen").boolValue = this.getDataCheckbox("autoAdaptScreen");
            CompileOptions.FindPropertyRelative("showMonitorSuggestModal").boolValue = this.getDataCheckbox("showMonitorSuggestModal");
            CompileOptions.FindPropertyRelative("enableProfileStats").boolValue = this.getDataCheckbox("enableProfileStats");
            CompileOptions.FindPropertyRelative("enableRenderAnalysis").boolValue = this.getDataCheckbox("enableRenderAnalysis");
            CompileOptions.FindPropertyRelative("brotliMT").boolValue = this.getDataCheckbox("brotliMT");

            miniGameProperty.FindPropertyRelative("AutoUploadOnBuild").boolValue = this.getDataCheckbox("AutoUploadOnBuild");
            ProjectConf.FindPropertyRelative("buildVersion").stringValue = this.getDataInput("buildVersion");
            ProjectConf.FindPropertyRelative("buildDescription").stringValue = this.getDataInput("buildDescription");
            serializedObject.ApplyModifiedProperties();
        }

        private string getCDNPath(SerializedProperty miniGameProperty)
        {
            return "";
        }

        public string getDataInput(string target)
        {
            if (this.formInputData.ContainsKey(target))
                return this.formInputData[target];
            return "";
        }
        
        internal int getDataInputInt(string target)
        {
            if (this.formInputDataInt.ContainsKey(target))
                return this.formInputDataInt[target];
            return 0;
        }

        public bool getDataCheckbox(string target)
        {
            if (this.formCheckboxData.ContainsKey(target))
                return this.formCheckboxData[target];
            return false;
        }

        internal int getInt(string target)
        {
            string input = getDataInput(target);
            
            if (string.IsNullOrEmpty(input) || !int.TryParse(input, out int value))
            {
                UnityEngine.Debug.LogError($"输入的 {target} 不能为空");
                return 0; 
            }

            return value;
        }
        
        public void setData(string target, string value)
        {
            if (formInputData.ContainsKey(target))
            {
                formInputData[target] = value;
            }
            else
            {
                formInputData.Add(target, value);
            }
        }

        public void setData(string target, bool value)
        {
            if (formCheckboxData.ContainsKey(target))
            {
                formCheckboxData[target] = value;
            }
            else
            {
                formCheckboxData.Add(target, value);
            }
        }

        public void setData(string target, int value)
        {
            if (formInputDataInt.ContainsKey(target))
            {
                formInputDataInt[target] = value;
            }
            else
            {
                formInputDataInt.Add(target, value);
            }
        }

        public void formCDNInput(string target, string label)
        {
            if (!formInputData.ContainsKey(target))
            {
                formInputData[target] = "";
            }

            GUILayout.BeginHorizontal();
            EditorGUILayout.LabelField(string.Empty, GUILayout.Width(10));
            GUILayout.Label(label, GUILayout.Width(140));
            formInputData[target] = GUILayout.TextField(formInputData[target], GUILayout.MaxWidth(EditorGUIUtility.currentViewWidth - 305));

            if (GUILayout.Button(new GUIContent("同步自UOS CDN"), GUILayout.Width(110)))
            {
                m_UpdateCDN = true;
            }
            GUILayout.EndHorizontal();
        }
        
        public void formInput(string target, string label, string help = null)
        {
            if (!formInputData.ContainsKey(target))
            {
                formInputData[target] = "";
            }
            GUILayout.BeginHorizontal();
            EditorGUILayout.LabelField(string.Empty, GUILayout.Width(10));
            if (help == null)
            {
                GUILayout.Label(label, GUILayout.Width(140));
            }
            else
            {
                GUILayout.Label(new GUIContent(label, help), GUILayout.Width(140));
            }
            formInputData[target] = GUILayout.TextField(formInputData[target], GUILayout.MaxWidth(EditorGUIUtility.currentViewWidth - 195));
            GUILayout.EndHorizontal();
        }

        public void formInputInt(string target, string label, string help = null)
        {
            if (!formInputDataInt.ContainsKey(target))
            {
                formInputDataInt[target] = 0;
            }
            GUILayout.BeginHorizontal();
            EditorGUILayout.LabelField(string.Empty, GUILayout.Width(10));
            if (help == null)
            {
                GUILayout.Label(label, GUILayout.Width(140));
            }
            else
            {
                GUILayout.Label(new GUIContent(label, help), GUILayout.Width(140));
            }
            var value = EditorGUILayout.IntField(formInputDataInt[target]);
            formInputDataInt[target] = value;
            GUILayout.EndHorizontal();
        }

        public void formIntPopup(string target, string label, string[] options, int[] values)
        {
            if (!formInputDataInt.ContainsKey(target))
            {
                formInputDataInt[target] = 0;
            }
            GUILayout.BeginHorizontal();
            EditorGUILayout.LabelField(string.Empty, GUILayout.Width(10));
            GUILayout.Label(label, GUILayout.Width(140));
            formInputDataInt[target] = EditorGUILayout.IntPopup(formInputDataInt[target], options, values, GUILayout.MaxWidth(EditorGUIUtility.currentViewWidth - 195));
            GUILayout.EndHorizontal();
        }

        public void formCheckbox(string target, string label, string help = null, bool disable = false, Action<bool> setting = null)
        {
            if (!formCheckboxData.ContainsKey(target))
            {
                formCheckboxData[target] = false;
            }
            GUILayout.BeginHorizontal();
            EditorGUILayout.LabelField(string.Empty, GUILayout.Width(10));
            if (help == null)
            {
                GUILayout.Label(label, GUILayout.Width(140));
            }
            else
            {
                GUILayout.Label(new GUIContent(label, help), GUILayout.Width(140));
            }
            EditorGUI.BeginDisabledGroup(disable);
            formCheckboxData[target] = EditorGUILayout.Toggle(disable ? false : formCheckboxData[target]);

            if (setting != null)
            {
                EditorGUILayout.LabelField("", GUILayout.Width(10));
                // 配置按钮
                if (GUILayout.Button(new GUIContent("设置"), GUILayout.Width(40), GUILayout.Height(18)))
                {
                    setting?.Invoke(true);
                }
                EditorGUILayout.LabelField("", GUILayout.MinWidth(10));
            }

            EditorGUI.EndDisabledGroup();

            if (setting == null)
                EditorGUILayout.LabelField(string.Empty);
            GUILayout.EndHorizontal();
        }

        public void PathInput(string target, string label, string help = null ,string defaultPath = "",string title = "选择目录",bool fileMode = true, string fileFilter = "*.*")
        {
            if (!formInputData.ContainsKey(target))
            {
                formInputData[target] = defaultPath;
            }
            GUILayout.BeginHorizontal();
            EditorGUILayout.LabelField(string.Empty, GUILayout.Width(10));
            if (help == null)
            {
                GUILayout.Label(label, GUILayout.Width(140));
            }
            else
            {
                GUILayout.Label(new GUIContent(label, help), GUILayout.Width(140));
            }
            formInputData[target] = GUILayout.TextField(formInputData[target], GUILayout.MaxWidth(EditorGUIUtility.currentViewWidth - 195));
            var curPath = formInputData[target];
            if (File.Exists(curPath) == false)
            {
                curPath = Application.dataPath;
            }
            if (GUILayout.Button("浏览"))
            {
                if (fileMode)
                {
                    curPath = EditorUtility.OpenFilePanel(title, curPath, fileFilter);
                }
                else
                {
                    curPath = EditorUtility.OpenFolderPanel(title,curPath , "");
                }
                if (curPath != null && curPath.Length > 0)
                {
                    formInputData[target] = curPath;
                    if(cachedSerializedObject != null && cachedSerializedProperty != null)
                    {
                        saveData(cachedSerializedObject, cachedSerializedProperty);
                    }
                }
                GUIUtility.ExitGUI();
            }
            GUILayout.EndHorizontal();
        }

        public void FilePathExistLabel(string path, string existInfo="[OK]", string noneExistInfo="[missing]")
        {
            GUILayout.BeginHorizontal();
            EditorGUILayout.LabelField(string.Empty, GUILayout.Width(10));
            var fullPath = Path.GetFullPath(path);
            GUILayout.Label(fullPath);
            var exist = File.Exists(fullPath);
            GUILayout.Label(exist ? existInfo : noneExistInfo, GUILayout.Width(60));
            GUILayout.EndHorizontal();
        }
    }
}
#endif