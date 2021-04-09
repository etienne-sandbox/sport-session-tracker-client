import { createContext, useContext } from "react";

export const PublicUrlContext = createContext<string | null>(null);

export function usePublicUrl(): string {
  const publicUrl = useContext(PublicUrlContext);
  if (publicUrl === null) {
    throw new Error("Missing PublicUrlContext");
  }
  return publicUrl;
}
