import { ServiceService } from "@/application/services/service-service"
import { Hono, type Context } from "hono"
import type { UpgradeWebSocket } from "hono/ws"
import type { WSContext, WSMessageReceive } from "hono/ws"

interface ConnectionInfo {
    ws: WSContext
    projectId: string
    lastPing: number
}

const activeConnections = new Map<string, Set<ConnectionInfo>>()
const PING_INTERVAL = 30000
const PONG_TIMEOUT = 10000

const cleanupDeadConnections = () => {
    const now = Date.now()
    activeConnections.forEach((connections, projectId) => {
        connections.forEach(conn => {
            if (now - conn.lastPing > PONG_TIMEOUT) {
                connections.delete(conn)
                conn.ws.close()
            }
        })
        if (connections.size === 0) {
            activeConnections.delete(projectId)
        }
    })
}

setInterval(cleanupDeadConnections, 60000)

export const serviceWebsocketBroadcastMessage = (message: string, projectId: string) => {
    const connections = activeConnections.get(projectId)
    if (!connections) return

    connections.forEach(conn => {
        if (conn.ws.readyState === 1) {
            conn.ws.send(message)
        }
    })
}

export const closeAllWebSocketConnections = () => {
    activeConnections.forEach((connections) => {
        connections.forEach(conn => {
            if (conn.ws.readyState === 1) {
                conn.ws.close()
            }
        })
    })
    activeConnections.clear()
}

export const serviceWebsocket = (upgradeWebSocket: UpgradeWebSocket) => {
    const router = new Hono()

    router.get("/:projectId",
        upgradeWebSocket((c) => {
            const projectId = c.req.param("projectId")
            return {
                async onOpen(evt: Event, ws: WSContext) {
                    try {
                        if (!projectId) {
                            ws.close()
                            return
                        }

                        const services = await ServiceService.getProjectServices(projectId)
                        console.log('services', services.length)
                        const connInfo: ConnectionInfo = {
                            ws,
                            projectId,
                            lastPing: Date.now()
                        }

                        if (!activeConnections.has(projectId)) {
                            activeConnections.set(projectId, new Set())
                        }
                        activeConnections.get(projectId)!.add(connInfo)

                        ws.send(JSON.stringify({ services }))

                        const pingInterval = setInterval(() => {
                            if (ws.readyState === 1) {
                                ws.send(JSON.stringify({ type: 'ping' }))
                            } else {
                                clearInterval(pingInterval)
                            }
                        }, PING_INTERVAL)
                    } catch (error) {
                        console.error(error)
                        ws.close()
                    }
                },
                onMessage(evt: MessageEvent<WSMessageReceive>, ws: WSContext) {
                    try {
                        const message = JSON.parse(evt.data.toString())
                        if (message.type === 'pong') {
                            const connections = activeConnections.get(projectId)
                            if (connections) {
                                connections.forEach(conn => {
                                    if (conn.ws === ws) {
                                        conn.lastPing = Date.now()
                                    }
                                })
                            }
                        }
                    } catch (e) {
                        console.error('Error parsing message:', e)
                    }
                },
                onClose(evt: CloseEvent, ws: WSContext) {
                    activeConnections.forEach((connections, projectId) => {
                        connections.forEach(conn => {
                            if (conn.ws === ws) {
                                connections.delete(conn)
                            }
                        })
                        if (connections.size === 0) {
                            activeConnections.delete(projectId)
                        }
                    })
                    console.log('Connection closed')
                },
            }
        })
    )

    return router
}