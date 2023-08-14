// src/mocks/server.js
import { setupServer } from 'msw/node'

import { favouritePlayerHandlers } from './favouritePlayerhandler'
import { favouriteHandlers } from './favourite_handler'
import { Footballhandlers } from './football_handlers'
import { handlers } from './user_handlers'

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers,...Footballhandlers,...favouriteHandlers,...favouritePlayerHandlers)