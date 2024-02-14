"use client";
import Image from "next/image";
import React, { Fragment, useRef, useState } from "react";
import { EyeIcon as EyeIconSolid } from "@heroicons/react/24/solid";
import { EyeIcon as EyeIconOutline } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import { action } from "./action";
import { useFormState, useFormStatus } from "react-dom";

export default function Client() {
  const [showPassword, setShowPassword] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);

  const initialState = {
    errors: {
      email: "",
      password: "",
    },
    disable: false,
  };

  const [state, formAction] = useFormState(action, initialState);

  return (
    <Transition
      as={Fragment}
      show={true}
      appear={true}
      enter="transition ease-out duration-700"
      enterFrom="opacity-0 translate-y-6"
      enterTo="opacity-100 translate-y-0"
    >
      <div className="w-full max-w-xl rounded-xl bg-white px-8 py-10 shadow-[0_0_0_7px_rgba(234,234,234,0.25)]">
        <Image
          src={"/logo.png"}
          width={50}
          height={50}
          alt="logo"
          className="mx-auto"
        />
        <h1 className="mb-2 text-xl font-semibold">Login</h1>
        <p className="mb-6 text-slate-500">
          Kemudahan akses dan kontrol penuh. Masuk sebagai admin untuk mengatur
          dunia Anda
        </p>
        <form action={formAction}>
          <div className="mb-5">
            <div className="mb-2 flex flex-col gap-2">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="rounded-lg border px-4 py-2 focus:outline-2 focus:outline-secondary"
                placeholder="Masukkan email"
                autoFocus
                required
              />
            </div>
            {state?.errors?.email && (
              <p className="text-sm text-red-600 before:content-['*_']">
                {state?.errors?.email}
              </p>
            )}
          </div>
          <div className="mb-5">
            <div className="mb-2 flex flex-col gap-2">
              <label htmlFor="password" className="font-medium">
                Password
              </label>
              <div
                className={`flex rounded-lg border px-4 py-2 ${focusPassword ? "border-transparent outline outline-2 outline-secondary" : null}`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full focus:outline-none"
                  placeholder="Masukkan password"
                  onFocus={() => setFocusPassword(true)}
                  onBlur={() => setFocusPassword(false)}
                  required
                />
                <div
                  className="hover:cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeIconSolid
                      width={25}
                      height={25}
                      className="text-slate-800"
                    />
                  ) : (
                    <EyeIconOutline
                      width={25}
                      height={25}
                      className="text-slate-500"
                    />
                  )}
                </div>
              </div>
            </div>
            {state?.errors?.password && (
              <p className="text-sm text-red-600 before:content-['*_']">
                {state?.errors?.password}
              </p>
            )}
          </div>
          <Button />
        </form>
      </div>
    </Transition>
  );
}

function Button(params) {
  const { pending } = useFormStatus();
  return (
    <button
      className="block w-full rounded-lg bg-primary py-2 font-semibold text-white transition-all ease-in hover:outline hover:outline-[3px] hover:outline-secondary active:outline-none disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:outline-none"
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? (
        <svg
          className="mx-auto h-6 w-6 animate-spin"
          viewBox="0 0 95 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M94.9998 50C94.9998 77.6142 72.6141 100 44.9998 100C26.4928 100 10.3342 89.945 1.68893 75H13.773C21.1036 84.1446 32.3679 90 44.9998 90C67.0912 90 84.9998 72.0914 84.9998 50C84.9998 27.9086 67.0912 10 44.9998 10C31.0357 10 18.7428 17.1556 11.5879 28H0.0874023C8.22622 11.4161 25.2798 0 44.9998 0C72.6141 0 94.9998 22.3858 94.9998 50Z"
            fill="white"
          />
        </svg>
      ) : (
        "Masuk "
      )}
    </button>
  );
}
