"use client";

import { FC, use, useContext } from "react";

import { AuthContext } from "~/utils/AuthContext";

import { api } from "~/utils/react";

interface Props {
  name: string;
}

const UserProfile: FC<Props> = ({ name }) => {
  const { data } = api.user.getUser.useQuery({ name });

  const { user } = useContext(AuthContext);

  const follow = api.user.follow.useMutation();

  return (
    <div>
      <p className="text-white">{data?.profile?.name}</p>
      <div className="flex space-x-5">
        <div className="flex space-x-2">
          <p className="text-white">{data?.following}</p>
          <p className="text-white">Following</p>
        </div>
        <div className="flex space-x-2">
          <p className="text-white">{data?.follower}</p>
          <p className="text-white">Follower</p>
        </div>
      </div>
      {data?.profile?.name !== user.name && (
        <button
          disabled={follow.isPending}
          onClick={async () =>
            data?.profile?.id &&
            (await follow.mutateAsync({ followingId: data?.profile?.id }))
          }
        >
          <p className="text-white">follow</p>
        </button>
      )}
    </div>
  );
};

export default UserProfile;
