"use client";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";

export default function Client() {
  return (
    <>
      <section className="w-full px-4 py-2">
        <div className="mb-5">
          <h1 className="mb-2 text-xl font-medium">Penarikan</h1>
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <article
                key={index}
                className="rounded-lg border bg-white px-4 py-2 shadow-sm"
              >
                <div className="mb-2 flex items-center gap-2">
                  <UserGroupIcon width={24} height={24} />
                  <p className="text-sm">Jumlah Penarik</p>
                </div>
                <h1 className="text-3xl font-medium">200</h1>
              </article>
            ))}
          </div>
        </div>
        <div className="rounded-lg border bg-white px-2 py-4  shadow-sm">
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
              <TableColumn width={150}>Tanggal</TableColumn>
              <TableColumn>Username</TableColumn>
              <TableColumn>Metode Pembayaran</TableColumn>
              <TableColumn>Jumlah</TableColumn>
              <TableColumn>Status</TableColumn>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>{++index}</TableCell>
                  <TableCell>Mei, 19 - 2022</TableCell>
                  <TableCell className="max-w-xl text-ellipsis">
                    Nandahah
                  </TableCell>
                  <TableCell>BCA</TableCell>
                  <TableCell>Rp. 100.000</TableCell>
                  <TableCell>
                    <span className="rounded-full bg-red-700 px-3 py-1 text-xs font-medium text-white">
                      belum dicairkan
                    </span>
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
