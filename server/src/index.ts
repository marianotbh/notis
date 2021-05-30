import {Server, Socket} from 'socket.io'

import {createServer} from 'http'
import express from 'express'
import cors from 'cors'

const app = express()
const server = createServer(app)

const corsOrigins = ['http://localhost:3000']

app.use(cors({origin: corsOrigins}))
const io = new Server(server, {cors: {origin: corsOrigins}})

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

const categories: Category[] = [
  {id: 'movements', description: 'Movimientos'},
  {id: 'instructions', description: 'Instrucciones'},
]

const users: Record<string, Settings> = {}

function createUser(socket: Socket) {
  const settings = {categories: ['movements', 'instructions']}
  users[socket.id] = settings

  settings.categories.forEach(category => {
    socket.join(category)
  })

  return settings
}

app.use('/categories', (req, res, next) => {
  res.status(200).json(categories)
})

app.use('/settings/:id', (req, res, next) => {
  const settings = users[req.params.id]

  if (typeof settings === 'undefined') {
    return res.status(404).json({message: 'usuario no encontrado'})
  }

  res.status(200).json(settings)
})

io.on('connection', socket => {
  createUser(socket)

  socket.on('notification', (payload: Notification) => {
    socket
      .to(payload.category)
      .emit('new-notification', `${payload.category}: ${payload.message}`)
  })

  socket.on('subscribe', (payload: string, cb) => {
    const settings = users[socket.id]

    if (settings.categories.includes(payload)) return

    settings.categories.push(payload)

    socket.join(payload)

    cb(`subscribed to ${payload}`)
  })

  socket.on('unsubscribe', (payload: string, cb) => {
    const settings = users[socket.id]

    const index = settings.categories.findIndex(x => x === payload)

    if (index !== -1) {
      settings.categories.splice(index)
    }

    socket.leave(payload)

    cb(`unsubscribed from ${payload}`)
  })

  socket.on('disconnect', () => {
    delete users[socket.id]
  })
})

server.listen(8080, () => {
  console.log('server listening on port 8080')
})
