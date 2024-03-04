"use client";
import { NEXT_PUBLIC_API_RATIO } from "@/environment";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import moment from "moment";
import Image from "next/image";
import React from "react";

export default function Client({ data }) {
  return (
    <>
      <section className="w-full px-4 py-2">
        <div className="mb-5">
          <h1 className="mb-2 text-xl font-medium">Penarikan</h1>
          <div className="grid grid-cols-4 gap-4">
            <article className="rounded-lg border bg-white px-4 py-2 shadow-sm">
              <div className="mb-2 flex items-center gap-2">
                <UserGroupIcon width={24} height={24} />
                <p className="text-sm">Donasi</p>
              </div>
              <h1 className="text-3xl font-medium">
                Rp. {data.data?.reduce((a, b) => a + b?.amount, 0)}
              </h1>
            </article>
            <article className="rounded-lg border bg-white px-4 py-2 shadow-sm">
              <div className="mb-2 flex items-center gap-2">
                <UserGroupIcon width={24} height={24} />
                <p className="text-sm">Admin Fee</p>
              </div>
              <h1 className="text-3xl font-medium">
                Rp.{" "}
                {data.data
                  ?.filter((item) => item?.status == "SUCCESS")
                  .reduce((a, b) => a + b?.adminFee?.amount, 0)}
              </h1>
            </article>
            <article className="rounded-lg border bg-white px-4 py-2 shadow-sm">
              <div className="mb-2 flex items-center gap-2">
                <UserGroupIcon width={24} height={24} />
                <p className="text-sm">Total</p>
              </div>
              <h1 className="text-3xl font-medium">
                Rp.{" "}
                {parseInt(
                  data.data?.reduce((a, b) => a + b?.adminFee?.amount, 0),
                ) + parseInt(data.data?.reduce((a, b) => a + b?.amount, 0))}
              </h1>
            </article>
          </div>
        </div>
        <div className="rounded-lg border bg-white px-2 py-4 shadow-sm [&>*]:text-sm">
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
              <TableColumn>User</TableColumn>
              <TableColumn>Donasi</TableColumn>
              <TableColumn>Admin Fee</TableColumn>
              <TableColumn>Total</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Terakhir diupdate</TableColumn>
            </TableHeader>
            <TableBody>
              {data?.data?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{++index}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img
                        width={30}
                        height={30}
                        src={`${NEXT_PUBLIC_API_RATIO}/files/images/profiles/${item?.user?.photoUrl}`}
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
                  <TableCell className="max-w-xl text-ellipsis p-2">
                    Rp. {item?.amount}
                  </TableCell>
                  <TableCell>Rp. {item?.adminFee?.amount}</TableCell>
                  <TableCell>
                    {parseInt(item?.amount) + parseInt(item?.adminFee?.amount)}
                  </TableCell>
                  <TableCell>
                    {item?.status == "SUCCESS" && (
                      <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">
                        {item?.status}
                      </span>
                    )}
                    {item?.status == "PENDING" && (
                      <span className="rounded-full bg-slate-500 px-3 py-1 text-xs font-medium text-white">
                        {item?.status}
                      </span>
                    )}
                    {item?.status == "FAILED" && (
                      <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-medium text-white">
                        {item?.status}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {moment(item?.data?.updatedAt).format("MMMM Do YYYY")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  );
}
