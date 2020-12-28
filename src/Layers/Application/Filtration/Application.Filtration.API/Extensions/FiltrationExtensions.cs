using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Application.Filtration.API.Interfaces;

namespace Application.Filtration.API.Extensions
{
    public static class FiltrationExtensions
    {
        public static Task<Expression<Func<TModel, bool>>> FilterAsync<TModel>(this IFilterable<TModel> self)
        {
            return Task.Factory.StartNew(self.Filter);
        }
    }
}