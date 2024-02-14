"use client";
import { Transition } from "@headlessui/react";
import {
  ChevronLeftIcon,
  PhotoIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function ButtonManage() {
  const pathname = usePathname();

  const routes = [
    {
      name: "Kelola Postingan",
      icon: <PhotoIcon width={24} height={24} />,
      link: "/kelola/post",
    },
    {
      name: "Kelola User",
      icon: <UserIcon width={24} height={24} />,
      link: "/kelola/user",
    },
  ];

  const checkActiveRoute = routes.some((route) => route.link === pathname);

  const [isOpen, setIsOpen] = useState(checkActiveRoute ? true : false);

  return (
    <div
      className={`rounded-lg shadow-sm ${isOpen && "pb-2"} ${routes.some((route) => route.link === pathname) ? "bg-primary text-white" : "text-slate-600"}`}
    >
      <button
        className={`flex w-full items-center justify-between gap-4 rounded-lg px-4 py-3 ${checkActiveRoute ? null : "hover:bg-slate-100 active:hover:bg-white"}}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>Kelola</p>
        <ChevronLeftIcon
          width={26}
          height={26}
          className={`transition-all ${isOpen ? "-rotate-90" : null}`}
        />
      </button>
      {isOpen && (
        <Transition
          as="div"
          className={"px-2"}
          show={isOpen}
          appear={true}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 -translate-y-1"
          enterTo="opacity-100 -translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 -translate-y-0"
          leaveTo="opacity-0 -translate-y-1"
        >
          {routes.map((route, index) => {
            return (
              <Link key={index} href={route.link}>
                <button
                  className={` mb-2 flex w-full items-center gap-4 rounded-lg px-4 py-3 ${route.link === pathname ? "bg-white text-slate-900" : ""} ${checkActiveRoute ? "hover:bg-tertiary hover:text-slate-800 active:bg-primary active:text-white" : "hover:bg-slate-100 active:hover:bg-white"}`}
                >
                  {route.icon}
                  <p className="text-sm">{route.name}</p>
                </button>
              </Link>
            );
          })}
        </Transition>
      )}
    </div>
  );
}
