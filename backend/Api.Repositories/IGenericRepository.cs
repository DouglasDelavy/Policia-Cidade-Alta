using System.Collections.Generic;
using System.Linq;

namespace Api.Repositories
{
    public interface IGenericRepository<T> where T : class
    {
        IQueryable<T> Query();
        ICollection<T> GetAll();
        T GetById(int id);
        void Add(T entity);
        void Delete(T entity);
        void Update(T entity);
        int Count();
    }
}
