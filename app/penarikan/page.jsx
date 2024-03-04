import MainLayout from "@/components/main-layout";
import React from "react";
import Client from "./client";
import axios from "axios";
import { getSession } from "@/libs/session";
import { NEXT_PUBLIC_API_RATIO } from "@/environment";
import { data } from "autoprefixer";

export default async function Page() {
  const session = await getSession();
  const donation = await axios.get(`${NEXT_PUBLIC_API_RATIO}/admin/donation`, {
    headers: {
      Authorization: `Bearer ${session?.token}`,
    },
  });
  console.log(donation.data);
  return (
    <MainLayout>
      <Client data={donation.data.data} />
    </MainLayout>
  );
}
