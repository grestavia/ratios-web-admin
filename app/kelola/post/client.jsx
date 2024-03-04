"use client";
import React, { useState } from "react";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import {
  ArrowPathIcon,
  PhotoIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Modal from "@/components/modal";
import { NEXT_PUBLIC_API_RATIO } from "@/environment";
import Image from "next/image";
import moment from "moment";
import axios from "axios";
import { useRouter } from "next/navigation";

async function getDetailPost(postId, token) {
  const get = await axios.get(
    `${NEXT_PUBLIC_API_RATIO}/admin/photos/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return get.data;
}

export default function Client({ data, token }) {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  console.log(data);

  async function deletePost(postId, token) {
    setIsLoading(true);
    await axios.delete(`${NEXT_PUBLIC_API_RATIO}/admin/photos/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setIsLoading(false);
  }

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
                  <p className="text-sm">Jumlah Postingan</p>
                </div>
                <h1 className="text-3xl font-medium">
                  {data?.data?.data?.length}
                </h1>
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
                <TableColumn>Judul</TableColumn>
                <TableColumn>Deskripsi</TableColumn>
                <TableColumn>Pengunggah</TableColumn>
                <TableColumn>Terakhir diupdate</TableColumn>
              </TableHeader>
              <TableBody>
                {data?.data.data.map((item, index) => (
                  <TableRow
                    key={index}
                    onClick={async () => {
                      const data = await getDetailPost(item?.id, token);
                      setDetail(data);
                      setOpen(true);
                    }}
                  >
                    <TableCell>{++index}</TableCell>
                    <TableCell>{item?.title}</TableCell>
                    <TableCell>
                      <div className="line-clamp-2 max-w-xl">
                        {item?.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img
                          width={30}
                          height={30}
                          src={`${NEXT_PUBLIC_API_RATIO}/files/images/profiles/${item?.user.photoUrl}`}
                          alt="profile"
                          className="rounded-full border"
                        />
                        <div>
                          <h6 className="font-semibold">
                            {item?.user?.username}
                          </h6>
                          <p className="text-xs text-slate-600">
                            {item?.user?.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {moment(item?.updatedAt).format("MMMM Do YYYY")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mb-4 flex w-full justify-end px-5">
              <Pagination
                total={data?.data?.total_all_page}
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
        <div className="relative mx-auto w-full max-w-5xl rounded-xl bg-white p-5 text-left">
          <button
            className="absolute right-5 aspect-square rounded-full p-2 hover:bg-slate-200"
            onClick={() => {
              setOpen(false);
              setDetail(null);
            }}
          >
            <XMarkIcon width={20} height={20} />
          </button>
          <h1 className="text-xl font-semibold">Detail Postingan</h1>
          <hr className="my-3" />
          <div className="mb-2 flex gap-4">
            <div>
              <div className="relative aspect-square h-80 w-80 overflow-hidden rounded-xl border">
                <img
                  src={`${NEXT_PUBLIC_API_RATIO}/files/images/photos/${detail?.data?.locationFile}`}
                  alt="image"
                  fill
                  objectFit="contain"
                />
              </div>
            </div>
            <div className="w-full">
              <table className="w-full [&>*]:text-sm">
                <tbody>
                  <tr>
                    <td>ID</td>
                    <td>:</td>
                    <td>
                      <input
                        type="text"
                        disabled
                        className="w-full rounded-xl border p-2"
                        value={detail?.data?.id}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Judul</td>
                    <td>:</td>
                    <td>
                      <input
                        type="text"
                        disabled
                        className="w-full rounded-xl border p-2"
                        value={detail?.data?.title}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Deskripsi</td>
                    <td>:</td>
                    <td>
                      <textarea
                        name=""
                        id=""
                        className="w-full rounded-xl border p-2"
                        disabled
                        value={detail?.data?.description}
                      ></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td>Jumlah like</td>
                    <td>:</td>
                    <td>
                      <input
                        type="text"
                        disabled
                        className="w-full rounded-xl border p-2"
                        value={detail?.data?.likes?.length}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Jumlah komentar</td>
                    <td>:</td>
                    <td>
                      <input
                        type="text"
                        disabled
                        className="w-full rounded-xl border p-2"
                        value={detail?.data?.comentars?.length}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Dibuat oleh userId</td>
                    <td>:</td>
                    <td>
                      <input
                        type="text"
                        disabled
                        className="w-full rounded-xl border p-2"
                        value={detail?.data?.user?.id}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Dibuat pada</td>
                    <td>:</td>
                    <td>
                      <input
                        type="text"
                        disabled
                        className="w-full rounded-xl border p-2"
                        value={moment(detail?.data?.createdAt).format(
                          "MMMM Do YYYY, h:mm:ss a",
                        )}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Terakhir diupdate</td>
                    <td>:</td>
                    <td>
                      <input
                        type="text"
                        disabled
                        className="w-full rounded-xl border p-2"
                        value={moment(detail?.data?.updatedAt).format(
                          "MMMM Do YYYY, h:mm:ss a",
                        )}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2 text-white"
              onClick={async () => {
                await deletePost(detail?.data?.id, token);
                setOpen(false);
                setDetail(null);
              }}
            >
              {isLoading ? (
                <ArrowPathIcon
                  width={20}
                  height={20}
                  className="animate-spin"
                />
              ) : (
                <>
                  <TrashIcon width={18} height={18} />
                  <p>Hapus</p>
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
