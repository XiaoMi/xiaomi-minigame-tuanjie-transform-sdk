#if TUANJIE_1_5_OR_NEWER
using System;
using System.Linq;
using UnityEditor;
using UnityEditor.Build.Profile;
using UnityEngine;
using UnityEngine.Rendering;
using System.IO;

namespace miqgame.editor
{
    [InitializeOnLoad]
    public static class RegisterMinigameSubplatformInterface
    {
        static RegisterMinigameSubplatformInterface()
        {
            MiniGameSubplatformManager.RegisterSubplatform(new MiQGameSubplatformInterface());
        }
    }

    public class MiQGameSubplatformInterface: MiniGameSubplatformInterface
    {
        public override string GetSubplatformName()
        {
            return "XiaoMi:小米小游戏";
        }

        public override MiniGameSettings GetSubplatformSettings()
        {
            return new MiQGameSettings(new MiQGameSettingsEditor());
        }
        
        public override string GetSubplatformLink()
        {
            return "https://dev.mi.com/xiaomihyperos/quickgame-distribute";
        }

        public override string GetSubplatformTooltip()
        {
            return "点击查看更多关于小米小游戏";
        }
        
        private static bool MiQGameBuildPreprocess(BuildProfile buildProfile)
        {
            // Check GFX API and Color Space
            if (buildProfile != null)
            {
                PlayerSettings playerSettings = buildProfile.playerSettings;
                var settings = buildProfile.miniGameSettings as MiQGameSettings;

                // clear threaded & vulkan flags first
                settings.CompileOptions.enableVulkan = false;
                settings.CompileOptions.enableWebThreads = false;

                // Global PlayerSettings
                ColorSpace colorSpace = PlayerSettings.colorSpace;
                GraphicsDeviceType[] apis = PlayerSettings.GetGraphicsAPIs(buildProfile.buildTarget);
                bool isAutomatic = PlayerSettings.GetUseDefaultGraphicsAPIs(buildProfile.buildTarget);

                if (playerSettings != null)
                {
                    // BuildProfile PlayerSettings Override
                    colorSpace = PlayerSettings.GetColorSpace_Internal(playerSettings);
                    apis = PlayerSettings.GetGraphicsAPIs_Internal(playerSettings, buildProfile.buildTarget);
                    isAutomatic = PlayerSettings.GetUseDefaultGraphicsAPIs_Internal(playerSettings, buildProfile.buildTarget);
                }

                // Dont allow automatic
                if (isAutomatic && colorSpace == ColorSpace.Linear && settings!=null)
                {
                    settings.CompileOptions.Webgl2 = true;
                }

#if TUANJIE_1_6_OR_NEWER
                if (settings != null)
                {
                    bool isWebGL1 = apis.Contains(GraphicsDeviceType.OpenGLES2);
                    if (isWebGL1 && colorSpace == ColorSpace.Linear)
                    {
                        Debug.LogError("WebGL1 does not support Linear color space. Please switch to Gamma color space.");
                        return false;
                    }
                    settings.CompileOptions.Webgl2 = !isWebGL1;

                    if (apis.Contains(GraphicsDeviceType.Metal))
                    {
                        settings.CompileOptions.enableIOSPerformancePlusMetal = true;
                        if (apis.Length == 1)
                        {
                            Debug.LogWarning("Warning: Your build only contains Metal Graphics API, it would be failed to run on Android Hosts and iOS Hosts which do not support Metal API Streaming.");
                        }
                    }
#if TUANJIE_1_9_OR_NEWER
                    else if (BuildPipeline.IsMiniGameBuildThreadedFromBuildProfile(buildProfile) || EditorUserBuildSettings.allowDebugging)
                    {
                        settings.CompileOptions.enableWebThreads = true;

                        if (apis.Contains(GraphicsDeviceType.Vulkan))
                        {
                            settings.CompileOptions.enableVulkan = true;
                            if (apis.Length != 1)
                            {
                                Debug.LogError("Error: Vulkan Graphics API cannot be combined with other APIs.");
                                return false;
                            }
                        }
                    }
#elif TUANJIE_1_8_OR_NEWER
                    else if (apis.Contains(GraphicsDeviceType.Vulkan))
                    {
                        settings.CompileOptions.enableVulkan = true;
                        settings.CompileOptions.enableWebThreads = true;

                        if (apis.Length != 1)
                        {
                            Debug.LogError("Error: Vulkan Graphics API cannot be combined with other APIs.");
                            return false;
                        }
                    }
#endif
                    else
                    {
#if TUANJIE_1_8_OR_NEWER
                        settings.CompileOptions.enableVulkan = false;
                        settings.CompileOptions.enableWebThreads = EditorUserBuildSettings.allowDebugging;

#endif
                        settings.CompileOptions.enableIOSPerformancePlusMetal = false;
                        if (apis.Length <= 0)
                        {
                            Debug.LogError("Please choose a Graphics API in PlayerSettings.");
                            return false;
                        }
                        else if (apis.Length > 1)
                        {
                            Debug.LogError("WebGL2 and WebGL1 Graphics APIs should not be chosen together.");
                            return false;
                        }
                    }
                    return true;
                }

                return false;
#else
                if (apis.Length == 1 && settings!=null)
                {
                    bool isWebGL1 = apis.Contains(GraphicsDeviceType.OpenGLES2);
                    if (isWebGL1 && colorSpace == ColorSpace.Linear)
                    {
                        Debug.LogError("WebGL1 does not support Linear color space. Please switch to Gamma color space.");
                        return false;
                    }
                    settings.CompileOptions.Webgl2 = !isWebGL1;
                    settings.CompileOptions.enableWebThreads = EditorUserBuildSettings.allowDebugging;
                }
                else
                {
                    Debug.LogError("Please choose between WebGL1 and WebGL2");
                    return false;
                }

                return true;
#endif
            }
            else
            {
                throw new InvalidOperationException("Build profile has not been initialized.");
            }
        }

