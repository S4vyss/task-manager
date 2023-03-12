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
  createTable: publicProcedure
    .input(z.object({
      title: z.optional(z.string()),
      description: z.optional(z.string()),
      projectId: z.string()
    }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.table.create({
        data: {
          title: input.title,
          description: input.description,
          project: {
            connect: {
              id: input.projectId
            }
          }
        }
      })
    }),
  updateTable: publicProcedure
    .input(z.object({
      tableId: z.string(),
      title: z.string().optional(),
      description: z.string().optional(),
    }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.table.update({
        where: {
          id: input.tableId,
        },
        data: {
          title: input.title,
          description: input.description,
        }
      });
    }),
  getTables: publicProcedure
    .input(z.object({
      projectId: z.string()
    }))
    .query(({ input, ctx }) => {
      return ctx.prisma.table.findMany({
        where: {
          projectId: input.projectId
        },
        select: {
          title: true,
          description: true,
          id: true
        }
      })
    }),
  deleteTable: publicProcedure
    .input(z.string())
    .mutation(({ input, ctx }) => {
      return ctx.prisma.table.delete({
        where: {
          id: input
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
  deleteMember: publicProcedure
    .input(z.object({
      projectId: z.string(),
      email: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.email
        }
      })

      if (!user) {
        throw new Error("no such user");
      }

      const member = await ctx.prisma.member.findUnique({
        where: {
          userId_projectId: {
            projectId: input.projectId,
            userId: user.id
          }
        }
      })

      if (!member) {
        throw new Error("no such member");
      }

      return ctx.prisma.member.delete({
        where: {
          id: member.id
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
          NOT: {
            id: ctx.session?.user?.id,
          }
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
    }),
  findMembersInProject: publicProcedure
    .input(z.object({
      projectId: z.optional(z.string())
    }))
    .query(async ({ input, ctx }) => {
      const { projectId } = input;

      const project = await ctx.prisma.project.findUnique({
        where: { id: projectId }
      });

      if (!project) {
        throw new Error("No project with that id");
      }

      const members = await ctx.prisma.member.findMany({
        where: { projectId },
        select: {
          user: {
            select: {
              email: true,
              image: true,
            }
          }
        }
      });

      return members.map(({ user }) => user);
    }),
    getOwnerOfProject: publicProcedure
      .input(z.object({
        projectId: z.string()
      }))
      .query(({ input, ctx }) => {
        const { projectId } = input;

        return ctx.prisma.project.findUnique({
          where: {
            id: projectId
          },
          select: {
            owner: {
              select: {
                id: true
              }
            }
          }
        })
      })
});
