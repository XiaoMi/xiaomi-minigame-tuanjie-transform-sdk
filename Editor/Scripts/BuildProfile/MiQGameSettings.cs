#if TUANJIE_1_5_OR_NEWER
using UnityEditor.Build.Profile;
using UnityEngine;
using UnityEditor;
using System.Collections.Generic;


namespace miqgame.editor
{
    public class MiQGameSettings: MiniGameSettings
    {
        public ProjectConf ProjectConf;
        public SDKOptions SDKOptions;
        public CompileOptions CompileOptions;
        public List<string> PlayerPrefsKeys = new List<string>();
        public FontOptions FontOptions;

        public bool AutoUploadOnBuild = true;
    
        public MiQGameSettings(MiniGameSettingsEditor editor) : base(editor)
        {
        }

        public EditorScriptObject ToQGEditorScriptObject()
        {
            var scriptObject = ScriptableObject.CreateInstance<EditorScriptObject>();
    
            scriptObject.ProjectConf = this.ProjectConf;
            scriptObject.SDKOptions = this.SDKOptions;
            scriptObject.CompileOptions = this.CompileOptions;
            scriptObject.PlayerPrefsKeys = new List<string>(this.PlayerPrefsKeys);
            scriptObject.FontOptions = this.FontOptions;
            scriptObject.AutoUploadOnBuild = this.AutoUploadOnBuild;

            return scriptObject;
        }

        public bool PreprocessBuild(BuildProfile buildProfile)
        {
            if (string.IsNullOrEmpty(ProjectConf.CDN))
            {
                //ProjectConf.CDN = UOSConfig.GenerateCDNPath(this.ProjectConf.uosBucketUuid, this.ProjectConf.uosBucket, this.ProjectConf.uosBadge);
            }
            bool result = true;
            if (!string.IsNullOrEmpty(buildProfile.buildPath))
            {
                this.ProjectConf.DST = buildProfile.buildPath;
            }
            else
            {
                Debug.LogError("Build Path is empty!");
                result = false;
            }

            return result;
        }

        public string GetUOSCDNConfig(string key)
        {
            switch (key)
            {
                case "uosAppId":
                    return ProjectConf.uosAppId;
                case "uosAppSecret":
                    return ProjectConf.uosAppSecret;
                case "uosBucket":
                    return ProjectConf.uosBucket;
                case "uosBucketUuid":
                    return ProjectConf.uosBucketUuid;
                case "uosBadge":
                    return ProjectConf.uosBadge;
                case "localFolder":
                    return ProjectConf.localFolder;
                default:
                    return string.Empty;
            }
        }

        public void SetUOSCDNConfig(string key, string value)
        {
            switch (key)
            {
                case "uosAppId":
                    ProjectConf.uosAppId = value;
                    break;
                case "uosAppSecret":
                    ProjectConf.uosAppSecret = value;
                    break;
                case "uosBucket":
                    ProjectConf.uosBucket = value;
                    break;
                case "uosBucketUuid":
                    ProjectConf.uosBucketUuid = value;
                    break;
                case "uosBadge":
                    ProjectConf.uosBadge = value;
                    break;
                case "localFolder":
                    ProjectConf.localFolder = value;
                    break;
            }
        }
    }
}
#endif
