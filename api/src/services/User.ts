import { Server } from "socket.io";

export let userReadyForQuoting = false

let timeout: NodeJS.Timeout | null = null

export const cpfReport = (socketIOServer: Server): void => {
  if (timeout) {
    return
  } 
  timeout = setTimeout(() => {
    userReadyForQuoting = true
    timeout = null
    socketIOServer.emit('userReadyForQuoting', true)
    console.log('userReadyForQuoting')
  }, 6000)
}