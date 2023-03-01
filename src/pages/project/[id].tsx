import { useRouter} from "next/router";
import ResponsiveAppBar from "../../components/header/AppBar";
import {useSession} from "next-auth/react";
import {Backdrop, CircularProgress} from "@mui/material";
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
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

const drawerWidth = 240;

export default function ProjectPage() {
  const router = useRouter();
  const { data: sessionData, status } = useSession();
  const { id } = router.query;

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
                        {['Add member'].map((text, index) => (
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

        </Box>
    </>
  )
}