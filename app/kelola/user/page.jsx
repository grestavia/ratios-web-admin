import MainLayout from "@/components/main-layout";
import { NEXT_PUBLIC_API_RATIO } from "@/environment";
import { getSession } from "@/libs/session";
import axios from "axios";
import Client from "./client";

export default async function Page({ searchParams }) {
  const session = await getSession();

  const currentPage = searchParams.currentPage ? searchParams.currentPage : 1;
  const page = searchParams.page ? searchParams.page : 6;

  const data = await axios.get(
    `${NEXT_PUBLIC_API_RATIO}/admin/users?currentPage=${currentPage}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${session?.token}`,
      },
    },
  );

  return (
    <MainLayout>
      <Client data={data.data.data} token={session?.token} />
    </MainLayout>
  );
}
