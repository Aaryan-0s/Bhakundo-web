// msw-handlers.js
import { rest } from "msw";

const API_BASE_URL = "http://localhost:3001/api/v1/football";

export const Footballhandlers = [
  // Get today's game fixtures
  rest.get(`${API_BASE_URL}/game`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        message: "Successfully fetched today's games",
        data: [
          {
            fixtureId: "1",
            status: "ft",
            homeTeam: "Home Team 1",
            homeTeamLogo: "logo1.png",
            awayTeam: "Away Team 1",
            awayTeamLogo: "logo2.png",
            score: "2 - 1",
          },
          // ...add more fixture objects as needed
        ],
      })
    )
  ),

  // Get game fixture by ID
  rest.get(`${API_BASE_URL}/game/:id`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        message: "Successfully fetched game by ID",
        data: {
          fixtureId: "1",
          status: "ft",
          homeTeam: "Home Team",
          homeTeamLogo: "logo1.png",
          awayTeam: "Away Team",
          awayTeamLogo: "logo2.png",
          score: "2 - 1",
        },
      })
    )
  ),

  // Get game fixtures by date and season
  rest.get(`${API_BASE_URL}/game/:season/:date`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        message: "Successfully fetched games for date",
        data: [
          {
            fixtureId: "1",
            status: "ft",
            homeTeam: "Home Team 1",
            homeTeamLogo: "logo1.png",
            awayTeam: "Away Team 1",
            awayTeamLogo: "logo2.png",
            score: "2 - 1",
          },
          // ...add more fixture objects as needed
        ],
      })
    )
  ),

  // Get team statistics by fixture ID
  rest.get(`${API_BASE_URL}/stats/:fixtureId`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        message: "Successfully fetched team statistics",
        data: [
          {
            name: "Home Team",
            shotsOnGoal: 8,
            shotsOffGoal: 4,
            totalShots: 12,
            blockedShots: 0,
            // ...add more stats properties as needed
          },
          {
            name: "Away Team",
            shotsOnGoal: 6,
            shotsOffGoal: 2,
            totalShots: 8,
            blockedShots: 1,
            // ...add more stats properties as needed
          },
        ],
      })
    )
  ),

  // Get team standings
  rest.get(`${API_BASE_URL}/standings/teams`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        message: "Successfully fetched team standings",
        data: [
            {
                "rank": 1,
                "id": 289,
                "leagueNames": "J1 League",
                "leagueLogo": "https://media-1.api-sports.io/football/leagues/98.png",
                "name": "Vissel Kobe",
                "logo": "https://media-3.api-sports.io/football/teams/289.png",
                "points": 44,
                "goalsDiff": 25,
                "status": "up",
                "played": 21,
                "win": 13,
                "draw": 5,
                "lose": 3,
                "goalsFor": 42,
                "goalsAgainst": 17
              },
        ],
      })
    )
  ),

  // Get top scorers
  rest.get(`${API_BASE_URL}/standings/players`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        message: "Successfully fetched top scorers",
        data: [
          {
            id: "player1",
            name: "Player 1",
            team: "Team 1",
            goals: 15,
            passes: 10,
            games: 20,
            picture: "player1.png",
          },
          // ...add more top scorers data as needed
        ],
      })
    )
  ),

  // Get team goal statistics
  rest.get(`${API_BASE_URL}/:teamId/stats`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        message: "Successfully fetched team goal stats",
        data: [
          {
            for: {
              minute: {
                "1-15": { total: 3, percentage: "20%" },
                "16-30": { total: 5, percentage: "33%" },
                // ...add more minute statistics as needed
              },
            },
            against: {
              minute: {
                "1-15": { total: 2, percentage: "15%" },
                "16-30": { total: 4, percentage: "30%" },
                // ...add more minute statistics as needed
              },
            },
          },
        ],
      })
    )
  ),

  // Get all players for a team
  rest.get(`${API_BASE_URL}/:teamId/players`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        message: "Successfully fetched players",
        data: [
          {
            _id: "player1",
            name: "Player 1",
            team: "Team 1",
            position: "Forward",
            picture: "player1.png",
          },
          // ...add more player data as needed
        ],
      })
    )
  ),

  // Get player details by ID
  rest.get(`${API_BASE_URL}/players/:playerId`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        message: "Successfully fetched player",
        data: {
          _id: "player1",
          name: "Player 1",
          team: "Team 1",
          position: "Forward",
          picture: "player1.png",
        },
      })
    )
  ),

  // Get team standings by team ID
  rest.get(`${API_BASE_URL}/standings/teams/:teamId`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        message: "Successfully fetched team standings",
        data: [
          {
            rank: 1,
            id: "team1",
            name: "Team 1",
            logo: "team1.png",
            points: 30,
            goalsDiff: 15,
            // ...add more standings properties as needed
          },
        ],
      })
    )
  ),

  // Get league information
  rest.get(`${API_BASE_URL}/league`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        id: "league1",
        name: "Football League",
        logo: "league.png",
      })
    )
  ),

  // ...add more mock handlers as needed for other endpoints
];
