import { FC, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../components/Loader/Loader'
import UsersList from '../../components/UsersList/UsersList'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { RouteNames } from '../../router'
import { fetchUsers } from '../../store/slices/usersActions'

const Home: FC = () => {
  const dispatch = useAppDispatch()
  const { isLoading, users, error } = useAppSelector(state => state.users)

  useEffect(() => {
    if (!users) {
      dispatch(fetchUsers())
    }
  }, [])

  if (isLoading) return <Loader />

  if (users)
    return (
      <Container className="p-3">
        <UsersList users={users} className="mb-3" />

        <LinkContainer to={RouteNames.USER_RECORD}>
          <Button>New user</Button>
        </LinkContainer>
      </Container>
    )

  return <div>{error}</div>
}

export default Home
