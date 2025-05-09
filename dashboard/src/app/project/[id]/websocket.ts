"use client"

import { setCanvasData, updateServiceStatus } from "./store"

enum ServiceWebsocketEvents {
    STATUS_UPDATED = "status_updated",
}

export class ProjectWebSocket {
    private socket!: WebSocket

    constructor(private projectId: string) {
        this.connect()
    }

    private connect() {
        this.socket = new WebSocket(`ws://localhost:8080/api/services/${this.projectId}`)

        this.socket.onopen = () => {
            console.log("WebSocket opened")
        }

        this.socket.onclose = (event) => {
            console.log("WebSocket closed", event)
            // Only reconnect if the close wasn't triggered by our close() method
            if (!event.wasClean) {
                setTimeout(() => this.connect(), 1000)
            }
        }

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data)

            if (data.type === 'ping') {
                this.socket.send(JSON.stringify({ type: 'pong' }))
            }

            if (data.services) {
                setCanvasData({
                    services: data.services,
                    project_id: this.projectId
                })
            }

            if (data.event_type) {
                switch (data.event_type) {
                    // case ServiceWebsocketEvents.SERVICE_CREATED:
                    //     addService(data.payload)
                    //     break
                    case ServiceWebsocketEvents.STATUS_UPDATED:
                        updateServiceStatus({
                            serviceId: data.payload.serviceId,
                            status: data.payload.status
                        })
                }
            }
        }
    }

    close() {
        this.socket.close()
    }
}