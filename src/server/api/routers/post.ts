import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  createPost: protectedProcedure
    .input(
      z.object({
        caption: z.string().optional(),
        file: z.string().optional(),
        fileType: z.string().optional(),
        thumbnail: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let type: any = ctx.db.postType.TEXT;

      if (input.fileType === "image") {
        type = ctx.db.postType.IMAGE;
      }
      if (input.fileType === "video") {
        type = ctx.db.postType.VIDEO;
      }

      //   console.log(input);

      return ctx.db.table.post.create({
        data: {
          caption: input.caption,
          file: input.file,
          thumbnail: input.thumbnail,
          type: type,
          user: {
            connect: {
              id: ctx.session?.user?.id,
            },
          },
        },
      });
    }),
  feed: protectedProcedure.query(async ({ ctx }) => {
    const posts = ctx.db.table.post.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return posts;
  }),
  getUserPosts: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const posts = ctx.db.table.post.findMany({
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        where: {
          user: {
            name: input.name,
          },
        },
      });

      return posts;
    }),
  getPostWithId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const post = ctx.db.table.post.findUnique({
        where: {
          id: input.id,
        },
      });

      return post;
    }),
});
