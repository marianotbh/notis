import {useForm} from 'react-hook-form'
import styled from 'styled-components'
import {Category, Notification} from '../api/io'

export type NotificationFormProps = {
  categories: Category[]
  onSubmit(formData: Notification): void
}

export default function NotificationForm({
  categories,
  onSubmit,
}: NotificationFormProps) {
  const {handleSubmit, register} = useForm<Notification>()

  return (
    <Wrapper>
      <h1>send a notification</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            category
            <select {...register('category')}>
              {categories.map(({id, description}) => (
                <option key={id} value={id}>
                  {description}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            message
            <input type="text" {...register('message', {required: true})} />
          </label>
        </div>
        <button type="submit">send</button>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  display: flex;
  flex-flow: column;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;
`
