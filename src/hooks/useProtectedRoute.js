import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Router from "next/router";

export default function useProtectedRoute() {
  const { session } = useSession();

  useEffect(() => {
    console.log(session, "SESSION");
    if (!session) {
      Router.push("/");
    }
  }, [session]);
}
