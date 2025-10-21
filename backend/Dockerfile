FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

COPY ["LeagueChampions.csproj", "LeagueChampions/"]
RUN dotnet restore 'LeagueChampions/LeagueChampions.csproj'

COPY [".", "./LeagueChampions"]
WORKDIR /app/LeagueChampions
RUN dotnet build 'LeagueChampions.csproj' -c Release -o /app/build

FROM build as publish
RUN dotnet publish 'LeagueChampions.csproj' -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "LeagueChampions.dll"]
