import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const fileRouter = createTRPCRouter({
  newFile: publicProcedure
    .input(
      z.object({ url: z.string(), userId: z.string(), roomId: z.string() })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.files.create({
        data: {
          name: "file",
          url: input.url,
          userId: input.userId,
          roomId: input.roomId,
        },
      });
    }),
});
