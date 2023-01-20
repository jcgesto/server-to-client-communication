import { Application } from "express"
import { Server } from "socket.io"

export default function socketIOServer(app: Application, server: any): void {
  const io = new Server(server, {
    cors: {
      origin: '*',
    }
  })
  app.set('socketIOServer', io)

  io.on("connection", (_) => {
    console.log('client connected')
  })
}