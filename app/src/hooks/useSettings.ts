import {useQuery} from 'react-query'
import {getSettings, socket} from '../api/io'

export default function useSettings() {
  return useQuery('settings', getSettings, {
    enabled: typeof socket.id !== 'undefined',
  })
}
