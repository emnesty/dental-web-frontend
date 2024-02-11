import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import { Sidebar } from "@/components/ui/sidebar";
import LoginPage from "./login/page";

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
      <div className="flex">
        {" "}
        {/* Add a flex container */}
        <Sidebar />
        <div className="ml-64">
          {" "}
          {/* Adjust margin left based on sidebar width */}
          <h1>Hello</h1>
          {/* Other content for your main area */}
        </div>
      </div>
    </>
  );
}
