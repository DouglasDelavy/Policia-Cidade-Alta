using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Threading.Tasks;

namespace Api.Models
{
    [Table("criminal_code")]
    public class CriminalCode
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Penality { get; set; }
        public int PrisonTime { get; set; }
        public int StatusId { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public int CreateUserId { get; set; }
        public int? UpdateUserId { get; set; }
        public virtual User User { get; set; }
        public virtual Status Status { get; set; }
    }
}
