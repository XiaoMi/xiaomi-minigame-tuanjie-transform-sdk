#if TUANJIE_1_4_OR_NEWER
using System;
using System.Collections.Generic;
using System.IO;
using UnityEditor;
using UnityEditor.Build;
using UnityEditor.Build.Profile;
using UnityEditor.Build.Reporting;
using UnityEngine;
using UnityEngine.Rendering;

namespace Mi
{
    [InitializeOnLoad]
    public static class XiaomiSubTargetManager
    {
        static XiaomiSubTargetManager()
        {
            MiniGameSubplatformManager.RegisterSubplatform(new XiaomiSubplatformInterface());
        }
    }

    public class XiaomiSubplatformInterface : MiniGameSubplatformInterface
    {
        public override string GetSubplatformName()
        {
            return "XiaoMi:小米小游戏";
        }

        public override MiniGameSettings GetSubplatformSettings()
        {
            return new XiaomiMiniGameSettings(new XiaomiMiniGameSettingsEditor());
        }

        public override string GetSubplatformLink()
        {
            return "https://dev.mi.com/xiaomihyperos/documentation/detail?pId=2165";
        }

        public override BuildMiniGameError Build(BuildProfile buildProfile)
        {
            // 1.Pre-processing
            string buildProfilePath = AssetDatabase.GetAssetPath(buildProfile); // Save the path of the buildProfile for post-processing
            string buildPath = buildProfile.buildPath;
            var xiaomiMiniGameSettings = buildProfile.miniGameSettings as XiaomiMiniGameSettings;
            if (xiaomiMiniGameSettings is null)
            {
                Debug.LogError("预处理阶段 BuildProfile 不合法");
                return BuildMiniGameError.InvalidInput;
            }

            PlayerSettings playerSettings = AssetDatabase.LoadAssetAtPath<PlayerSettings>("ProjectSettings/ProjectSettings.asset"); // Global PlayerSettings
            if (buildProfile.HasOverrridePlayersettings())
                playerSettings = buildProfile.playerSettings; // Override PlayerSettings

            if (!IsBuildSettingsValid(xiaomiMiniGameSettings, playerSettings))
            {
                return BuildMiniGameError.InvalidInput;
            }

            // 2.BuildPlayer
            var res = BuildForTuanjie(buildPath, xiaomiMiniGameSettings);
            if (!res)
            {
                return BuildMiniGameError.SubplatformConvertFailed;
            }

            // 3.Post-processing
            BuildProfile reloadBuildProfile = AssetDatabase.LoadAssetAtPath<BuildProfile>(buildProfilePath);
            xiaomiMiniGameSettings = reloadBuildProfile.miniGameSettings as XiaomiMiniGameSettings;
            if (xiaomiMiniGameSettings is null)
            {
                Debug.LogError("后处理阶段 BuildProfile 不合法");
                return BuildMiniGameError.InvalidInput;
            }

            Debug.Log("构建成功: " + res);
            return BuildMiniGameError.Succeeded;
        }

        /// <summary>
        /// 构建参数校验
        /// </summary>
        private static bool IsBuildSettingsValid(XiaomiMiniGameSettings settings, PlayerSettings playerSettings)
        {
            if (string.IsNullOrEmpty(settings.gameName))
            {
                Debug.LogError("错误：游戏名称不能为空，请设置游戏名");
                return false;
            }

            if (string.IsNullOrEmpty(settings.packageName))
            {
                Debug.LogError("错误：包名名称不能为空，请设置包名");
                return false;
            }

            if (string.IsNullOrEmpty(settings.version))
            {
                Debug.LogError("错误：版本号不能为空，请设置版本号");
                return false;
            }

            if (settings.versionCode == 0)
            {
                Debug.LogError("错误：版本code为0，请设置版本code");
                return false;
            }

            if (string.IsNullOrEmpty(settings.signPath))
            {
                Debug.LogError("错误：签名目录为空，请选择签名目录");
                return false;
            }

            if (!settings.brotliData && !settings.brotliWasm)
            {
                Debug.LogWarning("警告：未启用资源压缩，包体可能较大");
            }

            var scriptingBackend = PlayerSettings.GetScriptingBackend_Internal(playerSettings, NamedBuildTarget.MiniGame);
            if (scriptingBackend != ScriptingImplementation.IL2CPP)
            {
                Debug.LogError($"Scripting Backend {scriptingBackend}(.Net 8) 暂不支持，请选择为 IL2CPP 后重试构建。");
                return false;
            }

            return true;
        }

