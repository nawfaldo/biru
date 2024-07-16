"use client";

import { createContext, useContext } from "react";

interface User {
  name?: string | null | undefined;
}

interface AuthContextType {
  user: User;
}

export const AuthContext = createContext<AuthContextType>({
  user: { name: null },
});

export const useAuth = () => useContext(AuthContext);

interface Props {
  children: React.ReactNode;
  name: string | null | undefined;
}

export default async function AuthProvider({ children, name }: Props) {
  const user = {
    name: name,
  };

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
