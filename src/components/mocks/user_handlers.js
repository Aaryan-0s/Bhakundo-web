// msw-handlers.js
import { rest } from "msw";

const API_BASE_URL = "http://localhost:3001/api/v1";

export const handlers = [
  // User registration
  rest.post(`${API_BASE_URL}/auth/signup`, (req, res, ctx) =>
    res(
      ctx.status(201),
      ctx.json({ status: "success", message: "user created successfully" })
    )
  ),

  // User login
  rest.post(`${API_BASE_URL}/auth/login`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({ status: "success", token: "your_jwt_token_here" })
    )
  ),

  // Update user profile
  rest.put(`${API_BASE_URL}/user/profile/update`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({ status: "success", message: "Profile updated successfully" })
    )
  ),

  // Upload user image
  rest.post(`${API_BASE_URL}/user/uploadImage`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({ success: true, data: "uploaded_image_filename_here" })
    )
  ),

  // Get user info
  rest.get(`${API_BASE_URL}/auth/info/get`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        "data": [
          {
            "_id": "64c8bf3c52c5fcb7df4c2ff6",
            "fname": "abc",
            "lname": "abc",
            "email": "abc",
            "username": "abc",
            "image": ""
          }
        ]
      })
    )
  ),

  // Delete user account
  rest.delete(`${API_BASE_URL}/user/delete`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ message: "User deleted successfully" }))
  ),
];
