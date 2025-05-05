"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HardDrive, Trash2, Plus, Edit2, Save } from "lucide-react"

// Define the Volume type
export type Volume = {
    id: string
    name: string
    mountPath: string
}

interface VolumesManagerProps {
    volumes: Volume[]
    onVolumesChange: (volumes: Volume[]) => void
}

export function VolumesManager({ volumes, onVolumesChange }: VolumesManagerProps) {
    const [newVolume, setNewVolume] = useState({ name: "", mountPath: "" })
    const [editingVolume, setEditingVolume] = useState<Volume | null>(null)
    const [volumeErrors, setVolumeErrors] = useState({ name: "", mountPath: "" })

    // Validation function
    const validateVolume = (volume: { name: string; mountPath: string }) => {
        const errors = { name: "", mountPath: "" }

        if (!volume.name.trim()) {
            errors.name = "Volume name is required"
        }

        if (!volume.mountPath.trim()) {
            errors.mountPath = "Mount path is required"
        } else if (!volume.mountPath.startsWith("/")) {
            errors.mountPath = "Mount path must start with /"
        }

        return errors
    }

    // Volume handlers
    const handleAddVolume = () => {
        const errors = validateVolume(newVolume)

        if (errors.name || errors.mountPath) {
            setVolumeErrors(errors)
            return
        }

        const updatedVolumes = [
            ...volumes,
            {
                id: crypto.randomUUID(),
                name: newVolume.name,
                mountPath: newVolume.mountPath,
            },
        ]

        onVolumesChange(updatedVolumes)
        setNewVolume({ name: "", mountPath: "" })
        setVolumeErrors({ name: "", mountPath: "" })
    }

    const handleEditVolume = (volume: Volume) => {
        setEditingVolume(volume)
        setNewVolume({ name: volume.name, mountPath: volume.mountPath })
    }

    const handleUpdateVolume = () => {
        const errors = validateVolume(newVolume)

        if (errors.name || errors.mountPath) {
            setVolumeErrors(errors)
            return
        }

        const updatedVolumes = volumes.map((vol) =>
            vol.id === editingVolume?.id ? { ...vol, name: newVolume.name, mountPath: newVolume.mountPath } : vol,
        )

        onVolumesChange(updatedVolumes)
        setNewVolume({ name: "", mountPath: "" })
        setEditingVolume(null)
        setVolumeErrors({ name: "", mountPath: "" })
    }

    const handleDeleteVolume = (id: string) => {
        const updatedVolumes = volumes.filter((vol) => vol.id !== id)
        onVolumesChange(updatedVolumes)

        if (editingVolume?.id === id) {
            setEditingVolume(null)
            setNewVolume({ name: "", mountPath: "" })
        }
    }

    const handleCancelEdit = () => {
        setEditingVolume(null)
        setNewVolume({ name: "", mountPath: "" })
        setVolumeErrors({ name: "", mountPath: "" })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl flex items-center">
                    <HardDrive className="mr-2 h-5 w-5 text-neutral-400" />
                    Volumes
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Existing Volumes */}
                    {volumes.length > 0 ? (
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-neutral-400">Existing Volumes</h3>
                            <div className="space-y-3">
                                {volumes.map((volume) => (
                                    <div
                                        key={volume.id}
                                        className="flex items-center justify-between p-3 rounded-md border border-neutral-800 bg-neutral-900/50"
                                    >
                                        <div className="space-y-1">
                                            <div className="font-medium">{volume.name}</div>
                                            <div className="text-sm text-neutral-400">
                                                <code className="text-xs bg-neutral-800 px-1 py-0.5 rounded">{volume.mountPath}</code>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleEditVolume(volume)}
                                                className="h-8 w-8 p-0"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                                <span className="sr-only">Edit</span>
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDeleteVolume(volume.id)}
                                                className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-100/10"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">Delete</span>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="h-[120px] bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 rounded-lg border border-neutral-800/50 flex flex-col items-center justify-center p-6 text-center">
                            <div className="bg-neutral-800/50 p-3 rounded-full mb-3">
                                <HardDrive size={24} strokeWidth={1.5} className="text-neutral-300" />
                            </div>
                            <h3 className="text-sm font-medium mb-1">No volumes configured</h3>
                            <p className="text-xs text-neutral-400 mb-0">Add volumes to persist data between deployments</p>
                        </div>
                    )}

                    {/* Add/Edit Volume Form */}
                    <div className="space-y-4 pt-4 border-t border-neutral-800">
                        <h3 className="text-sm font-medium text-neutral-400">{editingVolume ? "Edit Volume" : "Add New Volume"}</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="volume-name" className="text-sm">
                                    Volume Name
                                </Label>
                                <Input
                                    id="volume-name"
                                    value={newVolume.name}
                                    onChange={(e) => setNewVolume({ ...newVolume, name: e.target.value })}
                                    placeholder="e.g., data-volume"
                                    className="transition-all focus-visible:ring-offset-2"
                                />
                                {volumeErrors.name && <p className="text-xs text-red-500 mt-1">{volumeErrors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="mount-path" className="text-sm">
                                    Mount Path
                                </Label>
                                <Input
                                    id="mount-path"
                                    value={newVolume.mountPath}
                                    onChange={(e) => setNewVolume({ ...newVolume, mountPath: e.target.value })}
                                    placeholder="/app/data"
                                    className="transition-all focus-visible:ring-offset-2"
                                />
                                {volumeErrors.mountPath && <p className="text-xs text-red-500 mt-1">{volumeErrors.mountPath}</p>}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {editingVolume ? (
                                <>
                                    <Button type="button" variant="outline" onClick={handleUpdateVolume} size="sm" className="gap-1">
                                        <Save className="h-3.5 w-3.5" />
                                        Update Volume
                                    </Button>
                                    <Button type="button" variant="ghost" onClick={handleCancelEdit} size="sm">
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <Button type="button" variant="outline" onClick={handleAddVolume} size="sm" className="gap-1">
                                    <Plus className="h-3.5 w-3.5" />
                                    Add Volume
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
