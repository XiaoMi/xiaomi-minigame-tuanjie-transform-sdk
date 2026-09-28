using AOT;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.Diagnostics;
using UnityEngine.Scripting;


namespace miqgame
{
    public partial class QG
    {
        /// <summary>
        /// 创建 CustomizeLoading 组件
        /// </summary>
        /// <param name="option"></param>
        /// <returns></returns>
        public static CustomizeLoading CreateCustomizeLoading(CustomizeLoadingOption option)
        {
            var optionJson = JsonUtility.ToJson(option);
            //Debug.Log("create loding " + optionJson);
            return new CustomizeLoading(optionJson);
        }
    }

    /// <summary>
    /// 
    /// background      背景图片，可以为网络图片或本地图片
    /// text            加载进度文本
    /// textColor       文本的颜色。必须是 16 进制格式的颜色字符串，例如：'#999999'
    /// loadingColorTop     loading 进度条渐变色顶部颜色。必须是 16 进制格式的颜色字符串，默认无背景色，例如：'#999999'
    /// loadingColorBottom  loading 进度条渐变色底部颜色。必须是 16 进制格式的颜色字符串，默认无背景色，例如：'#999999'
    /// loadingProgress 进度条的进度
    /// flow            首屏所需资源大小，显示流量消耗提示，单位 Mb。若首屏所需资源超过 30Mb，则必须提供该值，否则可能审核不通过
    /// </summary>
    public class CustomizeLoadingOption
    {
        public string textColor;
        public string text;
        public string background;
        public string loadingColorTop;
        public string loadingColorBottom;
        public int loadingProgress;
        public int flow;

    }


    public class CustomizeLoadingUpdateOption : CustomizeLoadingOption
    {
        [NonSerialized] public Action<GeneralCallbackResult> success;
        [NonSerialized] public Action<GeneralFailResult> fail;
        [NonSerialized] public Action complete;
    }

    public class CustomizeLoadingGetProgressOption
    {
        [NonSerialized] public Action<CustomizeLoadingGetProgressResulet> success;
        [NonSerialized] public Action<GeneralFailResult> fail;
        [NonSerialized] public Action complete;
    }


    [Preserve]
    public class CustomizeLoadingGetProgressResulet
    {
        public double currentProgress;
        public CustomizeLoadingGetProgressResulet() { }
    }

    public class CustomizeLoading
    {
        static int counter = 1;
        public int Id { get; internal set; }

        static int updateCallbackCounter = 1;

        static Dictionary<int, object> asyncCallbackMap = new Dictionary<int, object>();


        [DllImport("__Internal", EntryPoint = "QG_CreateCustomizeLoading")]
        internal static extern void JSLIB_CreateCustomizeLoading(int id, string option);

        [DllImport("__Internal", EntryPoint = "QG_CustomizeLoading_Update")]
        internal static extern void JSLIB_CustomizeLoading_Update(int id, string option,Action<int, int, int, string> updateCallback, int callbackId );

        [DllImport("__Internal", EntryPoint = "QG_CustomizeLoading_GetProgress")]
        internal static extern void JSLIB_CustomizeLoading_GetProgress(int id, Action<int, int, int, string> updateCallback, int callbackId);

        [DllImport("__Internal", EntryPoint = "QG_CustomizeLoading_ResetLoading")]
        internal static extern void JSLIB_CustomizeLoading_ResetLoading(int id);

        [DllImport("__Internal", EntryPoint = "QG_CustomizeLoading_Remove")]
        internal static extern void JSLIB_CustomizeLoading_Remove(int id);

        [MonoPInvokeCallback(typeof(Action<int, int, int, string>))]
        static void JSCSCallback_CustomizeLoading_GetProgress_Callback(int id, int cbId, int status, string result)
        {
            //Debug.Log($"JSCSCallback_CustomizeLoading_GetProgress {id} {cbId} type={status} {result} {asyncCallbackMap.ContainsKey(id)}");
            if (asyncCallbackMap.ContainsKey(cbId))
            {
                var option = asyncCallbackMap[cbId] as CustomizeLoadingGetProgressOption;
                switch (status)
                {
                    case 1:
                        var res = Util.SafeConvertFromJSON<CustomizeLoadingGetProgressResulet>(result);
                        //Debug.Log("retret"+res.currentProgress);
                        option.success?.Invoke(res);
                        break;
                    case -1:
                        option.fail?.Invoke(Util.SafeConvertFromJSON<GeneralFailResult>(result));
                        break;
                    case 0:
                        option.complete?.Invoke();
                        break;
                }
            }
        }

        [MonoPInvokeCallback(typeof(Action<int,int,int,string>))]
        static void JSCSCallback_CustomizeLoading_Update_Callback(int id,int cbId,int status, string result)
        {
            //Debug.Log($"JSCSCallback_CustomizeLoading_Update {id} {cbId} type={status}");
            if (asyncCallbackMap.ContainsKey(cbId))
            {
                var option = asyncCallbackMap[cbId] as CustomizeLoadingUpdateOption;
                switch (status)
                {
                    case 1:
                        option.success?.Invoke(Util.SafeConvertFromJSON<GeneralCallbackResult>(result));
                        break;
                    case -1:
                        option.fail?.Invoke(Util.SafeConvertFromJSON<GeneralFailResult>(result));
                        break;
                    case 0:
                        option.complete?.Invoke();
                        break;
                }
            }
        }

        internal CustomizeLoading(string conf)
        {
            Id = counter++;
            JSLIB_CreateCustomizeLoading(Id, conf);
        }

        /// <summary>
        /// 更新 CustomizeLoading 样式
        /// </summary>
        /// <param name="updateOption"></param>
        public void Update(CustomizeLoadingUpdateOption updateOption)
        {
            var cbId = updateCallbackCounter++;
            asyncCallbackMap[cbId] = updateOption;
            var option = JsonUtility.ToJson(updateOption);
            var optionJson = JsonUtility.ToJson(option);
            JSLIB_CustomizeLoading_Update(Id, option, JSCSCallback_CustomizeLoading_Update_Callback, cbId);
        }

        /// <summary>
        /// 销毁 CustomizeLoading 组件
        /// </summary>
        public void Remove()
        {
            JSLIB_CustomizeLoading_Remove(Id);
        }


        public void ResetLoading()
        {
            JSLIB_CustomizeLoading_ResetLoading(Id);
        }

        public void GetProgress(CustomizeLoadingGetProgressOption getOpt)
        {
            var cbId = updateCallbackCounter++;
            asyncCallbackMap[cbId] = getOpt;
            JSLIB_CustomizeLoading_GetProgress(Id, JSCSCallback_CustomizeLoading_GetProgress_Callback, cbId);
        }
    }

}
