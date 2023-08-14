// msw-favourite-handlers.js
import { rest } from 'msw';

const API_BASE_URL = 'http://localhost:3001/api/v1/players';

export const favouritePlayerHandlers = [
  // Get all favorite teams of a specific user
  rest.get(`${API_BASE_URL}/favourites/player`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
            {
                "_id": "64ca17e5959b5a1b139a84d1",
                "user": "64c8dbb1fdd72f40623293ab",
                "playerId": "123",
                "playerName": "abc",
                "photoUrl": "asd.jpg",
                "__v": 0
              }
        ],
      })
    );
  }),

  



  

  // Remove a favorite team for a specific user by teamId
  rest.delete(`${API_BASE_URL}/unfavourite/player/:id`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Favorite player removed successfully',
      })
    );
  }),
];
