import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { TRPCError } from "@trpc/server";

import { AuthInputError, User, UserProfile } from "~/utils/types";

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({ name: z.string(), email: z.string(), password: z.string() }),
    )
    .mutation(async ({ ctx, input }) => {
      const error: AuthInputError = {};

      const existingUserWithEmail = await ctx.db.table.user.findUnique({
        where: { email: input.email },
      });

      if (existingUserWithEmail) {
        error.email = "Email already exists";
      }

      const existingUserWithName = await ctx.db.table.user.findUnique({
        where: { name: input.name },
      });

      if (existingUserWithName) {
        error.name = "Name already exists";
      }

      if (error.email !== undefined || error.name !== undefined) {
        throw new TRPCError({
          code: "CONFLICT",
          message: JSON.stringify(error),
        });
      }

      return ctx.db.table.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
        },
      });
    }),
  getUser: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const user: User = {
        profile: null,
        follower: 0,
        following: 0,
      };

      const profile: UserProfile | null = await ctx.db.table.user.findUnique({
        where: {
          name: input.name,
        },
      });

      if (!profile) {
        throw new Error("User not found");
      }

      user.profile = profile;

      const follower = await ctx.db.table.follows.count({
        where: {
          followingId: profile.id,
        },
      });

      user.follower = follower;

      const following = await ctx.db.table.follows.count({
        where: {
          followerId: profile.id,
        },
      });

      user.following = following;

      return user;
    }),
  follow: protectedProcedure
    .input(z.object({ followingId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.table.follows.create({
        data: {
          followerId: ctx.session.user.id,
          followingId: input.followingId,
        },
      });
    }),
});
