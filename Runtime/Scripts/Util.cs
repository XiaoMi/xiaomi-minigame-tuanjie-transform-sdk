using LitJson;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using UnityEngine;

namespace miqgame
{
    public static class Util
    {
        public static string ResolveBuildPath(string path)
        {
            if (string.IsNullOrEmpty(path))
                return path;
            if (!Path.IsPathRooted(path))
                path = Path.GetFullPath(Path.Combine(Path.GetDirectoryName(Application.dataPath), path));
            return path;
        }

        public static JsonData Data(this JsonData data, string key) {
            if (data.ContainsKey(key))
            {
                return data[key];
            }
            else
            {
                return null;
            }
        }

        public static void GetDataByKey(JsonData jdata, string key, ref string output) {
            if (jdata != null && jdata.ContainsKey(key))
            {
                var value = jdata[key];
                output = value.IsString ? value.ToString() : value.ToJson();
                //Debug.Log($"GetDataByKey [{key}]={output}");
            }
        }



        public static void GetDataByKey(JsonData jdata, string key, ref Dictionary<string, string> output)
        {
            if (jdata != null && key != null && output != null && jdata.ContainsKey(key))
            {
                output = JsonToDictionary(jdata[key]);
            }
        }

        public static Dictionary<string, string> JsonToDictionary(JsonData jdata)
        {
            var dic = new Dictionary<string, string>();
            var keys = jdata.Keys;
            foreach (var key in keys)
            {
                Debug.Log($"{key}->{jdata[key].ToString()}");
                dic[key] = jdata[key].ToString();
            }
            return dic;
        }

        public static string DictionaryToString<K, V>(Dictionary<K, V> dic)
        {
            StringBuilder sb = new StringBuilder();
            foreach (var kvp in dic)
            {
                sb.Append($"{kvp.Key}:{kvp.Value},");
            }
            return sb.ToString();

        }

        public static T SafeConvertFromJSON<T>(string json){
            try
            {
                var res = JsonMapper.ToObject<T>(json);
                if (res != null)
                {
                    return res;
                }
                else
                {
                    Debug.Log($"Convert Failed type={typeof(T)} json={json}");
                }
            }catch(Exception ex)
            {
                Debug.Log($"Convert Failed type={typeof(T)} json={json} msg={ex.Message}");
            }
            return default(T);
        }


        public static T GetValueFromJSONObject<T>(JsonData jdata, string key)
        {
            try
            {
                if (jdata.ContainsKey(key))
                {
                    var value = jdata[key];
                    if (value.IsString && typeof(T)==typeof(string))
                    {
                        return (T)(object)(string)value;
                    }
                    if(value.IsDouble && typeof(T) == typeof(double))
                    {
                        return (T)(object)(double)value;
                    }
                    if (value.IsLong && typeof(T) == typeof(long))
                    {
                        return (T)(object)(long)value;
                    }
                    if(value.IsInt && typeof(T) == typeof(int))
                    {
                        return (T)(object)(int)value;
                    }

                    Debug.Log($"Get Value Faild key={key} is not {typeof(T)}");
                }
                else
                {
                    Debug.Log($"Get Value Faild key={key} does not exist");
                }
            }
            catch (Exception ex)
            {
                Debug.Log($"GetValue Failed key={key} msg={ex.Message}");
            }
            return default(T);
        }
    }
}
