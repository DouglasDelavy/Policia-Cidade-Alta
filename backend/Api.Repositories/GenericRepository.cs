using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Api.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly ApplicationContext _entities;
        public GenericRepository(ApplicationContext entities)
        {
            _entities = entities;
        }

        public IQueryable<T> Query()
        {
            return _entities.Set<T>().AsQueryable();
        }

        public void Add(T entity)
        {
            _entities.Set<T>().Add(entity);
        }

        public void Delete(T entity)
        {
            _entities.Set<T>().Remove(entity);
        }

        public void Update(T obj)
        {
            _entities.Entry(obj).State = EntityState.Modified;
        }

        public ICollection<T> GetAll()
        {
            return _entities.Set<T>().ToList();
        }

        public T GetById(int id)
        {
            return _entities.Set<T>().Find(id);
        }
        public int Count()
        {
            return _entities.Set<T>().Count();
        }
    }
}
