"use server";

import { NEXT_PUBLIC_API_RATIO } from "@/environment";
import { setSession } from "@/libs/session";
import axios from "axios";
import { redirect } from "next/navigation";
import { resolve } from "styled-jsx/css";

export async function action(prev, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  let status;
  const result = {};

  try {
    const request = await axios.post(
      `${NEXT_PUBLIC_API_RATIO}/users/auth/login/admin`,
      new URLSearchParams({
        email,
        password,
      }),
    );

    await setSession(request.data?.data?.token);

    if (request.status == 200) {
      status = true;
      console.log(request.data.data);
    }
  } catch (error) {
    result.errors = {};
    console.log(error.response.data.errors);
    error.response?.data?.errors?.messages.map((item) => {
      result.errors[item.field] = item.message;
    });
  }

  if (status) return redirect("/");

  console.log(result);

  return result;
}
