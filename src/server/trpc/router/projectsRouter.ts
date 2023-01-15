import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const projectsRouter = router({
  getProjects: publicProcedure
    .input(z.optional(z.string()))
    .query(({ input, ctx }) => {
      return ctx.prisma.project.findMany({
        where: {
          User: {
            id: input,
          }
        }
      })
    }),
  createProject: publicProcedure
    .input(z.object({
      title: z.string(),
      userId: z.string()
    }))
    .query(({ input, ctx}) => {
      return ctx.prisma.project.create({
        data: {
          title: input.title,
          User: {
            connect: {
              id: input.userId
            }
          }
        }
      })
    }),
  deleteProject: publicProcedure
    .input(z.object({ projectId: z.string().optional()}))
    .query(({ input, ctx}) => {
      if (input.projectId) {
        return ctx.prisma.project.delete({
          where: {
            id: input.projectId
          }
        })
      }
    })
});
