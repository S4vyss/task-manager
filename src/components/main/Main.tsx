import {ReactElement, useEffect, useState} from "react";
import Container from "@mui/material/Container";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import Box from "@mui/material/Box";

export default function Main(): ReactElement {

  const { data: sessionData } = useSession();

  // getting all projects
  const projects = trpc.project.getProjects.useQuery(sessionData?.user?.id)

  // deleting project
  const deleteProject = trpc.project.deleteProject.useMutation().mutateAsync;

  // create new project
  const createProject = trpc.project.createProject.useMutation().mutateAsync;

  return (
    <Container>
      {
        projects.data &&
        <ul>
          {projects.data.map(project => {
            return (
              <Box sx={{ display: "flex", gap: 4 }} key={project.id}>
                <li key={project.id}>
                  {project.title}
                </li>
                <button onClick={async () => {
                    await deleteProject(project.id);
                    projects.refetch();
                  }
                }>X</button>
              </Box>
            )
          })}
        </ul>
      }
      <h1>
        Create project dev
      </h1>
      <button
        onClick={async () => {
          await createProject({ title: "siema", userId: sessionData?.user?.id });
          projects.refetch();
        }}
      >
        Create
      </button>
    </Container>
  )
}