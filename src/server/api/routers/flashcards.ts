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

  getDeck: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      if (!ctx.session?.user) {
        throw new Error("not logged in");
      } else {
        return ctx.prisma.deck.findFirst({
          where: {
            id: input.id,
            userId: ctx.session.user.id,
          },
          include: {
            FlashCards: true,
          },
        });
      }
    }),

  createFlashcards: publicProcedure
    .input(
      z.array(
        z.object({
          front: z.string(),
          back: z.string(),
          deckId: z.string(),
        })
      )
    )
    .mutation(({ ctx, input }) => {
      if (!ctx.session?.user?.id) {
        throw new Error("not logged in");
      } else {
        const modifiedInput = input.map((flashcard) => {
          return {
            ...flashcard,
            userId: ctx.session?.user.id ?? "",
          };
        });
        return ctx.prisma.flashCard.createMany({
          data: modifiedInput,
        });
      }
    }),
});
