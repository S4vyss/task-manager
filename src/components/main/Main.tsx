import {FormEvent, ReactElement, useState} from "react";
import Container from "@mui/material/Container";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import {List} from "@mui/material";
import Project from "./Project";
import ProjectInput from "./ProjectInput";
import Button from "@mui/material/Button";

export default function Main(): ReactElement {

  const { data: sessionData } = useSession();
  const [title, setTitle] = useState<string>("");

  // getting all projects
  const projects = trpc.project.getProjects.useQuery(sessionData?.user?.id)

  // deleting project
  const deleteProject = trpc.project.deleteProject.useMutation().mutateAsync;

  // create new project
  const createProject = trpc.project.createProject.useMutation().mutateAsync;

  // add member
  const addMember = trpc.project.addMember.useMutation().mutateAsync;

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createProject({ title: title, userId: sessionData?.user?.id });
    await projects.refetch();
    setTitle("");
  }

  const handleAddMember = async () => {
    try {
      await addMember({ email: "kacperlesniewski4@gmail.com", projectId: "clejz065t000055xxmu5pd005"});
    } catch (e) {
      alert("You cannot perform that action, because the user is already a member of this project.");
      console.log(e);
    }
    await projects.refetch();
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
                maxWidth: "40%",
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
      <Button variant={"contained"} sx={{ height: "fit-content"}} onClick={handleAddMember}>
        Test button
      </Button>
    </Container>
  )
}