"use client"
import { Background, BackgroundVariant, MiniMap, ReactFlow, useNodesState } from '@xyflow/react';
import { ServiceNode } from '@/components/canvas/service-node';
import { DeploymentTaskStatus } from '@/api/types';
import '@xyflow/react/dist/style.css';
import { useEffect, useLayoutEffect } from 'react';
import { updateServiceFx, clearStore } from '@/app/project/[id]/store';
import { $canvas } from '@/app/project/[id]/store';
import { useUnit } from 'effector-react';
import { ProjectWebSocket } from '@/app/project/[id]/websocket';
import { LogsViewer } from '@/components/canvas/logs-viewer';

export const ProjectCanvas = ({ projectId }: { projectId: string }) => {
    const { services } = useUnit($canvas)
    const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);

    const onNodeDragStop = (_: any, node: any) => {
        updateServiceFx({
            serviceId: node.id,
            data: {
                position_x: node.position.x,
                position_y: node.position.y
            }
        })
    }

    useLayoutEffect(() => {
        const socket = new ProjectWebSocket(projectId)

        return () => {
            socket.close()
            clearStore()
        }
    }, [])

    useEffect(() => {
        setNodes(services.map((service) => ({
            id: service.id,
            type: 'service',
            data: {
                label: service.name,
                status: service.deployment?.taskStatus || DeploymentTaskStatus.UPDATING,
                image: service.deployment?.config?.image,
                id: service.id
            },
            position: { x: service.position_x, y: service.position_y }
        })))
    }, [services])

    return (
        <>
            <LogsViewer />
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={[]}
                onNodeDragStop={onNodeDragStop}
                nodeTypes={{
                    service: ServiceNode
                }}
                proOptions={{
                    hideAttribution: true,
                }}
                snapToGrid
                snapGrid={[20, 20]}
            >
                <MiniMap position="bottom-left" bgColor='oklch(26.9% 0 0)' />
                <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="oklch(43.9% 0 0)" bgColor='oklch(21% 0.006 285.885)' />
            </ReactFlow>
        </>
    )
}