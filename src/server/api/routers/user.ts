import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getProfile: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.user.findUnique({
      where: {
        id: input,
      },
    });
  }),

  getRooms: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.inRoom.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
});
