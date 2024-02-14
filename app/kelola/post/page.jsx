'use client'
import MainLayout from "@/components/main-layout";
import { PhotoIcon } from "@heroicons/react/24/outline";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter
} from "@nextui-org/react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useState } from "react";

export default function Page() {

  const [detail, setDetail] = useState(false);

  return (
    <MainLayout>
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
                <h1 className="text-3xl font-medium">200</h1>
              </article>
            ))}
          </div>
          <div className="w-full mt-10 px-5">
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
                <TableColumn>Pengunggah</TableColumn>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 3 }).map((_, index) => (
                  <TableRow key={index} onClick={() => setDetail(true)}>
                    <TableCell>{++index}</TableCell>
                    <TableCell>Movie Poster</TableCell>
                    <TableCell className="max-w-xl text-ellipsis">
                      @grestavia
                    </TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Modal
                  isOpen={detail}
                  scrollBehavior={"inside"}
                  backdrop={"blur"}
                  onClose={() => setDetail(false)}
                >
                  <ModalContent>
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        Mengikuti
                      </ModalHeader>
                      <ModalBody>
                          <>
                            <p>tes</p>
                          </>
                      </ModalBody>
                      <ModalFooter>
                      </ModalFooter>
                    </>
                  </ModalContent>
                </Modal>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
