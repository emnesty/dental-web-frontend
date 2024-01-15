"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  const redirectToRecoverPage = () => {
    router.push("/login/create");
  };

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }

    getUser();
  }, []);

  const handleSignUp = async () => {
    const res = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setUser(res.data.user);
    router.refresh();
    setEmail("");
    setPassword("");
  };

  const handleSignIn = async () => {
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setUser(res.data.user);
    router.refresh();
    setEmail("");
    setPassword("");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    setUser(null);
  };

  if (loading) {
    return <h1>loading..</h1>;
  }

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="p-8 text-center bg-white rounded-lg shadow-md dark:bg-gray-900 w-96">
          <h1 className="mb-4 text-xl font-bold text-gray-700 dark:text-gray-300">
            Você já está logado
          </h1>
          <button
            onClick={handleLogout}
            className="w-full p-3 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
          >
            Sair
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="flex items-center justify-center h-screen p-6 dark:bg-gray-900">
      <div className="max-w-sm mx-auto space-y-6">
        <div className="flex justify-center">
          <img alt="Company Logo" src="images/logo.png" />
        </div>
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold dark:text-gray-400">
            Acessar Sistema
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Entre com seu email e senha abaixo
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="dark:text-gray-400">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Insira o seu email"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="dark:text-gray-400">
              Senha
            </Label>
            <Input
              id="password"
              placeholder="Entre com sua senha"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button className="w-full" type="submit" onClick={handleSignIn}>
            Entrar
          </Button>
          <Button
            className="w-full mt-4 text-white bg-green-500"
            type="button"
            onClick={redirectToRecoverPage}
          >
            Criar uma conta
          </Button>
          <Link
            className="inline-block w-full text-sm text-center underline"
            href={"login/recover"}
          >
            Esqueceu sua senha?
          </Link>
        </div>
      </div>
    </main>
  );
}
