import Image from "next/image";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="flex flex-col items-center justify-between min-h-screen p-24">
        <Link href={"/login"}>
          You are not logged in. Click here to go login.
        </Link>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <h1>Você está dentro!</h1>
    </main>
  );
}
