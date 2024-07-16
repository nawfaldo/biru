"use client";

import { useContext } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { AuthContext } from "~/utils/AuthContext";

import { signOut } from "next-auth/react";

export default function UserRightSidebar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="fixed right-0 top-0 z-30 space-y-10 pr-[70px] pt-[50px]">
      <div className="flex w-[300px] items-center space-x-4 rounded-full bg-gray-800 px-4 py-3">
        <MagnifyingGlassIcon className="w-5 text-gray-400" />
        <p className="text-lg font-light text-gray-400">Search...</p>
      </div>
      <div className="space-y-2">
        <p className="text-lg font-thin text-gray-200">Welcome Back!</p>
        <div className="space-y-5 border-[1px] border-gray-800 p-5">
          <div className="flex items-center space-x-5">
            <div className="h-[70px] w-[70px] rounded-full bg-gray-800"></div>
            <p className="text-xl text-white">{user.name}</p>
          </div>
          <div className="flex space-x-3">
            <button className="w-full rounded-md border border-gray-500 px-7 py-2 text-white hover:bg-gray-800">
              Switch
            </button>
            <button
              className="w-full rounded-md border border-gray-500 px-7 py-2 text-white hover:bg-gray-800"
              onClick={() => signOut({ callbackUrl: "/auth?login" })}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
