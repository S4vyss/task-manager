import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const projectsRouter = router({
  getProjects: publicProcedure
    .input(z.optional(z.string()))
    .query(({ input, ctx }) => {
      return ctx.prisma.project.findMany({
        where: {
          owner: {
            id: input
          }
        }
      })
    }),
  createProject: publicProcedure
    .input(z.object({
      title: z.string(),
      userId: z.optional(z.string())
    }))
    .mutation(({ input, ctx}) => {
      return ctx.prisma.project.create({
        data: {
          title: input.title,
          owner: {
            connect: {
              id: input.userId
            }
          }
        }
      })
    }),
  deleteProject: publicProcedure
    .input(z.string())
    .mutation(({ input, ctx}) => {
      return ctx.prisma.project.delete({
        where: {
          id: input
        }
      })
    })
});

// TODO: change delete and create project to be mutation not query
