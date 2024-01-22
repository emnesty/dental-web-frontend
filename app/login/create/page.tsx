"use client";

import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const supabase = createClientComponentClient();

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
    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
      });
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      toast({
        title: "Erro",
        description: error.message,
      });
    } else {
      toast({
        title: "Sucesso",
        description:
          "Conta criada com sucesso! Verifique seu e-mail para confirmar a conta.",
      });
      // Atualiza o estado do usuário
      setUser(data.user);

      // Redirecionar para a página de login
      router.push("/login");
    }
  };

  // const handleLogout = async () => {
  //   await supabase.auth.signOut();
  //   router.refresh();
  //   setUser(null);
  // };

  if (loading) {
    return <h1>loading..</h1>;
  }

  return (
    <main className="flex items-center justify-center h-screen p-6 dark:bg-gray-900">
      <div className="mx-auto w-[350px] space-y-6">
        <div className="flex justify-center">
          <img alt="Logo" src="../../../images/logo.png" />
        </div>
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Realizar cadastro</h1>
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
          <div className="space-y-2">
            <Label htmlFor="password">Confirmar senha</Label>
            <Input
              id="password"
              placeholder="Confirme sua senha"
              required
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <Button
          className="w-full bg-slate-900 hover:bg-slate-800 text-white"
          type="submit"
          onClick={handleSignUp}
        >
          Criar uma conta
        </Button>
        <Link
          className="inline-block w-full text-sm text-center underline"
          href={"/login"}
        >
          Voltar para o login
        </Link>
      </div>
    </main>
  );
}
