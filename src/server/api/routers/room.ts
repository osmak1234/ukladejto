import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const roomRouter = createTRPCRouter({
  // first check a few things
  // 1. is user loged in
  // 2. does the room exist
  // 3. is the user in the room
  joinRoom: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user) {
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
  createRoom: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Unauthorized, login",
        });
      } else {
        // first create the room then add the user to the room
        const room = await ctx.prisma.room.create({
          data: {
            name: input,
          },
        });

        await ctx.prisma.inRoom.create({
          data: {
            userId: ctx.session.user.id,
            roomId: room.id,
          },
        });

        return "success";
      }
    }),

  getJoinedRooms: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.inRoom.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        room: true,
      },
    });
  }),

  getRooms: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.room.findMany();
  }),

  getRoom: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.room.findFirst({
      where: {
        id: input,
      },
    });
  }),
});
