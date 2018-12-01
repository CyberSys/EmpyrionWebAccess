﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmpyrionModWebHost.Extensions
{
    public static class EnumerableExtensions
    {
        public static IEnumerable<T> ForEach<T>(this T[] aArray, Action<T> aAction)
        {
            foreach (var item in aArray) aAction(item);
            return aArray;
        }

        public static IEnumerable<T> ForEach<T>(this IEnumerable<T> aArray, Action<T> aAction)
        {
            foreach (var item in aArray) aAction(item);
            return aArray;
        }
    }
}