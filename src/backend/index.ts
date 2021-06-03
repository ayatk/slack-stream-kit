import { SocketModeClient } from "@slack/socket-mode"

const appToken = "token"

const socketModeClient = new SocketModeClient({ appToken })

socketModeClient.on("message", ({ event, ack }) => {
  ack()
  console.log(event)
})
;(async () => {
  await socketModeClient.start()
})()
