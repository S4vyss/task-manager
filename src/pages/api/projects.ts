import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const projects = async (req: NextApiRequest, res: NextApiResponse) => {
  res.send("api will work sometime")
};

export default projects;
