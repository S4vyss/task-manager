import {ReactElement} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import * as React from "react";
import {List, ListItemButton} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import GitHubIcon from '@mui/icons-material/GitHub';
import { signIn } from "next-auth/react";

export default function Footer(): ReactElement {
  return (
    <Box
      sx={{
        width: "100%",
        height: "20vh",
        background: "#172B4D",
        position: "absolute",
        bottom: 0,
        color: "white",
        display: "flex",
        flexDirection: "column"
    }}>
      <Box sx={{
        borderBottom: "1px grey solid",
        width: "100%",
        height: "70%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <List sx={{ display: "flex"}}>
          <ListItem sx={{ minWidth: "180px"}}>
            <Typography sx={{ display: "flex", alignItems: "center", gap: 1}}>
              <AutoAwesomeMosaicIcon fontSize="large" />
              Task Manager
            </Typography>
          </ListItem>
          <ListItem>
            <ListItemButton href="https://github.com/S4vyss" target="_blank">
              <GitHubIcon sx={{ background: "transparent"}} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
        <List sx={{ display: "flex", gap: 2}}>
          <ListItem>
            <ListItemButton sx={{ "&:hover": { textDecoration: "underline" }, fontWeight: "bold" }} onClick={() => signIn()}>
              Login
            </ListItemButton>
          </ListItem>
          <ListItem>
            <Typography minWidth="200px">
              © Copyright S4vyss
            </Typography>
          </ListItem>
        </List>
      </Box>
    </Box>
  )
}