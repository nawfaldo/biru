"use client";

import { useContext } from "react";

import { usePathname, useRouter } from "next/navigation";

import {
  Cog6ToothIcon as Cog6ToothIconOutline,
  HomeIcon as HomeIconOutline,
  PlusIcon as PlusIconOutline,
  UserIcon as UserIconOutline,
} from "@heroicons/react/24/outline";

import {
  Cog6ToothIcon as Cog6ToothIconSolid,
  HomeIcon as HomeIconSolid,
  PlusIcon as PlusIconSolid,
  UserIcon as UserIconSolid,
} from "@heroicons/react/24/solid";

import { AuthContext } from "~/utils/AuthContext";

export default function UserLeftSidebar() {
  const { user } = useContext(AuthContext);

  const list = [
    {
      name: "Home",
      iconOutline: <HomeIconOutline className="h-7 text-white" />,
      iconSolid: <HomeIconSolid className="h-7 text-white" />,
      url: "/user/home",
    },
    {
      name: "Upload",
      iconOutline: <PlusIconOutline className="h-7 text-white" />,
      iconSolid: <PlusIconSolid className="h-7 text-white" />,
      url: `/user/upload`,
    },
    {
      name: "Account",
      iconOutline: <UserIconOutline className="h-7 text-white" />,
      iconSolid: <UserIconSolid className="h-7 text-white" />,
      url: `/user/profile/${user?.name}`,
    },
    {
      name: "Settings",
      iconOutline: <Cog6ToothIconOutline className="h-7 text-white" />,
      iconSolid: <Cog6ToothIconSolid className="h-7 text-white" />,
      url: `/user/settings`,
    },
  ];

  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 z-30 pl-[50px] pt-[50px]">
      <p className="px-3 text-3xl font-black tracking-[3px] text-white">biru</p>
      {list.map((l) => (
        <div
          className={`mt-5 flex w-[200px] items-center space-x-6 rounded-xl px-3 py-3 ${pathname !== l.url && "cursor-pointer hover:bg-gray-900"}`}
          onClick={() => pathname !== l.url && router.replace(l.url)}
        >
          {pathname === l.url ? l.iconSolid : l.iconOutline}
          <p
            className={`font-serif text-lg text-white ${pathname === l.url ? "font-bold" : "font-thin"}`}
          >
            {l.name}
          </p>
        </div>
      ))}
    </div>
  );
}
