"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

export default function RecoverPassword() {
  const [email, setEmail] = useState("");

  const supabase = createClientComponentClient();
  const { toast } = useToast();

  const testToast = () => {
    toast({
      title: "Teste",
      description: "Isto é um teste do Toast.",
    });
  };

  const handleRecoverPassword = async (event) => {
    event.preventDefault();

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
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900">
      <div className="mx-auto w-[350px] space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <img alt="Logo" src="../../../images/logo.png" />
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold dark:text-gray-400">
              Recuperar senha
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Entre com seu email abaixo para recuperar sua senha
            </p>
          </div>
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
          >
            Enviar
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
  );
}
