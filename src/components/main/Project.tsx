import {ReactElement} from "react";
import Link from "next/link";
import {ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";

interface Props {
  id: string;
  title: string;
  handleDelete: (id: string) => void;
}

export default function Project(props: Props): ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "65%",
        "@media (max-width: 600px)": {
          maxWidth: "100%",
        }
    }}
      key={props.id}>
      <Link href={`/project/[id]`} as={`/project/${props.id}`}
            style={{ display: "flex", overflow: "hidden", alignItems: "center", width: "100%" }}
      >
        <ListItemButton
          key={props.id}
          sx={{ display: "flex", alignItems: "center", gap: 1}}
        >
          <ListItemIcon sx={{ minWidth: "fit-content" }}>
            <AutoAwesomeMosaicIcon />
          </ListItemIcon>
          <ListItemText primary={props.title} style={{textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"}} />
        </ListItemButton>
      </Link>
      <ListItemButton
        sx={{ maxWidth: "fit-content" }}
      >
        <ListItemIcon sx={{ minWidth: "fit-content" }} onClick={() => props.handleDelete(props.id)}>
          <DeleteIcon />
        </ListItemIcon>
      </ListItemButton>
    </Box>
  )
}