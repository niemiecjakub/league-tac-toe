# LEAGUE-TAC-TOE
League-tac-toe is a League of Legends-themed twist on the classic game of tic-tac-toe. \
Challenge a friend to a game online or compete against random players from around the world.

 Play at: [leaguetactoe.com](https://leaguetactoe.com/)
 
<img width="1232" height="890" alt="image" src="https://github.com/user-attachments/assets/eecfb30e-d996-47cc-bab6-27e765515ce9" />

## How to play?

- A 3 x 3 square grid is lined up with criteria like legacy, position, resource, rangetype and region.
- Place your marker, an X or O, in one of the squares if you can name League of Legends champion that matches the criteria across the top row and left hand side.
- The first to get three in a row, vertically, horizontally or diagonally, is the winner.
- With steal mode enabled, each player has 3 steals in total, where a square can be stolen that is occupied by the opposing player.
- Infuriate your opponent and steal a square by naming a different champion to the champion already in the position on the grid.
  
## Quick Start

The easiest way to run the project locally is by using the provided Docker configuration.\
You can either:
- Run the frontend and backend separately by navigating into their respective folders and using their individual ```Dockerfiles```
- Use the root-level ```docker-compose.yml```, which automatically starts both services along with the .NET Aspire dashboard for monitoring.

```
git clone https://github.com/niemiecjakub/league-tac-toe.git # Clone the repository
cd league-tac-toe
```

Setup environment variables in ```.env``` file
```
ALLOWED_ORIGINS=http://localhost:3000
POSTGRES_HOST=db #Database service name
POSTGRES_PORT=5432 #Exposed Database port
POSTGRES_DB={DATABASE_NAME}
POSTGRES_USER={USERNAME}
POSTGRES_PASSWORD={PASSWORD}
ASPNETCORE_ENVIRONMENT={DEVELOPMENT | PRODUCTION}
API_URL=http://localhost:8080
```


```
docker-compose up --build
```

Embedded SQL scripts will initialize database schema and data

Once the containers start, you can access:
- Frontend: http://localhost:3000
- Backend: http://localhost:8080
- .NET Aspire Dashboard: http://localhost:18888

## Tech stack

- Next.js
- ASP.NET Core Web API
- SignalR
- PostgreSQL
- .NET Aspire dashboard
  
## Credits

- [League of Legends fandom wiki](https://leagueoflegends.fandom.com/wiki)
- [League of Legends universe](https://universe.leagueoflegends.com/)
- [Tiki-Taka-Toe](https://playfootball.games/footy-tic-tac-toe)
- [Datadragon](https://developer.riotgames.com/docs/lol)

# Contributing

If you would like to contribute open an issue/pull request or contact me directly

