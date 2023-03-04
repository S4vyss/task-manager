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
  const [userEmail, setUserEmail] = useState<string>("");

  const findMember = trpc.project.findMember.useQuery({ email: userEmail });

  // add member
  const addMember = trpc.project.addMember.useMutation().mutateAsync;

  const handleAddMember = async (email: string) => {
    try {
      await addMember({ email: email, projectId: id});
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
      <ResponsiveAppBar  />
      <section style={{
        zIndex: -100,
        position: "absolute"
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
              {['Add member +'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={() => setAddMemberPopup(true)}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
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
    </>
  )
}

//TODO: display members