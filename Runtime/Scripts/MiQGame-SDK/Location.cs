using AOT;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.Scripting;



namespace miqgame{
    /// <summary>
    /// 参数说明
    /// altitude    默认false，传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
    /// type        wgs84 返回 gps 坐标
    /// isHighAccuracy  开启高精度定位
    /// highAccuracyExpireTime 高精度定位超时时间(ms)，指定时间内返回最高精度，该值 3000ms 以上高精度定位才有效果
    /// success 接口调用成功的回调函数
    /// fail    接口调用失败的回调函数
    /// complete    接口调用结束的回调函数（调用成功、失败都会执行）
    /// </summary>
    public class GetLocationOption
    {
        public string type;
        public bool altitude;
        public bool isHighAccuracy;
        public double hightAccuracyExpireTime;
        [NonSerialized]public Action<LocationResult> success;
        [NonSerialized]public Action<GeneralFailResult> fail;
        [NonSerialized]public Action complete;
    }

    /// <summary>
    /// success回调函数的参数
    /// longitude   经度，范围为 -180~180，负数表示西经
    /// latitude    纬度，范围为 -90~90，负数表示南纬
    /// speed       速度，单位 m/s
    /// accuracy    位置的精确度
    /// altitude    高度，单位 m
    /// verticalAccuracy    垂直精度，单位 m（Android 无法获取，返回 0）
    /// horizontalAccuracy  水平精度，单位 m
    /// </summary>
    [Preserve]
    public class LocationResult
    {
        public double latitude;
        public double longitude;
        public double speed;
        public double accuracy;
        public double altitude;
        public double verticalAccuracy;
        public double horizontalAccuracy;
        public LocationResult() { }
    }
    internal static class LocationAPI
    {

        private static int callbackCounter = 1;

        private static Dictionary<int, GetLocationOption> asyncCallbackMap = new Dictionary<int, GetLocationOption>();

        [DllImport("__Internal", EntryPoint = "QG_GetLocation")]
        private static extern void JSLIB_GetLocation(string orderInfo, Action<int, int, string> callback, int callbackId);

        [MonoPInvokeCallback(typeof(Action<int, int, string>))]
        static void JSCSCallback_GetLocation_Callback(int cbId, int type, string result)
        {
            //Debug.Log($"JSCSCallback_GetLocation_Callback {cbId} type={type}");
            if (asyncCallbackMap.ContainsKey(cbId))
            {
                var option = asyncCallbackMap[cbId];
                switch (type)
                {
                    case 1:
                        option.success?.Invoke(Util.SafeConvertFromJSON<LocationResult>(result));
                        break;
                    case -1:
                        option.fail?.Invoke(Util.SafeConvertFromJSON<GeneralFailResult>(result));
                        break;
                    case 0:
                        option.complete?.Invoke();
                        asyncCallbackMap.Remove(cbId);
                        break;
                }
            }
        }

        internal static void GetLocation(GetLocationOption option)
        {
            var locOption = JsonUtility.ToJson(option);
            var cbId = callbackCounter++;
            asyncCallbackMap[cbId] = option;
            JSLIB_GetLocation(locOption, JSCSCallback_GetLocation_Callback, cbId);
        }
    }

    public partial class QG
    {
        /// <summary>
        /// 获取用户地理位置
        /// </summary>
        /// <param name="option"></param>
        public static void GetLocation(GetLocationOption option)
        {
            LocationAPI.GetLocation(option);
        }
    }

}
