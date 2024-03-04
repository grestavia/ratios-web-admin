"use client";
import {
  BanknotesIcon,
  ChevronLeftIcon,
  HomeIcon,
  PhotoIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { Fragment } from "react";
import ButtonManage from "./button-manage";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";
import action from "@/app/auth/logout/action";

export default function SideNav() {
  const pathname = usePathname();

  const routes = [
    {
      name: "Dashboard",
      icon: <HomeIcon className="" width={26} height={26} />,
      link: "/",
    },
    {
      name: "Penarikan",
      icon: <BanknotesIcon className="" width={26} height={26} />,
      link: "/penarikan",
    },
  ];

  return (
    <Transition
      as={Fragment}
      show={true}
      appear={true}
      enter="transition ease-out duration-700"
      enterFrom="opacity-0 -translate-x-6"
      enterTo="opacity-100 -translate--0"
    >
      <nav className="h-screen w-full max-w-72 border-r bg-white shadow-[-5px_0_50px_0_rgba(0,0,0,0.04)]">
        <div className="mx-2 my-2 mb-10 flex items-center gap-4 border-b px-2 py-4 text-primary">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={30}
            height={30}
            priority={true}
          />
          <h1 className="text-xl font-semibold">Ratio</h1>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <ul className="px-4 [&>li]:mb-3">
              {routes.map((route, index) => {
                return (
                  <li key={index}>
                    <Link href={route.link}>
                      <button
                        className={`flex w-full items-center gap-4 rounded-lg px-4 py-3 shadow-sm ${pathname === route.link ? "bg-primary text-white" : "text-slate-600 hover:bg-slate-100 active:hover:bg-white"}`}
                      >
                        {route.icon}
                        <p>{route.name}</p>
                      </button>
                    </Link>
                  </li>
                );
              })}
              <li>
                <ButtonManage />
              </li>
            </ul>
            <hr className="mx-2" />
          </div>
          <ul className="px-4 py-2">
            <li>
              <form action={action}>
                <button
                  type="submit"
                  className="flex w-full items-center gap-4 rounded-lg bg-red-500 px-4 py-3 text-white shadow-sm"
                >
                  <ArrowLeftEndOnRectangleIcon width={26} height={26} />
                  <p>Keluar</p>
                </button>
              </form>
            </li>
          </ul>
        </div>
      </nav>
    </Transition>
  );
}
