import { ChangeEvent, ReactElement, ReactNode, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {trpc} from "../../utils/trpc";
import EditIcon from '@mui/icons-material/Edit';
import ReactMarkdown from "react-markdown";

export default function ProjectTable(props: { projectId: string }): ReactElement {

  const getTables = trpc.project.getTables.useQuery({ projectId: props.projectId }, { enabled: !!props.projectId})
  const createTable = trpc.project.createTable.useMutation().mutateAsync;

  const handleRefetch = async (): Promise<void> => {
    await getTables.refetch();
  }
  const handleAddTable = async () => {
    await createTable({ projectId: props.projectId });
    await handleRefetch()
  }

  return (
    <Box sx={{ display: "flex", gap: 2}}>
      {
        getTables.data &&
        getTables.data.map(table => {
          return (
            <Card
              title={table.title}
              description={table.description}
              id={table.id}
              key={table.id}
              refetch={handleRefetch}
            />
          )
        })
      }
      <Button onClick={handleAddTable} sx={{ height: "fit-content"}}>
        Add Table +
      </Button>
    </Box>
  )
}

interface CardProps {
  title: string | null | undefined;
  description: string | null | undefined;

  id: string;

  refetch: () => Promise<void>
}

function Card(props: CardProps): ReactElement {
  const [disabled, setDisabled] = useState(false);
  const [button, setButton] = useState(false);

  const [title, setTitle] = useState<string>(props.title as string);
  const [description, setDescription] = useState<string>(props.description as string);

  const deleteTable = trpc.project.deleteTable.useMutation().mutateAsync;
  const updateTable = trpc.project.updateTable.useMutation().mutateAsync;
  

  const handleDelete = async () => {
    await deleteTable(props.id);
    await props.refetch();
  }

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    await updateTable({ tableId: props.id, title: title, description: description });
    await props.refetch();
    await setDisabled(false);
    await setButton(true);
  }

  return (
    <Box
      sx={{
        background: "#EBECF0",
        width: "300px",
        padding: 2,
        height: "fit-content",
        paddingBottom: disabled ? 2 : 1,
        borderRadius: "5px"
    }}>
      <form style={{ display: "flex", flexDirection: "column", gap: "10px" }} onSubmit={handleUpdate}>
        <article>
          {
            props.title &&
              !disabled &&
              <Typography sx={{ background: "white", padding: "10px", display: "flex", justifyContent: "space-between"}}>
                <ReactMarkdown>
                  {props.title}
                </ReactMarkdown>
                  <Button
                      sx={{ padding: 0}}
                      style={{ minWidth: "40px" }}
                      onClick={() => {
                        setDisabled(true);
                        setButton(false);
                      }
                  }
                  >
                      <EditIcon sx={{ fontSize: 17 }} />
                  </Button>
              </Typography>
          }
          {
            props.title === null || disabled ?
                <TextField
                    sx={{
                      backgroundColor: "white",
                    }}
                    placeholder="Title:"
                    value={title ?? ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    inputProps={{
                      style: {
                        height: "12px"
                      }
                    }}
                />
              :
              null
          }
        </article>
        <article>
          {
            props.description && !disabled &&
              <Typography
                sx={{
                  background: "white",
                  padding: "10px",
                  minHeight: "150px"
                }}
              >
                  <ReactMarkdown>
                    {props.description}
                  </ReactMarkdown>
              </Typography>
          }
          {
            props.description === null || disabled ?
                <TextField
                    multiline
                    minRows={5}
                    sx={{
                      backgroundColor: "white",
                      width: "100%"
                    }}
                    value={description ?? ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                />
              :
              null
          }
        </article>
        <article style={{ display: "flex", gap: "10px", justifyContent: "center"}}>
          {
            !button &&
              <Button variant="contained" type="submit">
                  Dodaj kartę
              </Button>
          }
          <Button onClick={handleDelete}>
            X
          </Button>
        </article>
      </form>
    </Box>
  )
}