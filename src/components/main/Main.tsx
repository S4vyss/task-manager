import {ReactElement, useEffect, useState} from "react";
import Container from "@mui/material/Container";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import Box from "@mui/material/Box";
import ListComponent from "./List";
import {List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Main(): ReactElement {

  const { data: sessionData } = useSession();

  // getting all projects
  const projects = trpc.project.getProjects.useQuery(sessionData?.user?.id)

  // deleting project
  const deleteProject = trpc.project.deleteProject.useMutation().mutateAsync;

  // create new project
  const createProject = trpc.project.createProject.useMutation().mutateAsync;

  return (
    <Container sx={{ marginLeft: 0}}>
      {
        projects.data &&
          <>
              <List component="nav">
                {projects.data.map(project => {
                  return (
                    <Box sx={{ display: "flex" }} key={project.id}>
                      <ListItemButton
                        key={project.id}
                        sx={{ maxWidth: "fit-content", display: "flex", gap: 1 }}
                      >
                        <ListItemIcon sx={{ minWidth: "fit-content" }}>
                          <AutoAwesomeMosaicIcon />
                        </ListItemIcon>
                        <ListItemText primary={project.title} />
                      </ListItemButton>
                      <ListItemButton
                        sx={{ maxWidth: "fit-content" }}

                      >
                        <ListItemIcon sx={{ minWidth: "fit-content" }} onClick={ async () => {
                          await deleteProject(project.id);
                          projects.refetch();
                        }
                        }>
                          <DeleteIcon />
                        </ListItemIcon>
                      </ListItemButton>
                    </Box>
                  )
                })}
              </List>
          </>
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