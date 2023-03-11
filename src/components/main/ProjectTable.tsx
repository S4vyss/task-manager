import {ReactElement, ReactNode, useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function ProjectTable(): ReactElement {

  const [tables, setTables] = useState<ReactNode[]>([]);

  const handleAddTable = () => {
    setTables([...tables, <Card />]);
  }

  return (
    <Box sx={{ display: "flex", gap: 2}}>
      {tables}
      <Button onClick={handleAddTable} sx={{ height: "fit-content"}}>
        Add Table +
      </Button>
    </Box>
  )
}
function Card(): ReactElement {
  const [disabled, setDisabled] = useState({ title: false, card: false });

  return (
    <Box sx={{ background: "lightgrey", width: "fit-content", padding: 2, display: "flex", flexDirection: "column", gap: 1 }}>
      <article>
        <input
          style={{
            padding: "5px",
            width: "100%",
            borderRadius: "4px",
            outline: "none",
            borderWidth: "1px"
          }}
          placeholder="Title:"
          disabled={disabled.title}
        />
      </article>
      <article>
        <TextField
          multiline
          minRows={4}
          sx={{
            backgroundColor: "white",
          }}
          disabled={disabled.card}
        />
      </article>
      <article style={{ display: "flex", gap: "10px"}}>
        <Button variant="contained">
          Dodaj kartę
        </Button>
        <Button>
          X
        </Button>
      </article>
    </Box>
  )
}