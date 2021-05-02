using Api.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Api.Repositories.Repositories
{
    public class CriminalCodeRepository : GenericRepository<CriminalCode>
    {
        public CriminalCodeRepository(ApplicationContext context) : base(context)
        {
        }
        public IQueryable<CriminalCode> GetByName(string name) => _context.CriminalCodeRepository.Where(x => x.Name == name);

        public IQueryable<CriminalCode> GetAllCriminalCode(string filter = null) =>
            _context.CriminalCodeRepository.Include(x => x.Status).Where(x => EF.Functions.Like(x.Name, $"{filter}%"));
    }
}
