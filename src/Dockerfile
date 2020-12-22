FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80/tcp

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src

COPY "WLODZIMIERZ.sln" "WLODZIMIERZ.sln"

COPY "Layers/Application/Application.API/Application.API.csproj" "Layers/Application/Application.API/Application.API.csproj"
COPY "Layers/Application/Application.IntegrationTests/Application.IntegrationTests.csproj" "Layers/Application/Application.IntegrationTests/Application.IntegrationTests.csproj"
COPY "Layers/Application/Application.UnitTests/Application.UnitTests.csproj" "Layers/Application/Application.UnitTests/Application.UnitTests.csproj"
COPY "Layers/Domain/Domain.API/Domain.API.csproj" "Layers/Domain/Domain.API/Domain.API.csproj"
COPY "Layers/Infrastructure/Infrastructure.API/Infrastructure.API.csproj" "Layers/Infrastructure/Infrastructure.API/Infrastructure.API.csproj"
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
