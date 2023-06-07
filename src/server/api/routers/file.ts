import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const fileRouter = createTRPCRouter({
  newFile: publicProcedure
    .input(
      z.object({ url: z.string(), userId: z.string(), roomId: z.string() })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.files.create({
        data: {
          name: "file",
          url: input.url,
          userId: input.userId,
          roomId: input.roomId,
        },
      });
    }),
  getFilesInRoom: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.prisma.files.findMany({
        where: {
          roomId: input,
        },
      });
    }),
});
