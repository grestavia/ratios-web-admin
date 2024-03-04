import MainLayout from "@/components/main-layout";
import React from "react";
import Client from "./client";
import { getSession } from "@/libs/session";
import axios from "axios";
import { NEXT_PUBLIC_API_RATIO } from "@/environment";

export default async function Page({ searchParams }) {
  const currentPage = searchParams.currentPage ? searchParams.currentPage : 1;
  const page = searchParams.page ? searchParams.page : 6;
  const session = await getSession();
  const data = await axios.get(
    `${NEXT_PUBLIC_API_RATIO}/admin/photos?currentPage=${currentPage}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${session?.token}`,
      },
    },
  );
  return (
    <MainLayout>
      <Client data={data.data} token={session?.token} />
    </MainLayout>
  );
}
