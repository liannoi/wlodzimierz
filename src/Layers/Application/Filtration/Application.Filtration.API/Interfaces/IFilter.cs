using System;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Application.Filtration.API.Interfaces
{
    public interface IFilter<TModel>
    {
        public Expression<Func<TModel, bool>> Filter();

        public Task<Expression<Func<TModel, bool>>> FilterAsync()
        {
            return Task.Factory.StartNew(Filter);
        }
    }
}