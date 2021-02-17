using AutoMapper;

namespace Application.Storage.API.Core.Mappings.Interfaces
{
    public interface IMapFrom<T>
    {
        public void Mapping(Profile profile)
        {
            profile.CreateMap(typeof(T), GetType());
        }
    }
}