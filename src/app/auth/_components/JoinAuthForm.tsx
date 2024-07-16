"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useEffect } from "react";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function JoinAuthForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isLogin = searchParams.has("login");
  const isRegister = searchParams.has("register");

  useEffect(() => {
    if (pathname === "/auth" && !isLogin && !isRegister) {
      router.replace("/auth?login");
    }
  }, [pathname, router]);

  return (
    <div className="w-[400px] space-y-7">
      <h1 className="text-4xl font-bold text-white">
        {isLogin ? "Welcome Back" : "Welcome"}
      </h1>
      <div className="grid grid-cols-2">
        <div
          className={`flex items-center justify-center py-3 ${
            isLogin ? "bg-blue-500" : "bg-gray-900"
          } ${isRegister && "cursor-pointer hover:bg-gray-800"}`}
          onClick={() => {
            if (isRegister) router.replace("/auth?login");
          }}
        >
          <h2 className="text-white">Login</h2>
        </div>
        <div
          className={`flex items-center justify-center py-3 ${
            isRegister ? "bg-blue-500" : "bg-gray-900"
          } ${isLogin && "cursor-pointer hover:bg-gray-800"}`}
          onClick={() => {
            if (isLogin) router.replace("/auth?register");
          }}
        >
          <h2 className="text-white">Register</h2>
        </div>
      </div>
      {isLogin && <LoginForm />}
      {isRegister && <RegisterForm />}
    </div>
  );
}
