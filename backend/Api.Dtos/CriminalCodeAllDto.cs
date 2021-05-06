using System;
using System.Collections.Generic;
using System.Text;

namespace Api.Dtos
{
    public class CriminalCodeAllDto
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int PrisonTime { get; set; }
        public decimal Penality { get; set; }
        public string Status { get; set; }
        public int StatusId { get; set; }
        public DateTime? Date { get; set; }
    }
}
