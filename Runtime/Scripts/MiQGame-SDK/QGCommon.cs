using AOT;
using LitJson;
using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.Scripting;


namespace miqgame
{
    /// <summary>
    /// 通用成功回调结果
    /// </summary>
    /// <typeparam name="T">数据</typeparam>
    public class GeneralSuccessResult<T>
    {
        public T value;
    }

    /// <summary>
    /// 通用失败回调
    /// </summary>
    public class GeneralFailResult
    {
        public string errMsg;
        public int errCode;
    }

    /// <summary>
    /// 登录成功结果
    /// </summary>
    [Preserve][Serializable]
    public class LoginSuccessResult
    {
        /// <summary>
        /// 游戏服务计费系统用户 ID，作为用户的唯一标识
        /// </summary>
        [SerializeField] public long appAccountId;
        //[SerializeField] public string avatar;
        [SerializeField] public long uid;
        [SerializeField] public string avatarUrl;
        [SerializeField] public string nickName;
        /// <summary>
        /// 本次登录游戏的会话 ID（当前登录有效，会过期）
        /// </summary>
        [SerializeField] public string session;
        [SerializeField] public string token;

        public override string ToString()
        {
            return $"appAccountID:{appAccountId}\nuid:{uid}\navatarUrl:{avatarUrl}\nnickName:{nickName}\nsession:{session}\ntoken:{token}";
        }
    }


    public class LoginOption
    {
        public Action<LoginSuccessResult> success;
        public Action<GeneralFailResult> fail;
        public Action complete;
    }


    public class GetManifestInfoOption
    {
        public Action<GeneralSuccessResult<string>> success;
        public Action<GeneralFailResult> fail;
        public Action complete;
    }

    public class InstallShortcutOption
    {
        public Action success;
        public Action<GeneralFailResult> fail;
        public Action complete;
    }

    public class ReferrerInfo
    {
        public string package;
        public string appId;
        public string type;
        public string extraData;
        public static ReferrerInfo FromJson(JsonData json)
        {
            var refInfo = new ReferrerInfo();
            Util.GetDataByKey(json, "package", ref refInfo.package);
            Util.GetDataByKey(json, "type", ref refInfo.type);
            Util.GetDataByKey(json, "appId", ref refInfo.appId);
            Util.GetDataByKey(json, "extraData", ref refInfo.extraData);
            return refInfo;
        }

        public override string ToString()
        {
            return $"package:{package},\nappId:{appId},\ntype:{type},\nextraData:{extraData}";
        }
    }
    public class EnterOption
    {
        public string type;
        public Dictionary<string, string> query;
        public ReferrerInfo refererInfo;

        public static EnterOption FromJson(string json)
        {
            var jobj = JsonMapper.ToObject(json);
            var result = new EnterOption();
            Util.GetDataByKey(jobj, "type", ref result.type); 
            Util.GetDataByKey(jobj, "query", ref result.query); 
            if (jobj.ContainsKey("referrerInfo"))
            {
                result.refererInfo = ReferrerInfo.FromJson(jobj["referrerInfo"]);
            }
            return result;
        }

        public override string ToString()
        {
            return $"type:{type} \nrefererInfo:\n{{\n{refererInfo}\n}}\nquery:{Util.DictionaryToString(query)}";
        }
    }

    public class LauchOption
    {
        public Dictionary<string, string> query;
        public ReferrerInfo refererInfo;
        public static LauchOption FromJson(string json)
        {
            var jobj = JsonMapper.ToObject(json);
            //Debug.Log($"jobj {jobj}");
            var result = new LauchOption();
            Util.GetDataByKey(jobj, "query", ref result.query);
            if (jobj.ContainsKey("referrerInfo"))
            {
                result.refererInfo = ReferrerInfo.FromJson(jobj["referrerInfo"]);
            }
            return result;
        }

        public override string ToString()
        {
            return $"refererInfo:\n{{{refererInfo}\n}}\nquery:{Util.DictionaryToString(query)}";
        }
    } 

}