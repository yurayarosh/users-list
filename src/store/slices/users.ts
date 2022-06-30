import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser, SingleUserState, UsersState } from '../types/users'
import {
  deleteSingleUser,
  fetchSingleUser,
  fetchUsers,
  postSingleUser,
  putSingleUser,
} from './usersActions'

const usersInitialState: UsersState = {
  isLoading: false,
  users: null,
}

const singleUserInitialState: SingleUserState = {
  isLoading: false,
  user: null,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState: usersInitialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending.type]: state => {
      state.isLoading = true
    },
    [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
      state.isLoading = false
      state.users = action.payload
    },
    [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const singelUserSlice = createSlice({
  name: 'singleUser',
  initialState: singleUserInitialState,
  reducers: {},
  extraReducers: {
    [fetchSingleUser.pending.type]: state => {
      state.isLoading = true
    },
    [fetchSingleUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false
      state.user = action.payload
    },
    [fetchSingleUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.fetchError = action.payload
    },

    [postSingleUser.pending.type]: state => {
      state.isLoading = true
    },
    [postSingleUser.fulfilled.type]: state => {
      state.isLoading = false
    },
    [postSingleUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.postError = action.payload
    },

    [putSingleUser.pending.type]: state => {
      state.isLoading = true
    },
    [putSingleUser.fulfilled.type]: state => {
      state.isLoading = false
    },
    [putSingleUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.putError = action.payload
    },

    [deleteSingleUser.pending.type]: state => {
      state.isLoading = true
    },
    [deleteSingleUser.fulfilled.type]: state => {
      state.isLoading = false
    },
    [deleteSingleUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.deleteError = action.payload
    },
  },
})

export default {
  usersReducer: usersSlice.reducer,
  singelUserReducer: singelUserSlice.reducer,
}
