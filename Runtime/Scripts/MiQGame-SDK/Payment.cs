using AOT;
using LitJson;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.Scripting;


namespace miqgame
{

    /// <summary>
    /// 需要由游戏服务端生成的订单明细字符串
    /// appId	游戏唯一ID
    /// appAccountId qg.login 成功返回的 appAccountId
    /// session qg.login 成功返回的 session
    /// cpOrderId   CP 侧游戏订单号
    /// cpUserInfo CP 透传字段（不可为空）
    /// displayName 商品展示名称
    /// feeValue    价格（单位：分）
    /// sign    签名的key为(AppKey 全是数字) (必传) 
    /// </summary>
    [Serializable]
    public class OrderInfo
    {
        public string appId;
        public long appAccountId;
        public string session;
        public string cpOrderId;
        public string cpUserInfo;
        public string displayName;
        public int feeValue;
        public string sign;
    }


    /// <summary>
    /// 回调成功
    /// tradeNO	订单号
    /// memo	返回的文案或错误信息，如："支付成功"
    /// payStatus	返回值：9000（支付成功）
    /// </summary>
    [Preserve]
    public class PaySuccessResult
    {
        public string tradeNO;
        public string memo;
        public string payStatus;

        public PaySuccessResult() { }
    }

    /// <summary>
    /// 回调失败
    /// code	返回的错误码（若无此字段则为空）
    /// memo	返回的文案或错误信息，如："支付已取消"
    /// resultStatus	返回值：6001（已取消支付）、5000/5001（微信相关异常）等
    /// </summary>
    [Preserve]
    public class PayFailResult
    {
        public int code;
        public string memo;
        public string resultStatus;
        public PayFailResult() { }
    }

    /// <summary>
    /// 支付选项
    /// </summary>
    public class PayOption
    {
        public OrderInfo orderInfo;
        public Action<PaySuccessResult> success;
        public Action<PayFailResult> fail;
        public Action complete;
    }


    internal static class PayAPI
    {

        private static int callbackCounter = 1;

        private static Dictionary<int, PayOption> asyncCallbackMap = new Dictionary<int, PayOption>();


        [DllImport("__Internal", EntryPoint = "QG_Pay")]
        private static extern void JSLIB_Pay(string orderInfo,Action<int,int,string> callback,int callbackId);

        [MonoPInvokeCallback(typeof(Action<int,int,string>))]
        static void JSCSCallback_Pay_Callback(int cbId, int type, string result)
        {
            Debug.Log($"JSCSCallback_Pay_Callback {cbId} type={type}");
            if (asyncCallbackMap.ContainsKey(cbId))
            {
                var option = asyncCallbackMap[cbId];
                switch (type)
                {
                    case 1:
                        option.success?.Invoke(Util.SafeConvertFromJSON<PaySuccessResult>(result));
                        break;
                    case -1:
                        option.fail?.Invoke(Util.SafeConvertFromJSON<PayFailResult>(result));
                        break;
                    case 0:
                        option.complete?.Invoke();
                        asyncCallbackMap.Remove(cbId);
                        break;
                }
            }
        }


        internal static void Pay(PayOption option)
        {
            var orderInfoJSON = JsonUtility.ToJson(option.orderInfo);
            var cbId = callbackCounter++;
            asyncCallbackMap[cbId] = option;
            JSLIB_Pay(orderInfoJSON,JSCSCallback_Pay_Callback,cbId);
        }
    }

    public partial class QG
    {

        /// <summary>
        /// 调用平台的支付能力，完成用户支付操作
        /// </summary>
        /// <param name="option">支付选项</param>
        public static void Pay(PayOption option)
        {
            PayAPI.Pay(option);
        }
    }
}