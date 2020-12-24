using AutoMapper;

namespace Application.Mappings.API.Interfaces
{
    public interface IMapFrom<T>
    {
        public void Mapping(Profile profile)
        {
            profile.CreateMap(typeof(T), GetType());
        }
    }
}