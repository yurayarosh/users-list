import { createAsyncThunk } from '@reduxjs/toolkit'
import { IUser, IUserData } from '../types/users'

const API_URL = process.env.REACT_APP_API_URL || ''
const headers = {
  'Content-Type': 'application/json',
}

export const fetchUsers = createAsyncThunk('users/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await fetch(API_URL)
    const users: IUser[] = await response.json()

    return response.ok ? users : thunkAPI.rejectWithValue(response.statusText)
  } catch (e) {
    return thunkAPI.rejectWithValue((e as Error).message)
  }
})

export const fetchSingleUser = createAsyncThunk(
  'singleUser/fetch',
  async (id: string, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/${id}`)
      const user: IUser = await response.json()

      return response.ok ? user : thunkAPI.rejectWithValue(response.statusText)
    } catch (e) {
      return thunkAPI.rejectWithValue((e as Error).message)
    }
  }
)

export const postSingleUser = createAsyncThunk(
  'singleUser/post',
  async (user: IUserData, thunkAPI) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(user),
      })

      const data: IUserData = await response.json()

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (e) {
      return thunkAPI.rejectWithValue((e as Error).message)
    }
  }
)

export const deleteSingleUser = createAsyncThunk(
  'singleUser/delete',
  async (userId: string, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        method: 'DELETE',
        headers,
      })

      if (!response.ok) {
        return thunkAPI.rejectWithValue(response.statusText)
      }
    } catch (e) {
      return thunkAPI.rejectWithValue((e as Error).message)
    }
  }
)
export const putSingleUser = createAsyncThunk(
  'singleUser/put',
  async ({ userId, user }: { userId: string; user: IUserData }, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(user),
      })

      const data: IUserData = await response.json()

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (e) {
      return thunkAPI.rejectWithValue((e as Error).message)
    }
  }
)
