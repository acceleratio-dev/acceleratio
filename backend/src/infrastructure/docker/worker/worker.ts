import { DeploymentTaskStatus } from "@/domain/entities/deployment";

declare var self: Worker;

const acceptedEvents = ['die', 'start', 'create']

const dockerWorker = async () => {
    try {
        const response = await fetch('http://localhost/v1.41/events?filters=' + encodeURIComponent(JSON.stringify({
            type: ['container']
        })), {
            unix: '/var/run/docker.sock',
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const reader = response.body?.getReader()
        if (!reader) {
            throw new Error('No reader available')
        }

        while (true) {
            const { done, value } = await reader.read()
            if (done) break;

            // Convert the chunk to text
            const chunk = new TextDecoder().decode(value)
            // Split by newlines since Docker sends events as newline-delimited JSON
            const events = chunk.split('\n').filter(Boolean)

            for (const event of events) {
                try {
                    const eventData = JSON.parse(event)
                    const deploymentId = eventData.Actor?.Attributes["acceleratio.deployment.id"]
                    const projectId = eventData.Actor?.Attributes["acceleratio.project.id"]
                    const status = eventData.status
                    console.log(deploymentId, status)
                    if (deploymentId && status && acceptedEvents.includes(status)) {
                        postMessage({
                            deploymentId,
                            status,
                            projectId,
                        })
                    }
                } catch (e) {
                    console.error('Docker worker error parsing event:', e)
                    throw e
                }
            }
        }
    } catch (error) {
        console.error('Docker worker error:', error)
        throw error
    }
}

const main = async () => {
    while (true) {
        try {
            await dockerWorker()
        } catch (error) {
            console.error('Main loop error:', error)
            // Add a small delay before retrying to prevent rapid reconnection attempts
            await new Promise(resolve => setTimeout(resolve, 1000))
        }
    }
}

main()