"use client"


import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { supabase } from "@/utils/supabaseClient";
import {
  Bars3Icon,
  ClipboardDocumentCheckIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  UsersIcon,
  UserPlusIcon,
  CreditCardIcon,
  Table,
  UserIcon,
} from "lucide-react";
import { Menu } from "@headlessui/react";

export default async function DashboardMenu() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState({ display_name: "Usuário Anônimo" });

  useEffect(() => {
    async function fetchUserData() {
      try {
        const { data: userData, error: userError } =
          await supabase.auth.getUser();
        if (userError) {
          throw userError;
        }

        if (userData?.user) {
          // Buscar o perfil do usuário
          const { data: profileData, error: profileError } = await supabase
            .from("profile")
            .select("display_name")
            .eq("id", userData.user.id)
            .maybeSingle(); // Usar maybeSingle() para evitar erros quando não há linhas

          if (profileError) {
            throw profileError;
          }

          if (profileData) {
            setProfile({
              display_name: profileData.display_name || "Usuário Anônimo",
            });
          } else {
            // Não foi encontrado um perfil para o usuário
            console.error(
              "Perfil não encontrado para o usuário:",
              userData.user.id
            );
            setProfile({ display_name: "Usuário Anônimo" });
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Erro ao buscar perfil:", error.message);
        } else {
          console.error("Erro desconhecido ao buscar perfil:", error);
        }
      }
    }

    fetchUserData();
  }, []);

  return (
    <>
      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          <div
            className="h-6 w-px bg-gray-900/10 lg:hidden"
            aria-hidden="true"
          />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <form className="relative flex flex-1" action="#" method="GET">
              <label htmlFor="search-field" className="sr-only">
                Search
              </label>
              <MagnifyingGlassIcon
                className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                aria-hidden="true"
              />
              <input
                id="search-field"
                className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Search..."
                type="search"
                name="search"
              />
            </form>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <span className="sr-only">View notifications</span>
              <UserIcon className="h-6 w-6" aria-hidden="true" />
              <div
                className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                aria-hidden="true"
              />
              <Menu as="div" className="relative">
                <Menu.Button className="-m-1.5 flex items-center p-1.5">
                  <span className="sr-only">Open user menu</span>
                  <span className="hidden lg:flex lg:items-center">
                    <span
                      className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                      aria-hidden="true"
                    >
                      {profile.display_name}
                    </span>
                  </span>
                </Menu.Button>
              </Menu>
            </div>
          </div>
        </div>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <h1 className="mb-10 text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Dashboard
            </h1>
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Informações do seu consultório
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              As informações presentes aqui sao um resumo do desempenho mensal
              do seu consultório
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pacientes este mês
                  </CardTitle>
                  <UsersIcon className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">
                    +10.1% desde o mês passado
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Exames solicitados este mês
                  </CardTitle>
                  <ClipboardDocumentCheckIcon className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">30</div>
                  <p className="text-xs text-muted-foreground">
                    +20% desde o mês passado
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pacientes cadastrados
                  </CardTitle>
                  <UserPlusIcon className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">547</div>
                  <p className="text-xs text-muted-foreground">
                    +2% desde o mês passado
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Faturamento com consultas este mês
                  </CardTitle>
                  <CreditCardIcon className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 1.578,00</div>
                  <p className="text-xs text-muted-foreground">
                    +5% desde o mês passado
                  </p>
                </CardContent>
              </Card>
            </div>
            <Table />
          </div>
        </main>
      </div>
    </>
  );
}
