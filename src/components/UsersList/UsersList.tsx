import { FC } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import classNames from 'classnames'
import { IUser } from '../../store/types/users'
import UserCard from '../UserCard/UserCard'

interface UsersListProps {
  users: IUser[]
  className?: string | object
}

const UsersList: FC<UsersListProps> = ({ users, className }) => {
  return (
    <ListGroup as="ul" className={classNames('list-group-flush', className)}>
      {users
        // .filter(user => user.is_active)
        .map(user => (
          <ListGroupItem key={user.id} as="li" className="ps-0 pe-0">
            <UserCard user={user} />
          </ListGroupItem>
        ))}
    </ListGroup>
  )
}

export default UsersList
