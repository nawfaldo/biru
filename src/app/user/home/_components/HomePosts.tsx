"use client";

import { useRouter } from "next/navigation";

import { api } from "~/utils/react";

import VideoPost from "../../_components/VideoPost";
import ImagePost from "../../_components/ImagePost";

export default function HomePosts() {
  const { data } = api.post.feed.useQuery();

  const router = useRouter();

  return (
    <div className="space-y-10">
      {data?.map((d) => (
        <div className="w-[500px] space-y-3">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gray-800"></div>
            <p
              className="cursor-pointer text-lg text-white"
              onClick={() => router.replace(`/user/profile/${d.user.name}`)}
            >
              {d.user.name}
            </p>
          </div>
          {d.caption && (
            <p className="text-xl font-light text-white">{d.caption}</p>
          )}
          {d.type === "VIDEO" && d.file && <VideoPost url={d.file} />}
          {d.type === "IMAGE" && d.file && <ImagePost url={d.file} />}
        </div>
      ))}
    </div>
  );
}
