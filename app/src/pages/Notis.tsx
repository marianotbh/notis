import {useQueryClient} from 'react-query'
import styled from 'styled-components'
import {Notification, notify, toggleCategory} from '../api/io'
import NotificationForm from '../components/NotificationForm'
import Settings from '../components/Settings'
import useCategories from '../hooks/useCategories'

export default function Notis() {
  const {data = [], isLoading} = useCategories()
  const queryClient = useQueryClient()

  const handleSendNotification = (notification: Notification) => {
    notify(notification)
  }

  const handleCategorySubscriptionChange = async (
    categoryId: string,
    enabled: boolean
  ) => {
    const foo = await toggleCategory(categoryId, enabled)
    console.log({foo})
    queryClient.invalidateQueries('settings')
  }

  if (isLoading) return <h2>loading...</h2>

  return (
    <Wrapper>
      <NotificationForm categories={data} onSubmit={handleSendNotification} />
      <Settings categories={data} onChange={handleCategorySubscriptionChange} />
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
