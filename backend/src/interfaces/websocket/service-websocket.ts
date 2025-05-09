import { ServiceService } from "@/application/services/service-service"
import { Hono } from "hono"
import type { UpgradeWebSocket } from "hono/ws"
import type { WSContext } from "hono/ws"
import { ServiceWebsocketMessage } from "./types"

interface ConnectionInfo {
    ws: WSContext
    projectId: string
    lastPing: number
}

const activeConnections = new Map<string, Set<ConnectionInfo>>()


export const serviceWebsocketBroadcastMessage = (message: ServiceWebsocketMessage, projectId: string) => {
    const connections = activeConnections.get(projectId)
    if (!connections) return

    connections.forEach(conn => {
        if (conn.ws.readyState === 1) {
            conn.ws.send(JSON.stringify(message))
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
                    } catch (error) {
                        console.error(error)
                        ws.close()
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