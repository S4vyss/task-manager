import {ChangeEvent, FormEvent, ReactElement} from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface Props {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  handleCreate: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function ProjectInput(props: Props): ReactElement {
  return (
    <Box sx={{
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}>
      <Box sx={{
        backgroundColor: "white",
        padding: 6,
        boxShadow: "0px 0px 25px 1px rgba(66, 68, 90, 1)",
        width: "fit-content",
        height: "fit-content",
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
        <form onSubmit={props.handleCreate} style={{ maxWidth: "400px" }}>
          <FormControl sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}>
            <TextField
              type="text"
              variant="standard"
              value={props.title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => props.setTitle(e.target.value)}
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
  )
}