        public override BuildMiniGameError Build(BuildProfile profile)
        {
            return BuildMiniGameError.Unknown;
        }

        public override BuildMiniGameError Build(BuildProfile profile, BuildOptions options)
        {
            bool preprocessSuccess = MiQGameBuildPreprocess(profile);
            if (!preprocessSuccess)
            {
                return BuildMiniGameError.PlayerBuildFailed;
            }
            
            var settings = profile.miniGameSettings as MiQGameSettings;
            if (settings is not null && settings.PreprocessBuild(profile))
            {
                var selection = Selection.objects;
                EditorScriptObject config = settings.ToQGEditorScriptObject();
                
                if (string.IsNullOrEmpty(config.ProjectConf.buildVersion) && string.IsNullOrEmpty(Application.version))
                {
                    Debug.LogError("版本不能为空。请填写版本，或者在 Player Settings 中填写 Version.");
                    return BuildMiniGameError.PlayerBuildFailed;
                }
                
                config.buildOptions = options;
                var dst = Util.ResolveBuildPath(config.ProjectConf.DST);
                var exportResult = ConvertCore.DoExport(config);
                //ConvertCore.PostProcess postProcess = () =>
                //{
                //    Debug.Log("PostProcess");
                //};
                //ConvertCore.RegisterPostProcessHandler(postProcess);
                if (exportResult == ConvertCore.ExportError.SUCCEED)
                {
                    //ConvertCore.UnregisterPostProcessHandler(postProcess);
                    Debug.Log("Export OK");
                    if (CopySignFile(config.ProjectConf))
                    {
                        Debug.Log("start qgame");
                    }
                    else
                    {
                        Debug.Log("sign file!");
                    }
                    MiCLIWindow.StartQuickGameBuild((profile.miniGameSettings as MiQGameSettings).ToQGEditorScriptObject());

                    //开始小米RPK Build
                    //var zipped = Path.Combine(dst, "game.zip");
                    //UnityUtil.ZipGame(zipped, Path.Combine(dst, "minigame"));
                    //if (settings.AutoUploadOnBuild)
                    //{
                    //    //UploadWindow.ShowWindow(zipped);
                    //}

                }
                else
                {
                    Debug.LogError($"DoExport failed with error: {exportResult}");
                    Selection.objects = selection;
                    return BuildMiniGameError.PlayerBuildFailed;
                }
                Selection.objects = selection;
            }
            else
            {
                Debug.Log("miniHostMiniGameSettingsEditor is null");
            }
            return BuildMiniGameError.Succeeded;
        }

        public bool CopySignFile(ProjectConf projConfig)
        {
            var src = projConfig.signingFilePath;
            var dst = Util.ResolveBuildPath(projConfig.DST);
            dst = Path.Combine(dst, "minigame", "sign");
            Debug.Log($"Copy sign files... {src} -> {dst}");
            if (!Directory.Exists(src))
            {
                Debug.LogWarning($"签名目录不存在:{src}");
                return false;
            }
            if (Directory.Exists(dst) == false)
            {
                Directory.CreateDirectory(dst);
            }
            UnityUtil.CopyFiles(src, dst, true);
            return true;


        }
    }
}
#endif