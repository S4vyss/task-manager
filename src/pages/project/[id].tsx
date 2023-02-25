import { useRouter} from "next/router";
import ResponsiveAppBar from "../../components/header/AppBar";
import {useSession} from "next-auth/react";
import {Backdrop, CircularProgress} from "@mui/material";

export default function ProjectPage() {
  const router = useRouter();
  const { data: sessionData, status } = useSession();
  const { id } = router.query;

  if (status === "unauthenticated") {
    router.replace("/");
  }

  return (
    <>
      {status === "loading"
        ? <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      : <ResponsiveAppBar />
      }
    </>
  )
}