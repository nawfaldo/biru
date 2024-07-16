import "~/styles/globals.css";

import { redirect } from "next/navigation";

import { TRPCReactProvider } from "~/utils/react";

import { getServerAuthSession } from "~/server/auth";

export const metadata = {
  title: "biru",
  description: "still in development",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (session?.user !== undefined) {
    redirect("/user/accounts");
  }

  return (
    <html lang="en">
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
