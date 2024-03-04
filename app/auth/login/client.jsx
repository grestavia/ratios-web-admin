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
        "loading"
      ) : (
        "Masuk "
      )}
    </button>
  );
}
