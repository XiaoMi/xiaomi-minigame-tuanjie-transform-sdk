using AOT;
using LitJson;
using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;


namespace miqgame
{
    public partial class QG
    {
        internal static int callbackIDCounter = 0;
        static Dictionary<int, object> asyncCallbackMap = new Dictionary<int, object>();

        [DllImport("__Internal", EntryPoint = "QG_GetProvider")]
        internal static extern string JSLIB_GetProvider();

        /// <summary>
        /// 获取渠道的名称
        /// </summary>
        /// <returns></returns>
        public static string GetProvider()
        {
            return JSLIB_GetProvider();
        }

        [DllImport("__Internal", EntryPoint = "QG_Login")]
        internal static extern void JSLIB_Login(int id, Action<int, int, string> callback);

        /// <summary>
        /// 登录接口
        /// </summary>
        /// <param name="option"></param>
        public static void Login(LoginOption option)
        {
            var callbackID = callbackIDCounter++;
            asyncCallbackMap[callbackID] = option;
            JSLIB_Login(callbackID, JSCSCallback_Login);
        }

        [MonoPInvokeCallback(typeof(Action<int, int, string>))]
        static void JSCSCallback_Login(int id, int status, string json)
        {
            Debug.Log($"JSCSCallback_Login {id} {status} {json}");
            if (asyncCallbackMap.ContainsKey(id))
            {
                var option = asyncCallbackMap[id] as LoginOption;
                switch (status)
                {
                    case 1:
                        var res = Util.SafeConvertFromJSON<LoginSuccessResult>(json);
                        option.success?.Invoke(res);
                        break;
                    case -1:
                        option.fail?.Invoke(Util.SafeConvertFromJSON<GeneralFailResult>(json));
                        break;
                    case 0:
                        option.complete?.Invoke();
                        break;
                }
            }
        }


        [DllImport("__Internal", EntryPoint = "QG_GetManifestInfo")]
        internal static extern void JSLIB_GetManifestInfo(int id, Action<int, string> success, Action<int, int, string> fail, Action<int> complete);

        /// <summary>
        /// 获取本地包中 manifest.json 的内容信息
        /// </summary>
        /// <param name="option"></param>
        public static void GetManifestInfo(GetManifestInfoOption option)
        {
            var callbackID = callbackIDCounter++;
            asyncCallbackMap[callbackID] = option;
            JSLIB_GetManifestInfo(callbackID, JSCSCallback_GetManifestInfo_Success, JSCSCallback_GetManifestInfo_Fail, JSCSCallback_GetManifestInfo_Complete);
        }

        [MonoPInvokeCallback(typeof(Action<int, string>))]
        static void JSCSCallback_GetManifestInfo_Success(int id, string data)
        {
            //Debug.Log($"JSCSCallback_GetManifestInfo_Success {id} {data}");
            if (asyncCallbackMap.ContainsKey(id))
            {
                var option = asyncCallbackMap[id] as GetManifestInfoOption;
                option.success?.Invoke(new GeneralSuccessResult<string> { value = data });
            }
        }

        [MonoPInvokeCallback(typeof(Action<int, int, string>))]
        static void JSCSCallback_GetManifestInfo_Fail(int id, int code, string err)
        {
            //Debug.Log("JSCSCallback_GetManifestInfo_Fail " + err);
            if (asyncCallbackMap.ContainsKey(id))
            {
                var option = asyncCallbackMap[id] as GetManifestInfoOption;
                option.fail?.Invoke(new GeneralFailResult
                {
                    errCode = code,
                    errMsg = err
                });
            }
        }

        [MonoPInvokeCallback(typeof(Action<int>))]
        static void JSCSCallback_GetManifestInfo_Complete(int id)
        {
            //Debug.Log("JSCSCallback_GetManifestInfo_Complete ");
            if (asyncCallbackMap.ContainsKey(id))
            {
                var option = asyncCallbackMap[id] as GetManifestInfoOption;
                option.complete?.Invoke();
                asyncCallbackMap.Remove(id);
            }
        }

        [DllImport("__Internal", EntryPoint = "QG_ExitApplication")]
        public static extern void ExitApplication();


        [DllImport("__Internal", EntryPoint = "QG_GetLaunchOptionsSync")]
        public static extern string JSLIB_GetLaunchOptionsSync();

        /// <summary>
        /// 获取快游戏冷启动时的参数
        /// </summary>
        /// <returns></returns>
        public static LauchOption GetLaunchOptionsSync()
        {
            var result = JSLIB_GetLaunchOptionsSync();
            //Debug.Log($"JSLIB_GetLaunchOptionsSync {result}");
            return LauchOption.FromJson(result);
        }


        [DllImport("__Internal", EntryPoint = "QG_GetEnterOptionsSync")]
        public static extern string JSLIB_GetEnterOptionsSync();

        /// <summary>
        /// 获取快游戏启动时的参数(包括冷启动和热启动)
        /// </summary>
        /// <returns></returns>
        public static EnterOption GetEnterOptionsSync()
        {
            var result = JSLIB_GetEnterOptionsSync();
            //Debug.Log($"JSLIB_GetEnterOptionsSync {result}");
            return EnterOption.FromJson(result);
        }
    }
}