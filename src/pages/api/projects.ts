import { type NextApiRequest, type NextApiResponse } from "next";
import { useSession } from "next-auth/react";
import { prisma } from "../../server/db/client";

const { data: sessionData } = useSession();

const projects = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await prisma.project.findMany({
    where: {
      User: {
        id: sessionData?.user?.id
      }
    }
  });
  res.status(200).json(data);
};

export default projects;
