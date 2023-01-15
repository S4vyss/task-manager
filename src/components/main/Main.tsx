import {ReactElement, useEffect, useState} from "react";
import Container from "@mui/material/Container";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";

export default function Main(): ReactElement {

  const { data: sessionData } = useSession();

  const projects = trpc.project.getProjects.useQuery(sessionData?.user?.id)

  return (
    <Container>
      {
        projects.data &&
        <ul>
          {projects.data.map(project => {
            return (
              <li key={project.id}>
                {project.title}
              </li>
            )
          })}
        </ul>
      }
    </Container>
  )
}