using AOT;
using LitJson;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;


namespace miqgame {
    
    [Serializable]
    public class ShortcutButtonStyle{
        public double top;
        public double left;
        public double width;
        public string backgroundColor;        
        public double height;
        public string color;
        public double fontSize;    
    }

    [Serializable]
    public class ShortcutButtonOption {
        public string type;
        public string image;
        public ShortcutButtonStyle style;
    }

    public class ShortcutButton
    {

        static int counter = 1;
        public int Id { get; internal set; }

        internal static int callbackCounter = 1;
        static List<(int,Action<GeneralCallbackResult>)> listenerList = new List<(int, Action<GeneralCallbackResult>)>();

        [DllImport("__Internal", EntryPoint = "QG_CreateShortcutButton")]
        internal static extern void JSLIB_CreateShortcutButton(int id, string option);

        [DllImport("__Internal", EntryPoint = "QG_ShortcutButton_Show")]
        internal static extern void JSLIB_ShortcutButton_Show(int id);

        [DllImport("__Internal", EntryPoint = "QG_ShortcutButton_Hide")]
        internal static extern void JSLIB_ShortcutButtonHide(int id);

        [DllImport("__Internal", EntryPoint = "QG_ShortcutButton_OnTap")]
        internal static extern void JSLIB_ShortcutButton_OnTap(int id, Action<int,string> listener,int listenerId);


        [DllImport("__Internal", EntryPoint = "QG_ShortcutButton_OffTap")]
        internal static extern void JSLIB_ShortcutButton_OffTap(int id, int listenerId);

        [DllImport("__Internal", EntryPoint = "QG_ShortcutButton_Destroy")]
        internal static extern void JSLIB_ShortcutButton_Destroy(int id);

        internal ShortcutButton(string jsonOption)
        {
            Id = counter++;
            JSLIB_CreateShortcutButton(Id,jsonOption);
        }

        public void Show()
        {
            JSLIB_ShortcutButton_Show(Id);
        }

        public void Hide()
        {
            JSLIB_ShortcutButtonHide(Id);
        }


        public void OnTap(Action<GeneralCallbackResult> callback)
        {
            var id = callbackCounter++;
            listenerList.Add((id, callback));
            JSLIB_ShortcutButton_OnTap(id, ShortcutButton_OnTapCallback, id);
        }

        public void OffTap(Action<GeneralCallbackResult> listener)
        {
            var idx = listenerList.FindIndex((item) =>
            {
                return item.Item2 == listener;
            });
            if (idx == -1) {
                Debug.Log("unregistered listener");
            }
            else
            {
                var item = listenerList[idx];
                JSLIB_ShortcutButton_OffTap(Id, item.Item1);
                listenerList.RemoveAt(idx);
            }
            //listenerList.find;
            //var id = callbackCounter++;
            //listenerList[id] = callback;
        }

        public void Destroy()
        {
            JSLIB_ShortcutButton_Destroy(Id);
        }

        [MonoPInvokeCallback(typeof(Action<int, string>))]
        public static void ShortcutButton_OnTapCallback(int listenerId,string res)
        {
            Debug.Log($"ShortcutButton_OnTapCallback id:{listenerId} res:{res}");
            var idx = listenerList.FindIndex((item) =>
            {
                return item.Item1 == listenerId;
            });

            if (idx!=-1)
            {
                var jobj = JsonMapper.ToObject(res);
                var msg = jobj["msg"];
                listenerList[idx].Item2.Invoke(new GeneralCallbackResult {errMsg = "zzz" });
            }
        }
    }

    internal static class ShortcutAPI
    {
        static int callbackIDCounter = 0;

        static Dictionary<int, object> asyncCallbackMap = new Dictionary<int, object>();

        [DllImport("__Internal", EntryPoint = "QG_InstallShortcut")]
        static extern string JSLIB_InstallShortcut(int id, Action<int> success, Action<int, string> fail, Action<int> complete);
        internal static void InstallShortcut(InstallShortcutOption option)
        {
            var callbackID = callbackIDCounter++;
            asyncCallbackMap[callbackID] = option;
            JSLIB_InstallShortcut(callbackID, JSCSCallback_InstallShortcut_Success, JSCSCallback_InstallShortcut_Fail, JSCSCallback_InstallShortcut_Complete);
        }

        [MonoPInvokeCallback(typeof(Action<int>))]
        static void JSCSCallback_InstallShortcut_Success(int id)
        {
            Debug.Log($"JSCSCallback_InstallShotcut_Success {id}");
            if (asyncCallbackMap.ContainsKey(id))
            {
                var option = asyncCallbackMap[id] as InstallShortcutOption;
                option.success?.Invoke();
            }
        }

        [MonoPInvokeCallback(typeof(Action<int, string>))]
        static void JSCSCallback_InstallShortcut_Fail(int id, string err)
        {
            Debug.Log("JSCSCallback_InstallShotcut_Fail " + err);
            if (asyncCallbackMap.ContainsKey(id))
            {
                var option = asyncCallbackMap[id] as InstallShortcutOption;
                option.fail?.Invoke(new GeneralFailResult
                {
                    errMsg = err
                });
            }
        }

        [MonoPInvokeCallback(typeof(Action<int>))]
        static void JSCSCallback_InstallShortcut_Complete(int id)
        {
            Debug.Log("JSCSCallback_InstallShotcut_Complete ");
            if (asyncCallbackMap.ContainsKey(id))
            {
                var option = asyncCallbackMap[id] as InstallShortcutOption;
                option.complete?.Invoke();
                asyncCallbackMap.Remove(id);
            }
        }
    }


    public partial class QG
    {
        public static ShortcutButton CreateShortcutButton(ShortcutButtonOption option)
        {
            var optionJson = JsonUtility.ToJson(option);
            Debug.Log("create sb " + optionJson);
            return new ShortcutButton(optionJson);
        }

        public static void InstallShortcut(InstallShortcutOption option)
        {
            ShortcutAPI.InstallShortcut(option);
        }
    }


}