        private static bool BuildForTuanjie(string buildPath, XiaomiMiniGameSettings settings)
        {
            string sdkPath = string.Empty;
            if (Common.TryFindSdkByRelativePath(out string relativeSdkPath))
            {
                sdkPath = relativeSdkPath;
            }
            if (string.IsNullOrEmpty(sdkPath))
            {
                Debug.LogError("未检测到 XMSDK...");
                return false;
            }

            Debug.Log("Start Build XIaomi MiniGame");

            try
            {
                buildPath = Path.Combine(buildPath, "MiQGameBuild");
                buildPath = buildPath.Replace("\\", "/");

                // miniGame打包
                var result = BuildMiniGame(buildPath, settings);
                if (!result)
                {
                    UnityEngine.Debug.LogError("miniGame 打包失败");
                    return false;
                }
                else
                {
                    // rpk打包
                    result = MiQGameConverter.BuildMiQGame(sdkPath, buildPath, settings.packageName, settings.gameName,
                        settings.version, settings.versionCode, settings.loadingBG,
                        settings.landscape == 0, settings.isWebGL2 == 1,
                        settings.removeOpenSSLProvider == 1,
                        settings.release == 1, settings.signPath, settings.brotliData,
                        settings.brotliWasm, settings.dataPath, settings.wasmPath, settings.streamRes,
                        settings.streamAssetPath);
                    if (!result)
                    {
                        UnityEngine.Debug.LogError("rpk打包失败");
                    }
                    else
                    {
                        EditorUtility.OpenWithDefaultApp(Path.Combine(buildPath, "MiQGame"));
                        // GUIUtility.ExitGUI();
                    }
                }
            }
            catch (Exception e)
            {
                UnityEngine.Debug.LogError("打包失败，请查看Console日志！");
                Debug.LogError(e);
                return false;
            }

            return true;
        }

        private static bool BuildMiniGame(string buildPath, XiaomiMiniGameSettings settings)
        {
            Debug.Log("MiniGame打包...");

            FileInfo fi = new FileInfo(buildPath);
            var di = fi.Directory;
            if (!di.Exists)
            {
                di.Create();
            }

            PlayerSettings.runInBackground = false;
            PlayerSettings.MiniGame.threadsSupport = false;
            PlayerSettings.SetUseDefaultGraphicsAPIs(BuildTarget.MiniGame, false);
            if (settings.isWebGL2 == 1)
            {
                Debug.Log("webgl 2.0打包");
                GraphicsDeviceType[] apis = new GraphicsDeviceType[1] { GraphicsDeviceType.OpenGLES3 };
                PlayerSettings.SetGraphicsAPIs(BuildTarget.MiniGame, apis);
            }
            else
            {
                Debug.Log("webgl 1.0打包");
                GraphicsDeviceType[] apis = new GraphicsDeviceType[1] { GraphicsDeviceType.OpenGLES2 };
                PlayerSettings.SetGraphicsAPIs(BuildTarget.MiniGame, apis);
            }
            PlayerSettings.MiniGame.compressionFormat = MiniGameCompressionFormat.Disabled;
            PlayerSettings.MiniGame.template = "APPLICATION:Minimal";
            PlayerSettings.MiniGame.linkerTarget = MiniGameLinkerTarget.Wasm;

            MiQGameConverter.ClearBuildPath(buildPath);
            try
            {
                List<string> scenes = new List<string>();
                foreach (var scene in EditorBuildSettings.scenes)
                {
                    if (scene.enabled)
                    {
                        scenes.Add(scene.path);
                    }
                }
                if (scenes.Count == 0)
                {
                    Debug.LogError("未选择需要打包的场景，请选择打包场景");
                    return false;
                }

                BuildReport buildReport = BuildPipeline.BuildPlayer(scenes.ToArray(), buildPath, BuildTarget.MiniGame, BuildOptions.None);
                BuildSummary summary = buildReport.summary;
                if (summary.result == UnityEditor.Build.Reporting.BuildResult.Succeeded)
                {
                    UnityEngine.Debug.LogFormat("MiniGame工程打包成功: " + buildPath);
                    return true;
                }
                summary = buildReport.summary;
                if (summary.result == UnityEditor.Build.Reporting.BuildResult.Cancelled)
                {
                    UnityEngine.Debug.LogError("取消MiniGame打包!");
                    return false;
                }

                UnityEngine.Debug.LogError("MiniGame工程打包失败，请查看console日志！");
                return false;
            }
            catch (Exception ex)
            {
                UnityEngine.Debug.LogException((Exception)ex);
            }

            return true;
        }
    }
}
#endif