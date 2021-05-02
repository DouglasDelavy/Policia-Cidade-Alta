using Api.Repositories.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Api.Repositories
{
    public class UnitOfWork
    {
        private ApplicationContext _context;
        public UserRepository UserRepository { get; set; }
        public StatusRepository StatusRepository { get; set; }
        public CriminalCodeRepository CriminalCodeRepository { get; set; }

        public UnitOfWork(ApplicationContext context)
        {
            _context = context;
            UserRepository = new UserRepository(_context);
            StatusRepository = new StatusRepository(_context);
            CriminalCodeRepository = new CriminalCodeRepository(_context);
        }
        public async Task<int> Commit()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
