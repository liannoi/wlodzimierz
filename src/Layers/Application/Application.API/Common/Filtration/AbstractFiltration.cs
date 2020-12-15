using System;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Application.API.Common.Filtration
{
    public abstract class AbstractFiltration<TModel> : IFiltration<TModel>
    {
        public Task<Expression<Func<TModel, bool>>> FilterAsync()
        {
            return Task.Factory.StartNew(Filter);
        }

        public abstract Expression<Func<TModel, bool>> Filter();
    }
}