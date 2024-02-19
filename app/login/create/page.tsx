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
import React from "react";
import { Icons } from "@/components/ui/icons";
import { ToastAction } from "@/components/ui/toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function LoginPage() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); // Novo estado para o nome completo
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }

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
    setIsLoading(true);
    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Inclui o nome completo nos metadados do usuário
        data: { fullName },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      toast({
        title: "Erro",
        description: error.message,
      });
      setIsLoading(false);
    } else {
      toast({
        title: "Sucesso",
        description:
          "Conta criada com sucesso! Verifique seu e-mail para confirmar a conta.",
      });
      setUser(data.user);
      router.push("/login");
    }
    setIsLoading(false);
  };

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
              {/* <div className="space-y-2">
                <Label htmlFor="fullName" className="dark:text-gray-400">
                  Nome Completo
                </Label>
                <Input
                  id="fullName"
                  placeholder="Seu nome completo"
                  required
                  type="text"
                  value={fullName}
                  disabled={isLoading}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div> */}
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
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button
              className="w-full bg-slate-900 hover:bg-slate-800 text-white"
              type="button"
              onClick={handleSignUp}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
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
