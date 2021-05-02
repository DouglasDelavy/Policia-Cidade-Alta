using System;
using System.Collections.Generic;
using System.Text;

namespace Api.Dtos
{
    public class FilterDto<T> where T : class
    {
        public int Count { get; set; }
        public List<T> Data { get; set; }
    }
}
