import {useQuery} from 'react-query'
import {getCategories} from '../api/io'

export default function useCategories() {
  return useQuery('categories', getCategories)
}
