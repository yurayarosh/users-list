import { FC, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useAppDispatch } from '../../hooks/store'
import { RouteNames } from '../../router'
import { deleteSingleUser, fetchUsers } from '../../store/slices/usersActions'
import { IUser } from '../../store/types/users'

interface UserCardProps {
  user: IUser
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  const dispatch = useAppDispatch()
  const [removeError, setRemoveError] = useState<string>('')

  const onRemoveButtonClick = async () => {
    const res = await dispatch(deleteSingleUser(user.id.toString()))

    if (res.meta.requestStatus === 'rejected' && typeof res.payload === 'string') {
      setRemoveError(res.payload)
    } else {
      dispatch(fetchUsers())
    }
  }

  return (
    <Card>
      <Card.Body>
        <LinkContainer to={`${RouteNames.USER}/${user.id}`}>
          <Card.Link className="card-title h5 d-inline-block">
            {user.first_name} {user.last_name}
          </Card.Link>
        </LinkContainer>

        <Card.Subtitle className="mb-2 text-muted">
          {user.birth_date}, {user.gender}
        </Card.Subtitle>

        <Button variant="danger" onClick={onRemoveButtonClick} type="button">
          Remove
        </Button>

        {removeError && <p className="text-danger">[ERROR]: {removeError}</p>}
      </Card.Body>
    </Card>
  )
}

export default UserCard
