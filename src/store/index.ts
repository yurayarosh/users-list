import { configureStore } from '@reduxjs/toolkit'
import users from './slices/users'

export const store = configureStore({
  reducer: {
    users: users.usersReducer,
    singelUser: users.singelUserReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
