import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const roomRouter = createTRPCRouter({
  joinRoom: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user) {
        // this is error
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Unauthorized, login",
        });
      } else {
        if (
          !(await ctx.prisma.room.findFirst({
            where: {
              id: input,
            },
          }))
        ) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Room not found",
          });
        }

        if (
          await ctx.prisma.inRoom.findFirst({
            where: {
              userId: ctx.session.user.id,
              roomId: input,
            },
          })
        ) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Already joined",
          });
        }

        try {
          await ctx.prisma.inRoom.create({
            data: {
              userId: ctx.session.user.id,
              roomId: input,
            },
          });
        } catch (e) {
          console.log(e);
        }
        return "success";
      }
    }),
  getJoinedRooms: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.inRoom.findMany({
      where: {
        userId: "1",
      },
    });
  }),
  createRoom: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.room.create({
      data: {
        name: "test",
      },
    });
  }),
  getRooms: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.room.findMany();
  }),
});
