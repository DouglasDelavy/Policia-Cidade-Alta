using Api.Repositories.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Api.Repositories
{
    public class UnitOfWork
    {
        private ApplicationContext _entities;
        public UserRepository UserRepository { get; set; }

        public UnitOfWork(ApplicationContext entities)
        {
            _entities = entities;
            UserRepository = new UserRepository(_entities);
        }
        public async Task<int> Commit()
        {
            return await _entities.SaveChangesAsync();
        }

        public async Task Dispose()
        {
            _entities.Dispose();
        }
    }
}
