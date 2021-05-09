FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
ENV ASPNETCORE_URLS=http://+:5000
WORKDIR /app
EXPOSE 5000

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src

COPY "WLODZIMIERZ.sln" "WLODZIMIERZ.sln"

COPY "Layers/Domain/Domain.API/Domain.API.csproj" "Layers/Domain/Domain.API/Domain.API.csproj"

COPY "Layers/Application/Storage/Application.Storage.API" "Layers/Application/Storage/Application.Storage.API"
COPY "Layers/Application/Storage/Application.Storage.UnitTests" "Layers/Application/Storage/Application.Storage.UnitTests"
COPY "Layers/Application/Filtration/Application.Filtration.API" "Layers/Application/Filtration/Application.Filtration.API"
COPY "Layers/Application/Infrastructure/Caching/Application.Infrastructure.Caching.API" "Layers/Application/Infrastructure/Caching/Application.Infrastructure.Caching.API"
COPY "Layers/Infrastructure/EntityFramework/Infrastructure.EntityFramework.API" "Layers/Infrastructure/EntityFramework/Infrastructure.EntityFramework.API"
COPY "Layers/Application/Infrastructure/Identity/Application.Infrastructure.Identity.API" "Layers/Application/Infrastructure/Identity/Application.Infrastructure.Identity.API"
COPY "Layers/Application/Infrastructure/Notifications/Application.Infrastructure.Notifications.API" "Layers/Application/Infrastructure/Notifications/Application.Infrastructure.Notifications.API"
COPY "Layers/Application/Infrastructure/Persistence/Application.Infrastructure.Persistence.API" "Layers/Application/Infrastructure/Persistence/Application.Infrastructure.Persistence.API"
COPY "Layers/Application/Paging/Application.Paging.API" "Layers/Application/Paging/Application.Paging.API"
COPY "Layers/Application/Validation/Application.Validation.API" "Layers/Application/Validation/Application.Validation.API"

COPY "Layers/Infrastructure/Caching/Infrastructure.Caching.API" "Layers/Infrastructure/Caching/Infrastructure.Caching.API"
COPY "Layers/Infrastructure/Identity/Infrastructure.Identity.API" "Layers/Infrastructure/Identity/Infrastructure.Identity.API"
COPY "Layers/Infrastructure/Notifications/Infrastructure.Notifications.API" "Layers/Infrastructure/Notifications/Infrastructure.Notifications.API"
COPY "Layers/Infrastructure/Persistence/Infrastructure.Persistence.API" "Layers/Infrastructure/Persistence/Infrastructure.Persistence.API"

COPY "Layers/Presentation/Presentation.API/Presentation.API.csproj" "Layers/Presentation/Presentation.API/Presentation.API.csproj"

RUN dotnet restore "WLODZIMIERZ.sln"

COPY . .
WORKDIR /src/Layers/Presentation/Presentation.API
RUN dotnet publish --no-restore -c release -o /app

FROM build AS publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Presentation.API.dll"]
