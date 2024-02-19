"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { Icons } from "@/components/ui/icons";

export default function RecoverPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClientComponentClient();
  const { toast } = useToast();

  const handleRecoverPassword = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Ativa o estado de carregamento

    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      console.error("Erro ao recuperar senha:", error);
      toast({
        title: "Erro",
        variant: "destructive",
        description: "Erro ao enviar email de recuperação de senha.",
      });
    } else {
      toast({
        title: "Sucesso",
        description:
          "Email de recuperação enviado! Verifique sua caixa de entrada.",
      });
    }
    setIsLoading(false); // Desativa o estado de carregamento
  };

  return (
    <>
      <div className="h-screen container relative hidden flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
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
                Recuperar senha
              </h1>
              <p className="text-sm text-muted-foreground">
                Entre com seu email abaixo para recuperar sua senha
              </p>
            </div>
            <form onSubmit={handleRecoverPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="dark:text-gray-400">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="Insira seu email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button
                className="w-full bg-slate-900 hover:bg-slate-800 text-white"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Enviando...
                  </>
                ) : (
                  "Enviar"
                )}
              </Button>
            </form>
            <Link
              className="inline-block w-full text-sm text-center underline dark:text-gray-400"
              href={"/login"}
            >
              Voltar para o login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
