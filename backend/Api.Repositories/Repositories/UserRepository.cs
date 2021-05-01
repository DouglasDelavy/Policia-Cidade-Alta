using Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Api.Repositories.Repositories
{
    public class UserRepository : GenericRepository<User>
    {
        public UserRepository(ApplicationContext context) : base(context)
        {
        }

        public IQueryable<User> GetByUserName(string userName) =>
            _entities.UserRepository.Where(user => user.UserName == userName);

    }
}
