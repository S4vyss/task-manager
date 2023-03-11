import { useRouter} from "next/router";
import ResponsiveAppBar from "../../components/header/AppBar";
import {useSession} from "next-auth/react";
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import {ChangeEvent, useState} from "react";
import {Button, Dialog, DialogTitle, ListItemAvatar, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import {trpc} from "../../utils/trpc";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "./dynamic.module.css";
import ProjectTable from "../../components/main/ProjectTable";

const drawerWidth = 240;

interface User {
  name: string | null;
  image: string | null;
  email: string | null;
}

export default function ProjectPage() {
  const router = useRouter();
  const { data: sessionData, status } = useSession();
  const id = router.query.id as string;

  const [addMemberPopup, setAddMemberPopup] = useState<boolean>(false);
  const [dropdown, setDropDown] = useState(null);
  const [userEmail, setUserEmail] = useState<string>("");

  // finding member from addMember input
  const findMember = trpc.project.findMember.useQuery({ email: userEmail });

    // Displaying members into member dropdown
  const displayMembers = trpc.project.findMembersInProject.useQuery( { projectId: id }, { enabled: !!id });

    // getting the owner of project
  const getOwnerOfProject = trpc.project.getOwnerOfProject.useQuery({ projectId: id }, { enabled: !!id });

  // add member
  const addMember = trpc.project.addMember.useMutation().mutateAsync;

  //delete member
  const deleteMember = trpc.project.deleteMember.useMutation().mutateAsync;

  const handleDeleteMember = async (email: string) => {
    await deleteMember({ email: email, projectId: id});
    await displayMembers.refetch();
  }

  const handleAddMember = async (email: string) => {
    try {
      if (email === sessionData?.user?.email) {
        alert("You cannot add the owner of this project as member");
      } else {
        await addMember({ email: email, projectId: id});
        await displayMembers.refetch();
        setAddMemberPopup(false);
      }
    } catch (e) {
      alert("You cannot perform that action, because the user is already a member of this project.");
      console.log(e);
    }
  }

  if (status === "unauthenticated") {
    router.replace("/");
  }

  return (
    <>
      <section className={styles.route}>
        <ResponsiveAppBar />
        <section style={{
          zIndex: -1,
          position: "absolute",
        }}>
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
              <List>
                { getOwnerOfProject?.data?.owner.id === sessionData?.user?.id &&
                  ['Add member +'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                      <ListItemButton onClick={() => setAddMemberPopup(true)}>
                        <ListItemIcon>
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={(event: any) => setDropDown(event.currentTarget)}
                    aria-controls={Boolean(dropdown) ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={Boolean(dropdown) ? "true" : undefined}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Members" />
                  </ListItemButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={dropdown}
                    open={displayMembers.data && displayMembers.data.length > 0 ? Boolean(dropdown) : false}
                    onClose={() => setDropDown(null)}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button'
                    }}
                  >
                    {displayMembers.data &&
                      displayMembers.data.map((member, i) => (
                        <Container key={i++} sx={{ display: "flex", gap: 1, outline: "none" }}>
                          <Box key={i} sx={{ display: "flex", gap: 1.3, padding: 1, outline: "none", borderBottom: "1px solid lightgrey", width: "100%", alignItems: "center"}}>
                            <Avatar src={member.image || ""} />
                            <ListItemText primary={member.email} />
                          </Box>
                          { getOwnerOfProject?.data?.owner.id === sessionData?.user?.id &&
                              <Button
                                  color="error"
                                  onClick={() => handleDeleteMember(member.email as string)}
                              >
                                  <DeleteIcon color="secondary" />
                              </Button>
                          }
                        </Container>
                      ))}
                  </Menu>
                </ListItem>
              </List>
              <Divider />
              <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        </section>
        <Box>
          <Dialog
            open={addMemberPopup}
            fullWidth={true}
          >
            <DialogTitle
              textAlign="center"
            >
              <Typography variant="h4">
                Add Member
              </Typography>
              <Button
                onClick={() => setAddMemberPopup(false)}
                sx={{
                  width: "fit-content",
                  position: "absolute",
                  top: 0,
                  right: 0,
                  margin: 2,
                  background: "crimson",
                  color: "white",
                  "&:hover": {
                    background: "crimson",
                  }
                }}
                variant="contained"
              >
                X
              </Button>
            </DialogTitle>
            <Box sx={{
              padding: 4,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}>
              <TextField
                type="text"
                variant="standard"
                value={userEmail}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setUserEmail(e.target.value)}
                label="Email:"
                sx={{ minWidth: "350px" }}
                required={true}
                autoComplete="off"
              />
              <Box minHeight="100px">
                {
                  userEmail.length > 0 && findMember.data && findMember.data.map((user: User) => {
                    return (
                      <ListItem disableGutters>
                        <ListItemButton onClick={() => handleAddMember(user.email || "")}>
                          <ListItemAvatar>
                            <Avatar src={user.image || "" } />
                          </ListItemAvatar>
                          <ListItemText primary={user.name} />
                        </ListItemButton>
                      </ListItem>
                    )
                  })
                }
              </Box>
            </Box>
          </Dialog>
        </Box>
        <Box className={styles.tables}>
          <ProjectTable />
        </Box>
      </section>
    </>

  )
}