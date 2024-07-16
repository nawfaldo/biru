"use client";

import { useContext } from "react";

import { AuthContext } from "~/utils/AuthContext";

import { signOut } from "next-auth/react";

export default function UserHeader() {
  const { user } = useContext(AuthContext);

  return (
    <div className="fixed top-0 z-50 flex w-full  items-center justify-between border-b-[0.5px] border-gray-700 bg-black px-[30px] py-3">
      <p className="text-xl font-bold tracking-[3px] text-white">biru</p>

      <div className="flex items-center space-x-[50px]">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-gray-500"></div>
          <p className="text-white">{user.name}</p>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/auth?login" })}
          className="rounded-md border border-gray-500 px-7 py-2 text-white hover:bg-gray-800"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
