// data validation
// import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  auth: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    if (data) {
      return data.id;
    } else {
      return false;
    }
  }),
});
