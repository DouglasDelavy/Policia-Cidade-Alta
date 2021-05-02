using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Api.Models
{
    [Table("status")]
    public class Status
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<CriminalCode> CriminalCodes { get; set; }
    }
}
