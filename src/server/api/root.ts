import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

import { userRouter } from "./routers/user";
import { postRouter } from "./routers/post";

export const appRouter = createTRPCRouter({
  user: userRouter,
  post: postRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
