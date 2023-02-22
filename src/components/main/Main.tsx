import {ReactElement, useState} from "react";
import Container from "@mui/material/Container";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import Box from "@mui/material/Box";
import {List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Link from 'next/link';

export default function Main(): ReactElement {

  const { data: sessionData } = useSession();
  const [title, setTitle] = useState<string>("");

  // getting all projects
  const projects = trpc.project.getProjects.useQuery(sessionData?.user?.id)

  // deleting project
  const deleteProject = trpc.project.deleteProject.useMutation().mutateAsync;

  // create new project
  const createProject = trpc.project.createProject.useMutation().mutateAsync;

  const handleCreate = async (e: any) => {
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
                      <Box sx={{ display: "flex", justifyContent: "space-between" }} key={project.id}>
                        <Link href={`/project/[id]`} as={`/project/${project.id}`}
                              style={{ display: "flex", overflow: "hidden", alignItems: "center", width: "100%" }}
                        >
                          <ListItemButton
                              key={project.id}
                              sx={{ display: "flex", alignItems: "center", gap: 1}}
                          >
                            <ListItemIcon sx={{ minWidth: "fit-content" }}>
                              <AutoAwesomeMosaicIcon />
                            </ListItemIcon>
                            <ListItemText primary={project.title} style={{textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"}} />
                          </ListItemButton>
                        </Link>
                        <ListItemButton
                            sx={{ maxWidth: "fit-content" }}
                        >
                          <ListItemIcon sx={{ minWidth: "fit-content" }} onClick={() => handleDelete(project.id)}>
                            <DeleteIcon />
                          </ListItemIcon>
                        </ListItemButton>
                      </Box>
                  )
                })}
              </List>
            </>
        }
        <Box sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Box sx={{
            backgroundColor: "white",
            padding: 6,
            boxShadow: "0px 0px 25px 1px rgba(66, 68, 90, 1)",
            borderRadius: 2
          }}>
            <h1 className="h1" style={{
              fontFamily: "Roboto,Helvetica,Arial,sans-serif",
              textTransform: "uppercase",
              textAlign: "center",
              margin: 16
            }}>
              Create project
            </h1>
            <form onSubmit={handleCreate} style={{ maxWidth: "400px" }}>
              <FormControl sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}>
                <TextField
                    type="text"
                    variant="standard"
                    value={title}
                    onChange={(e: any) => setTitle(e.target.value)}
                    label="Title:"
                    sx={{ minWidth: "350px" }}
                    inputProps={{ maxLength: 20}}
                    required={true}
                />
                <Button variant="contained" type="submit" sx={{ width: "fit-content", alignSelf: "center" }}>
                  Create
                </Button>
              </FormControl>
            </form>
          </Box>
        </Box>
      </Container>
  )
}