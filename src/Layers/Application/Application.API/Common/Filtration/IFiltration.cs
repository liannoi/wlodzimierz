using System;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Application.API.Common.Filtration
{
    public interface IFiltration<TModel>
    {
        public Expression<Func<TModel, bool>> Filter();

        public Task<Expression<Func<TModel, bool>>> FilterAsync();
    }
}