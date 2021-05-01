using Api.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace Api.Services
{
    public class GenericApplicationService
    {
        public readonly UnitOfWork _uow;
        public GenericApplicationService(UnitOfWork uow)
        {
            _uow = uow;
        }
    }
}
