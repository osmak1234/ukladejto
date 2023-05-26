import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const roomRouter = createTRPCRouter({
  joinRoom: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.inRoom.create({
      data: {
        roomId: "1",
        userId: "1",
      }
    });
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
  getJoinedRooms: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.inRoom.findMany({
      where: {
        userId: "1"
      }
    });
  }
  ),
  createRoom: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.room.create({
      data: {
        name: "test"
      }
    });
  }

});
