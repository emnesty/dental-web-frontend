import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import LoginPage from "./login/page";
import Sidebar from "@/components/sidebar";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <>
        <LoginPage />
      </>
    );
  }

  return (
    <>
      <Sidebar />
    </>
  );
}
