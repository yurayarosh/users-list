import { ComponentType } from 'react'
import Home from '../pages/Home/Home'
import User from '../pages/User/User'
import UserRecord from '../pages/UserRecord/UserRecord'

export interface IRoute {
  path: string
  Component: ComponentType
}

export enum RouteNames {
  HOME = '/',
  USER = '/user',
  USER_RECORD = '/user-record',
}

export const routes: IRoute[] = [
  {
    path: RouteNames.HOME,
    Component: Home,
  },
  {
    path: RouteNames.USER,
    Component: User,
  },
  {
    path: RouteNames.USER_RECORD,
    Component: UserRecord,
  },
  {
    path: `${RouteNames.USER}/:id`,
    Component: User,
  },
]
