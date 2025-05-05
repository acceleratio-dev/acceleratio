"use client"
import { useLayoutEffect } from "react";
import Link from "next/link";
import { useUnit } from "effector-react";
import { Pencil, Trash } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { $projects, clearProjects, deleteProjectFx, fetchProjectsFx } from "./store";
import { CreateProjectDialog } from "./create-project-dialog";

export default function Page() {
  const projects = useUnit($projects)

  useLayoutEffect(() => {
    fetchProjectsFx()

    return () => {
      clearProjects()
    }
  }, [])

  const handleDeleteProject = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault()
    e.stopPropagation()

    deleteProjectFx(id)
  }

  return (
    <main className="mx-8 my-4">
      <PageHeader title="Projects list" description="Here you can see all your projects.">
        <CreateProjectDialog />
      </PageHeader>

      <div className="flex gap-4 flex-wrap mt-4">
        {projects.map((project) => (
          <Link href={`/project/${project.id}`} key={project.id} className="p-4 border rounded-md bg-neutral-800 w-[320px]">
            <div className="flex justify-between">
              <div>
                <div className="font-medium">
                  {project.name}
                </div>
                <div className="text-muted-foreground text-sm">
                  0 services
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Pencil />
                </Button>
                <Button variant="destructive" size="icon" onClick={(e) => handleDeleteProject(e, project.id)}>
                  <Trash />
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
