// msw-favourite-handlers.js
import { rest } from 'msw';

const API_BASE_URL = 'http://localhost:3001/api/v1/teams';

export const favouriteHandlers = [
  // Get all favorite teams of a specific user
  rest.get(`${API_BASE_URL}/favourites`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
            {
                "_id": "64ca17e5959b5a1b139a84d1",
                "user": "64c8dbb1fdd72f40623293ab",
                "teamId": "123",
                "teamName": "abc",
                "logoUrl": "asd.jpg",
                "__v": 0
              }
        ],
      })
    );
  }),

  



  // Add a new favorite team for a specific user
  rest.post(`${API_BASE_URL}/favourites/add`, (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        data: [
          // Newly added favorite team object
          // Replace with your actual data or mock data
        ],
      })
    );
  }),

  // Remove a favorite team for a specific user by teamId
  rest.delete(`${API_BASE_URL}/unfavourite/:id`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Favorite team removed successfully',
      })
    );
  }),
];
