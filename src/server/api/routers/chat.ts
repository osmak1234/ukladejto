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
        console.log(
          await ctx.prisma.inRoom.findMany({
            where: {
              userId: ctx.session.user.id,
              roomId: input,
            },
            take: 10,
            orderBy: {
              createdAt: "desc",
            },
          })
        );
        console.log(ctx.session.user.id, input);

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
  olderMessages: protectedProcedure
    .input(
      z.object({
        roomId: z.string(),
        skip: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.messages.findMany({
        where: {
          roomId: input.roomId,
        },
        skip: input.skip,
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
});
