using Api.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Api.Repositories.Repositories
{
    public class StatusRepository : GenericRepository<Status>
    {
        public StatusRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
