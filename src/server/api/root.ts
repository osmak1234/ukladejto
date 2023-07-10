import { createTRPCRouter } from "~/server/api/trpc";
import { fileRouter } from "./routers/file";
import { roomRouter } from "./routers/room";
import { chatRouter } from "./routers/chat";
import { userRouter } from "./routers/user";
import { flashcards } from "./routers/flashcards";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  flashcards: flashcards,
  file: fileRouter,
  room: roomRouter,
  chat: chatRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
