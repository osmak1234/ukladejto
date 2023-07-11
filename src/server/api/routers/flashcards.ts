import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const flashcards = createTRPCRouter({
  newDeck: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx, input }) => {
      if (!ctx.session?.user)
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Not logged in" });
      return ctx.prisma.deck.create({
        data: { name: input.name, userId: ctx.session.user.id },
      });
    }),

  getDecks: publicProcedure.input(z.object({})).query(({ ctx }) => {
    if (!ctx.session?.user)
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Not logged in" });
    return ctx.prisma.deck.findMany({ where: { userId: ctx.session.user.id } });
  }),

  getDeck: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.session?.user)
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Not logged in" });
      const deck = await ctx.prisma.deck.findFirst({
        where: { id: input.id, userId: ctx.session.user.id },
        include: { FlashCards: true },
      });
      if (!deck)
        throw new TRPCError({ code: "NOT_FOUND", message: "Deck not found" });
      return deck;
    }),

  createFlashcards: publicProcedure
    .input(
      z.array(
        z.object({ front: z.string(), back: z.string(), deckId: z.string() })
      )
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user)
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Not logged in" });
      if (!input.length)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No flashcard data provided",
        });

      const existingDeck = await ctx.prisma.deck.findFirst({
        where: { id: input[0].deckId },
      });
      if (existingDeck)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Deck already exists",
        });

      const newDeck = await ctx.prisma.deck.create({
        data: { name: "default", userId: ctx.session.user.id },
      });
      const flashcardsModified = input.map((item) => ({
        ...item,
        deckId: newDeck.id,
        userId: ctx.session.user.id,
      }));
      const flashcardsCreated = await ctx.prisma.flashCard.createMany({
        data: flashcardsModified,
      });

      return flashcardsCreated;
    }),
});
