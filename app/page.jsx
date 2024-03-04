import MainLayout from "@/components/main-layout";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Home() {
  return (
    <MainLayout>
      <section className="w-full">
        <header className="mb-5 w-full">
          <div className="flex w-full justify-end border-b border-slate-200 bg-white px-4 py-2 shadow-sm">
            <div className="flex h-full items-center gap-4">
              <Image
                src={"/default-profile.jpg"}
                alt="profile"
                width={70}
                height={70}
                className="h-11 w-11 rounded-full"
              />
              <div>
                <h6 className="text-sm font-medium">Admin</h6>
                <p className="text-xs">admin@ratio.com</p>
              </div>
            </div>
          </div>
        </header>
        <div className="px-4">
          <div className="w-full bg-white">
            <h1 className="mb-2 text-2xl font-semibold">Dashboard</h1>
            <p className="mb-5 max-w-3xl text-sm text-slate-600">
              Kelola dan pantau semua aspek dengan mudah melalui Dashboard
              Ratio. Lihat statistik, laporan, dan kendalikan pengaturan utama
              dalam satu pandangan
            </p>
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => {
                return (
                  <article
                    key={index}
                    className="w-full rounded-lg border bg-white px-4 py-2 shadow-sm"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <UserCircleIcon width={25} height={25} />
                      <h5 className="text-sm">User</h5>
                    </div>
                    <h1 className="text-3xl font-medium">20</h1>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
