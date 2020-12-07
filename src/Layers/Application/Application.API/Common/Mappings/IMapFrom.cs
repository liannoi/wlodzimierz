using AutoMapper;

namespace Application.API.Common.Mappings {
  public interface IMapFrom<T> {
    void Mapping(Profile profile) { profile.CreateMap(typeof(T), GetType()); }
  }
}