// data validation
// import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  auth: protectedProcedure.query(({ ctx }) => {
    return ctx.session.user.id;
  }),
});
