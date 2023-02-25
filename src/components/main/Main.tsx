import {FormEvent, ReactElement, useState} from "react";
import Container from "@mui/material/Container";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import {List} from "@mui/material";
import Project from "./Project";
import ProjectInput from "./ProjectInput";

export default function Main(): ReactElement {

  const { data: sessionData } = useSession();
  const [title, setTitle] = useState<string>("");

  // getting all projects
  const projects = trpc.project.getProjects.useQuery(sessionData?.user?.id)

  // deleting project
  const deleteProject = trpc.project.deleteProject.useMutation().mutateAsync;

  // create new project
  const createProject = trpc.project.createProject.useMutation().mutateAsync;

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createProject({ title: title, userId: sessionData?.user?.id });
    await projects.refetch();
    setTitle("");
  }

  const handleDelete = async (projectId: string) => {
    await deleteProject(projectId);
    await projects.refetch();
  }

  return (
    <Container sx={{ marginLeft: 0, display: "flex", flexWrap: "wrap"}} style={{ maxWidth: "100%", flex: "1 1 auto"}}>
      {
        projects.data &&
          <>
              <List component="nav" sx={{
                flexGrow: 1,
                maxWidth: "25%",
              }}>
                {projects.data.map(project => {
                  return (
                    <Project id={project.id} title={project.title} handleDelete={() => handleDelete(project.id)} />
                  )
                })}
              </List>
          </>
      }
      <ProjectInput title={title} setTitle={setTitle} handleCreate={handleCreate} />
    </Container>
  )
}