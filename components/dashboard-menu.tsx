import {
  Bars3Icon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { UsersIcon, UserPlusIcon, CreditCardIcon } from "lucide-react";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

const DashboardMenu = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simula o carregamento de dados
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simula o carregamento dos dados por 2 segundos
    return () => clearTimeout(timer);
  }, []);

  // Componente de esqueleto
  const Skeleton = () => (
    <div className="py-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded-md w-48 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded-md max-w-[360px] mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-md mb-2.5"></div>
        </div>
      </div>
    </div>
  );
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

          {/* Separator */}
          <div
            className="h-6 w-px bg-gray-900/10 lg:hidden"
            aria-hidden="true"
          />
        </div>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <Skeleton />
            ) : (
              <>
                <h1 className="mb-10 text-3xl font-bold leading-tight tracking-tight text-gray-900">
                  Dashboard
                </h1>
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                  Informações do seu consultório
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  As informações presentes aqui sao um resumo do desempenho
                  mensal do seu consultório
                </p>
                {/* <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
            </div> */}
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default DashboardMenu;
