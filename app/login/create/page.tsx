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
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
    <>
      <div className="h-screen container relative hidden flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href={"/login"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Entrar
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          {/* <div className="absolute inset-0 bg-zinc-900" /> */}
          <div className="max-w-full overflow-hidden">
            <Image
              src={"/images/jonathan-borba-hl6uG9cHW5A-unsplash.jpg"}
              alt={""}
              layout="fill" //
              objectFit="cover"
              objectPosition="center"
              className="absolute inset-0"
            />
          </div>
          <div className="relative z-20 flex items-center text-lg font-medium">
            <img alt="Logo" src="../../../images/logo.png" />
            {/* DentApp */}
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Crie sua conta
              </h1>
              <p className="text-sm text-muted-foreground">
                Entre com seus dados abaixo para criar sua conta
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
              <Label htmlFor="password" className="dark:text-gray-400">
                Confirmar senha
              </Label>
              <Input
                id="password"
                placeholder="Confirme sua senha"
                required
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button
              className="w-full bg-slate-900 hover:bg-slate-800 text-white"
              type="submit"
              onClick={handleSignUp}
            >
              Criar uma conta
            </Button>
            <p className="px-8 text-center text-sm text-muted-foreground">
              Clicando em criar conta você concorda com nossos{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Termos de serviço
              </Link>{" "}
              e{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Política de privacidade
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
