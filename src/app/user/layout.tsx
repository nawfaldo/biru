import "~/styles/globals.css";

import { redirect } from "next/navigation";

import { TRPCReactProvider } from "~/utils/react";

import { getServerAuthSession } from "~/server/auth";

import AuthProvider from "~/utils/AuthContext";

import UserLeftSidebar from "./_components/UserLeftSidebar";
import UserHeader from "./_components/UserHeader";
import UserRightSidebar from "./_components/UserRightSidebar";

export const metadata = {
  title: "biru",
  description: "still in development",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (session?.user === undefined) {
    redirect("/auth?login");
  }

  return (
    <html lang="en">
      <body>
        <TRPCReactProvider>
          <AuthProvider name={session?.user?.name}>
            {/* <UserHeader /> */}
            <div className="flex justify-center">
              <UserLeftSidebar />
              <div className="pt-[50px]">{children}</div>
              <UserRightSidebar />
            </div>
          </AuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
