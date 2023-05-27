import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const roomRouter = createTRPCRouter({
  joinRoom: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.inRoom.create({
          data: {
            userId: "clhvrv6aq0000gemg38mzzfpe",
            roomId: input,
          },
        });
      } catch (e) {
        console.log(e);
      }
      return "success";
    }),
  getJoinedRooms: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.inRoom.findMany({
      where: {
        userId: "1",
      },
    });
  }),
  createRoom: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.room.create({
      data: {
        name: "test",
      },
    });
  }),
  getRooms: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.room.findMany();
  }),
});
