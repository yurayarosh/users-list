import { FC } from 'react'
import { Button, Form } from 'react-bootstrap'
import { FieldError, SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { fetchSingleUser, postSingleUser, putSingleUser } from '../../store/slices/usersActions'
import { IUser, IUserData } from '../../store/types/users'

interface GetErrorMessageOptions {
  maxLength?: number
}

interface RecordFormProps {
  user?: IUser | null
}

const MAX_LENGTH_SHORT = 256
const MAX_LENGTH_LONG = 1024

const RecordForm: FC<RecordFormProps> = ({ user }) => {
  const dispatch = useAppDispatch()
  const { postError, putError, isLoading } = useAppSelector(state => state.singelUser)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUserData>()

  const onSubmit: SubmitHandler<IUserData> = async data => {
    if (!user) {
      await dispatch(postSingleUser(data))
      reset()
    } else {
      await dispatch(
        putSingleUser({
          userId: user.id.toString(),
          user: data,
        })
      )

      dispatch(fetchSingleUser(user.id.toString()))
    }
  }

  const getErrorMessage = (error: FieldError, options?: GetErrorMessageOptions) => {
    if (error.type === 'maxLength' && options) {
      return `Maximum length is ${options.maxLength}`
    }

    return 'This field is required'
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>First name</Form.Label>
        <Form.Control
          type="text"
          placeholder="First name"
          defaultValue={user?.first_name}
          {...register('first_name', { required: true, maxLength: MAX_LENGTH_SHORT })}
        />
        <Form.Text className="text-danger">
          {errors.first_name && (
            <span>{getErrorMessage(errors.first_name, { maxLength: MAX_LENGTH_SHORT })}</span>
          )}
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Last name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Last name"
          defaultValue={user?.last_name}
          {...register('last_name', { required: true, maxLength: MAX_LENGTH_SHORT })}
        />
        <Form.Text className="text-danger">
          {errors.last_name && (
            <span>{getErrorMessage(errors.last_name, { maxLength: MAX_LENGTH_SHORT })}</span>
          )}
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Birth date</Form.Label>
        <Form.Control
          type="date"
          defaultValue={user?.birth_date}
          placeholder="Birth date"
          {...register('birth_date', { required: true })}
        />
        <Form.Text className="text-danger">
          {errors.birth_date && <span>{getErrorMessage(errors.birth_date)}</span>}
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Gender</Form.Label>
        <Form.Select {...register('gender', { required: true })} defaultValue={user?.gender}>
          <option value="male">male</option>
          <option value="female">female</option>
        </Form.Select>
        <Form.Text className="text-danger">
          {errors.gender && <span>{getErrorMessage(errors.gender)}</span>}
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Job</Form.Label>
        <Form.Control
          type="text"
          placeholder="Job"
          defaultValue={user?.job}
          {...register('job', { required: true, maxLength: MAX_LENGTH_SHORT })}
        />
        <Form.Text className="text-danger">
          {errors.job && (
            <span>{getErrorMessage(errors.job, { maxLength: MAX_LENGTH_SHORT })}</span>
          )}
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Biography</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Biography"
          defaultValue={user?.biography}
          {...register('biography', { required: true, maxLength: MAX_LENGTH_LONG })}
        />
        <Form.Text className="text-danger">
          {errors.biography && (
            <span>{getErrorMessage(errors.biography, { maxLength: MAX_LENGTH_LONG })}</span>
          )}
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          id="checkox-1"
          label="Is active"
          defaultChecked={user?.is_active}
          {...register('is_active')}
        />
      </Form.Group>

      <Form.Group className="mb-3 text-danger">
        {postError 
          ? typeof postError === 'string' 
            ? <span>[ERROR]: {postError}</span>
            : <pre>{JSON.stringify(postError, null, 2)}</pre>
          : ''
        }
        {putError 
          ? typeof putError === 'string' 
            ? <span>[ERROR]: {putError}</span>
            : <pre>{JSON.stringify(putError, null, 2)}</pre>
          : ''
        }
      </Form.Group>

      <Button type="submit" disabled={isLoading}>
        Submit
      </Button>
    </Form>
  )
}

export default RecordForm
