using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;


namespace miqgame{

    public partial class QG
    {
        public static Performance GetPerformance()
        {
            return new Performance();
        }
    }

    public class Performance
    {
        static int counter = 1;
        int Id { get; set; }

        [DllImport("__Internal", EntryPoint = "QG_GetPerformance")]
        internal static extern void JSLIB_GetPerformance(int id);

        [DllImport("__Internal", EntryPoint = "QG_Performance_Now")]
        internal static extern double JSLIB_Performance_Now(int id);

        internal Performance()
        {
            Id = counter++;
            JSLIB_GetPerformance(Id);
        }

        /// <summary>
        /// 返回时间戳（微秒）
        /// </summary>
        /// <returns></returns>
        public double Now()
        {
            return JSLIB_Performance_Now(Id);
        }

    }

}
