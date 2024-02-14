"use server";

import { clearSession } from "@/libs/session";
import { redirect } from "next/navigation";

export default async function action(formBody) {
  await clearSession();
  redirect("/auth/login");
}
