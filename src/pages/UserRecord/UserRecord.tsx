import { FC, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import RecordForm from '../../components/RecordForm/RecordForm'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { fetchSingleUser } from '../../store/slices/usersActions'

const UserRecord: FC = () => {
  const [searchParams] = useSearchParams()
  const userId = searchParams.get('user')

  const dispatch = useAppDispatch()
  const { user, isLoading } = useAppSelector(state => state.singelUser)

  useEffect(() => {
    if (userId) {
      dispatch(fetchSingleUser(userId))
    }
  }, [])

  if (!userId) {
    return (
      <Container className="p-3">
        <RecordForm />
      </Container>
    )
  }

  return (
    <Container className="p-3">{isLoading ? <Loader /> : <RecordForm user={user} />}</Container>
  )
}

export default UserRecord
