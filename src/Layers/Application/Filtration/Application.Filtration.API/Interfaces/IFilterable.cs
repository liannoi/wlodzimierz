using System;
using System.Linq.Expressions;

namespace Application.Filtration.API.Interfaces
{
    public interface IFilterable<TModel>
    {
        public Expression<Func<TModel, bool>> Filter();
    }
}