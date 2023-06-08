import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const chatRouter = createTRPCRouter({
  firstMessages: protectedProcedure
    .input(
      z.object({
        roomId: z.string(),
        limit: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const messages = await ctx.prisma.messages.findMany({
        take: input.limit + 1,
        where: {
          roomId: input.roomId,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: true,
        },
      });
      const nextCursor = messages.pop();
      return {
        messages: messages,
        nextCursor: nextCursor ? nextCursor.id : null,
      };
    }),

  infiniteChat: protectedProcedure
    .input(
      z.object({
        roomId: z.string(),
        limit: z.number(),
        cursor: z.string().nullish(),
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
        const { roomId, limit, cursor } = input;
        const messages = await ctx.prisma.messages.findMany({
          take: limit + 1,
          skip: 1,
          cursor: cursor ? { id: cursor } : undefined,
          where: {
            roomId: roomId,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        const nextCursor = messages.pop();
        return {
          messages,
          nextCursor: nextCursor ? nextCursor.id : null,
        };
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
            userId: ctx.session.user.id,
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
