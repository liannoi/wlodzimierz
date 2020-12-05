using AutoMapper;

namespace Wlodzimierz.Tools.Mappings
{
    public interface IMapFrom<TSource>
    {
        void Mapping(Profile profile)
        {
            profile.CreateMap(typeof(TSource), GetType());
        }
    }
}