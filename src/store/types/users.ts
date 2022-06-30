export type Id = number

export interface IUserData {
  biography: string
  birth_date: string
  first_name: string
  gender: string
  is_active: boolean
  job: string
  last_name: string
}

export interface IUser extends IUserData {
  id: Id
}

export interface UsersState {
  isLoading: boolean
  users: IUser[] | null
  error?: string
}

export interface SingleUserState {
  isLoading: boolean
  user: IUser | null
  fetchError?: string
  postError?: string | IUserData
  deleteError?: string
  putError?: string | IUserData
}
