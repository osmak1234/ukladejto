import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const imageRouter = createTRPCRouter({
  newImage: publicProcedure
    .input(z.object({ url: z.string() }))
    .query(({ input }) => {
      return {
        url: input.url,
      };
    }),
});
