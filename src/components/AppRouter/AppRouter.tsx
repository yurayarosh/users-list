import { Navigate, Route, Routes } from 'react-router-dom'
import { routes, RouteNames } from '../../router'

const AppRouter = () => {
  return (
    <Routes>
      {routes.map(({ path, Component }) => (
        <Route path={path} element={<Component />} key={path} />
      ))}
      <Route path="*" element={<Navigate to={RouteNames.HOME} />} />
    </Routes>
  )
}

export default AppRouter
