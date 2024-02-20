"use client";

import { Fragment, SetStateAction, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowLeftEndOnRectangleIcon,
  CalendarIcon,
  Cog6ToothIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import DialogLogout from "./logout-dialog";
import DashboardMenu from "./dashboard-menu";
import PacientesMenu from "./pacientes-menu";
import ConsultasMenu from "./consultas-menu";
import ExamesMenu from "./exames-menu";
import SettingsMenu from "./settings-menu";

const navigation = [
  { name: "Dashboard", icon: HomeIcon },
  { name: "Pacientes", icon: UsersIcon },
  { name: "Consultas", icon: CalendarIcon },
  { name: "Exames", icon: FolderIcon },
  { name: "Configurações", icon: Cog6ToothIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const supabase = createClientComponentClient();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard"); // Novo estado para controlar o menu ativo

  // Função para mudar o menu ativo
  const handleMenuChange = (menuName: SetStateAction<string>) => {
    setActiveMenu(menuName);
    setSidebarOpen(false); // Fecha a sidebar após a seleção em dispositivos móveis
  };

  // Renderiza o componente de menu ativo
  const renderActiveMenu = () => {
    switch (activeMenu) {
      case "Dashboard":
        return <DashboardMenu />;
      case "Pacientes":
        return <PacientesMenu />;
      case "Consultas":
        return <ConsultasMenu />;
      case "Exames":
        return <ExamesMenu />;
      case "Configurações":
        return <SettingsMenu />;
      default:
        return <DashboardMenu />;
    }
  };

  // Função para abrir o modal de logout
  const handleLogoutClick = () => {
    setIsLogoutDialogOpen(true);
  };

  // Função para lidar com o logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="/images/_white.png"
                        alt="Dental Web"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul
                            role="list"
                            className="flex flex-1 flex-col gap-y-7"
                          >
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <button
                                  onClick={() => handleMenuChange(item.name)}
                                  className={classNames(
                                    activeMenu === item.name
                                      ? "bg-gray-800 text-white w-full"
                                      : "text-gray-400 hover:text-white hover:bg-gray-800 w-full",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full"
                                  )}
                                >
                                  <item.icon
                                    className="h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="mt-auto">
                          <a
                            href="#"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            Configurações
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="/images/logo_white.png"
                alt="Dental Web"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    {navigation
                      .filter((item) => item.name !== "Configurações")
                      .map((item) => (
                        <li key={item.name}>
                          <button
                            onClick={() => handleMenuChange(item.name)}
                            className={classNames(
                              activeMenu === item.name
                                ? "bg-gray-800 text-white w-full"
                                : "text-gray-400 hover:text-white hover:bg-gray-800 w-full",
                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full"
                            )}
                          >
                            <item.icon
                              className="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            {item.name}
                          </button>
                        </li>
                      ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <button
                    onClick={() => handleMenuChange("Configurações")}
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white w-full"
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    Configurações
                  </button>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogoutClick();
                    }}
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    <ArrowLeftEndOnRectangleIcon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    Sair
                  </a>
                  <DialogLogout
                    isOpen={isLogoutDialogOpen}
                    setIsOpen={setIsLogoutDialogOpen}
                  />
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {/* Content */}
        {renderActiveMenu()}
      </div>
    </>
  );
}
