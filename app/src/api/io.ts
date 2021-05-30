import toast from 'react-hot-toast'
import {io} from 'socket.io-client'

export type Category = {
  id: string
  description: string
}

export type Settings = {
  categories: Category['id'][]
}

export type Notification = {
  category: string
  message: string
}

const BASE_URL = 'http://localhost:8080'

export const socket = io(BASE_URL)

socket.on('connect', () => {
  toast.success(`connected with id: ${socket.id}`)
})

socket.on('new-notification', (message: string) => {
  toast(message)
})

export function notify(payload: Notification) {
  socket.emit('notification', payload)
}

export function toggleCategory(category: string, enabled: boolean) {
  return new Promise(resolve => {
    if (enabled) {
      socket.emit('subscribe', category, resolve)
    } else {
      socket.emit('unsubscribe', category, resolve)
    }
  })
}

export function getCategories(): Promise<Category[]> {
  return fetch(`${BASE_URL}/categories`).then(handle)
}

export function getSettings(): Promise<Settings> {
  return fetch(`${BASE_URL}/settings/${socket.id}`).then(handle)
}

async function handle(res: Response) {
  const body = await res.json()

  if (!res.ok && typeof body.message === 'string') {
    throw new Error(body.message)
  }

  return body
}
