import { FC, useEffect, useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../components/Loader/Loader'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { RouteNames } from '../../router'
import { deleteSingleUser, fetchSingleUser, fetchUsers } from '../../store/slices/usersActions'

const User: FC = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user, isLoading, fetchError } = useAppSelector(state => state.singelUser)
  const [removeError, setRemoveError] = useState<string>('')

  const onRemoveButtonClick = async () => {
    if (!id) return

    const res = await dispatch(deleteSingleUser(id))

    if (res.meta.requestStatus === 'rejected' && typeof res.payload === 'string') {
      setRemoveError(res.payload)
    } else {
      dispatch(fetchUsers())
      navigate(RouteNames.HOME)
    }
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleUser(id))
    }
  }, [])

  if (isLoading) return <Loader />

  if (user) {
    return (
      <Container className="p-3">
        <Card className="p-3">
          <Card.Body>
            <Card.Text as="div">
              <dl className="row">
                <dt className="col-sm-3">First name:</dt>
                <dd className="col-sm-9">{user.first_name}</dd>

                <dt className="col-sm-3">Last name:</dt>
                <dd className="col-sm-9">{user.last_name}</dd>

                <dt className="col-sm-3">Birth date:</dt>
                <dd className="col-sm-9">{user.birth_date}</dd>

                <dt className="col-sm-3">Gender:</dt>
                <dd className="col-sm-9">{user.gender}</dd>

                <dt className="col-sm-3">Job:</dt>
                <dd className="col-sm-9">{user.job}</dd>

                <dt className="col-sm-3">Biography:</dt>
                <dd className="col-sm-9">{user.biography}</dd>

                <dt className="col-sm-3">Is active:</dt>
                <dd className="col-sm-9">{`${user.is_active}`}</dd>
              </dl>
            </Card.Text>

            <LinkContainer to={`${RouteNames.USER_RECORD}?user=${user.id}`}>
              <Button className="me-2">Edit</Button>
            </LinkContainer>

            <Button variant="danger" type="button" onClick={onRemoveButtonClick}>
              Remove
            </Button>

            {removeError && <p className="text-danger">[ERROR]: {removeError}</p>}
          </Card.Body>
        </Card>
      </Container>
    )
  }

  return (
    <Container className="p-3">
      <p className="text-danger">{fetchError}</p>
    </Container>
  )
}

export default User
