import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const projectsRouter = router({
  getProjects: publicProcedure
    .input(z.optional(z.string()))
    .query(({ input, ctx }) => {

      const userId = input ?? ctx.session?.user?.id;
      if (!userId) {
        throw new Error("User ID is missing");
      }

      return ctx.prisma.project.findMany({
        where: {
          OR: [
            {
              owner: {
                id: userId
              },
            },
            {
              members: {
                some: {
                  userId
                }
              }
            }
          ]
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
    }),
  addMember: publicProcedure
    .input(z.object({
      email: z.string(),
      projectId: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      const { email, projectId } = input;

      const user = await ctx.prisma.user.findUnique({
        where: { email },
        select: { id: true }
      });

      if (!user) {
        throw new Error(`User with ${email} not found`);
      }

      return ctx.prisma.member.create({
        data: {
          user: {
            connect: {
              id: user.id // the ID of the user to add as a member
            }
          },
          project: {
            connect: {
              id: projectId // the ID of the project to add the user as a member of
            }
          }
        }
      })
    }),
  findMember: publicProcedure
    .input(z.object({
      email: z.string()
    }))
    .query(async ({ input, ctx }) => {
      const { email } = input;

      const user = await ctx.prisma.user.findMany({
        where: {
          email: { startsWith: email },
          NOT: { id: ctx.session?.user?.id }
        },
        select: {
          name: true,
          image: true,
          email: true
        }
      });

      if (!user) {
        throw new Error(`User with ${input} not found`);
      }

      return user;
    })
});
