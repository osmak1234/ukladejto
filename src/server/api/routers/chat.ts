import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const chatRouter = createTRPCRouter({
  getChat: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      if (
        await ctx.prisma.inRoom.count({
          where: {
            userId: ctx.session.user.id,
            roomId: input,
          },
        })
      ) {
        return ctx.prisma.messages.findMany({
          where: {
            roomId: input,
          },
        });
      } else {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You aren't in the chat you requested",
        });
      }
    }),
  addMessage: protectedProcedure
    .input(
      z.object({
        message: z.string(),
        authorId: z.string(),
        roomId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (
        await ctx.prisma.inRoom.count({
          where: {
            userId: ctx.session.user.id,
            roomId: input.roomId,
          },
        })
      ) {
        return ctx.prisma.messages.create({
          data: {
            text: input.message,
            userId: input.authorId,
            roomId: input.roomId,
          },
        });
      } else {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You aren't in the room you want to send the message in",
        });
      }
    }),
});