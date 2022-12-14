﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Makale_DataAccessLayer
{
    public class Repository<T>:Singleton where T:class
    {
        DbSet<T> _objectset;
        public Repository()
        {
            _objectset=db.Set<T>();
        }
   
        public List<T> Liste()
        {
            return _objectset.ToList();
        }

        public IQueryable<T> ListeQueryable()
        {
            return _objectset.AsQueryable();
        }
        public List<T> Liste(Expression<Func<T,bool>> kosul)
        {
           return _objectset.Where(kosul).ToList();
        }

        public T Find(Expression<Func<T, bool>> kosul)
        {
            return _objectset.FirstOrDefault(kosul);
        }

        public int Insert(T nesne)
        {
            _objectset.Add(nesne);
            return db.SaveChanges();
        }

        public int Delete(T nesne)
        {
            _objectset.Remove(nesne);
            return db.SaveChanges();
        }

        public int Update()
        {
            return db.SaveChanges();
        }


    }
}
