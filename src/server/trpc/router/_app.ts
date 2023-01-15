import { router } from "../trpc";
import { authRouter } from "./auth";
import { projectsRouter } from "./projectsRouter";

export const appRouter = router({
  project: projectsRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
