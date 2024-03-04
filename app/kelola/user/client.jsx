"use client";

import React, { useEffect } from "react";
import { PhotoIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useState } from "react";
import Modal from "@/components/modal";
import Image from "next/image";
import { NEXT_PUBLIC_API_RATIO } from "@/environment";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import moment from "moment";

async function getDetailUser(userId, token) {
  const get = await axios.get(
    `${NEXT_PUBLIC_API_RATIO}/admin/users/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return get.data;
}

async function deleteUser(userId, token) {
  try {
    const get = await axios.delete(
      `${NEXT_PUBLIC_API_RATIO}/admin/${userId}/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return true;
  } catch (e) {
    return false;
  }
}

export default function Client({ data, token }) {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [] = useState(data);

  useEffect(() => {
    return () => { };
  }, []);

  return (
    <>
      <section className="w-full px-4 py-2">
        <h1 className="mb-5 text-xl font-semibold">Kelola Postingan</h1>
        <div className="w-full">
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <article
                key={index}
                className="rounded-lg border bg-white px-4 py-2 shadow-sm"
              >
                <div className="mb-2 flex items-center gap-2">
                  <PhotoIcon width={24} height={24} />
                  <p className="text-sm">Jumlah User</p>
                </div>
                <h1 className="text-3xl font-medium">{data?.data?.length}</h1>
              </article>
            ))}
          </div>
          <div className="mt-10 w-full rounded-xl border bg-white [&>*]:text-sm">
            <Table
              classNames={{
                th: [
                  "first:rounded-l-lg",
                  "bg-primary",
                  "text-white",
                  "last:rounded-r-lg",
                  "py-2",
                  "px-4",
                  "text-left",
                ],
                td: ["px-4", "py-2", "last:rounded-r-lg", "first:rounded-l-lg"],
                tr: ["hover:bg-tertiary/70", "cursor-pointer"],
              }}
            >
              <TableHeader>
                <TableColumn width={20}>No</TableColumn>
                <TableColumn>Akun</TableColumn>
                <TableColumn>Nama Lengkap</TableColumn>
                <TableColumn>Alamat</TableColumn>
                <TableColumn>Role</TableColumn>
              </TableHeader>
              <TableBody>
                {data?.data.map((item, index) => (
                  <TableRow
                    key={index}
                    onClick={async () => {
                      const data = await getDetailUser(item?.id, token);
                      setDetail(data);
                      console.log(detail);
                      setOpen(true);
                    }}
                  >
                    <TableCell>{++index}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img
                          width={30}
                          height={30}
                          src={`${NEXT_PUBLIC_API_RATIO}/files/images/profiles/${item.photoUrl}`}
                          alt="profile"
                          className="rounded-full border"
                        />
                        <div>
                          <h6 className="font-semibold">{item?.username}</h6>
                          <p className="text-xs text-slate-600">
                            {item?.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xl text-ellipsis">
                      {item?.fullName}
                    </TableCell>
                    <TableCell>{item?.address}</TableCell>
                    <TableCell>{item?.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mb-4 flex w-full justify-end px-5">
              <Pagination
                total={data?.total_all_page}
                initialPage={1}
                classNames={{
                  item: "p-2 w-8 h-8 rounded-lg bg-primary text-white",
                  wrapper: "gap-2",
                  cursor: "bg-slate-500",
                }}
                showControls
                onChange={(page) => router.push(`?currentPage=${page}`)}
              />
            </div>
          </div>
        </div>
      </section>
      <Modal open={open} setOpen={setOpen}>
        <div className="relative mx-auto w-full max-w-2xl rounded-xl bg-white p-5 text-left ">
          <button
            className="absolute right-5 aspect-square rounded-full p-2 hover:bg-slate-200"
            onClick={() => {
              setOpen(false);
              setDetail(null);
            }}
          >
            <XMarkIcon width={20} height={20} />
          </button>
          <h1 className="mb-5 text-xl font-semibold">Detail User</h1>
          <hr className="mb-2" />
          <img
            src={`${NEXT_PUBLIC_API_RATIO}/files/images/profiles/${detail?.data?.photoUrl}`}
            alt="profile"
            width={100}
            height={100}
            className="mb-2 rounded-xl border-2"
          />
          <h1 className="font-medium">{detail?.data?.fullName}</h1>
          <p className="mb-4 text-sm text-slate-600">{detail?.data?.email}</p>
          <table className="mb-5 w-full [&>*]:text-sm [&>tr>td:first-child]:max-w-20 [&>tr>td:first-child]:font-medium">
            <tr className="[&>td]:px-2">
              <td>ID</td>
              <td>:</td>
              <td>
                <input
                  type="text"
                  disabled
                  value={detail?.data?.id}
                  className="w-full rounded-xl border p-2"
                />
              </td>
            </tr>
            <tr className="[&>td]:px-2">
              <td>Username</td>
              <td>:</td>
              <td>
                <input
                  type="text"
                  disabled
                  value={detail?.data?.username}
                  className="w-full rounded-xl border p-2"
                />
              </td>
            </tr>
            <tr className="[&>td]:px-2">
              <td>Alamat</td>
              <td>:</td>
              <td>
                <input
                  type="text"
                  disabled
                  value={detail?.data?.address}
                  className="w-full rounded-xl border p-2"
                />
              </td>
            </tr>

            <tr className="[&>td]:px-2">
              <td>Role</td>
              <td>:</td>
              <td>
                <input
                  type="text"
                  disabled
                  value={detail?.data?.role}
                  className="w-full rounded-xl border p-2"
                />
              </td>
            </tr>
            <tr className="[&>td]:px-2">
              <td>Unggahan</td>
              <td>:</td>
              <td>
                <input
                  type="text"
                  disabled
                  value={detail?.data?._count?.photos}
                  className="w-full rounded-xl border p-2"
                />
              </td>
            </tr>
            <tr className="[&>td]:px-2">
              <td>Dibuat pada</td>
              <td>:</td>
              <td>
                <input
                  type="text"
                  disabled
                  value={moment(detail?.data?.createdAt).format(
                    "MMMM Do YYYY, h:mm:ss a",
                  )}
                  className="w-full rounded-xl border p-2"
                />
              </td>
            </tr>
            <tr className="[&>td]:px-2">
              <td>Terakhir diupdate</td>
              <td>:</td>
              <td>
                <input
                  type="text"
                  disabled
                  value={moment(detail?.data?.updatedAt).format(
                    "MMMM Do YYYY, h:mm:ss a",
                  )}
                  className="w-full rounded-xl border p-2"
                />
              </td>
            </tr>
            <tr className="[&>td]:px-2">
              <td>Status</td>
              <td>:</td>
              <td>
                <input
                  type="text"
                  disabled
                  value={detail?.data?.isDeleted}
                  className="w-full rounded-xl border p-2"
                />
              </td>
            </tr>
          </table>
          <div className="flex justify-end gap-2 text-sm">
            <button
              className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2 text-white"
              onClick={async () => {
                await deleteUser(detail?.data?.id, token);
                setOpen(false);
                setDetail(null);
              }}
            >
              <TrashIcon width={18} height={18} />
              <p>Hapus</p>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
