import { useRouter} from "next/router";
import ResponsiveAppBar from "../../components/header/AppBar";
import {useSession} from "next-auth/react";

export default function ProjectPage() {
  const router = useRouter();
  const { data: sessionData, status: unauthenticated } = useSession();
  const { id } = router.query;

  if (unauthenticated === "unauthenticated") {
    router.replace("/");
  }

  return (
    <>
      <ResponsiveAppBar />
      {id}
    </>
  )
}