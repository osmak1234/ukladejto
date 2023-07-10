import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const flashcards = createTRPCRouter({
  newDeck: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx, input }) => {
      if (!ctx.session?.user) {
        throw new Error("not logged in");
      } else {
        return ctx.prisma.deck.create({
          data: {
            name: input.name,
            userId: ctx.session.user.id,
          },
        });
      }
    }),
  getDecks: publicProcedure.input(z.object({})).query(({ ctx }) => {
    if (!ctx.session?.user) {
      throw new Error("not logged in");
    } else {
      return ctx.prisma.deck.findMany({
        where: {
          userId: ctx.session.user.id,
        },
      });
    }
  }),

  createFlashcard: publicProcedure
    .input(
      z.object({
        deckId: z.number(),
        front: z.string(),
        back: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      if (!ctx.session?.user) {
        throw new Error("not logged in");
      } else {
        return "test";
      }
    }),
});
