using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Api.Models
{
    [Table("criminal_code")]
    public class CriminalCode
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Penality { get; set; }
        public int PrisonTime { get; set; }
        public int StatusId { get; set; }
        public DateTime CreateData { get; set; }
        public DateTime UpdateData { get; set; }
        public int CreateUserId { get; set; }
        public int UpdateUserId { get; set; }
        public virtual User user { get; set; }
    }
}
