import { ColumnDef } from "@tanstack/react-table"
import { INotes } from "@/types/columnTypes";
import dayjs from "dayjs";
import { RiEdit2Line } from "react-icons/ri";
import { CustomModal } from "@/components/cui/CustomModal";
import EditChef from "@/app/(CommonLayout)/chefs/[id]/EditChef";

export const noteColumnsChef: ColumnDef<INotes>[] = [
  {
    accessorKey: "updatedAt",
    header: () => <div className="ps-2">Updated at</div>,
    cell: ({ row }) => (
      <div className="capitalize ps-2">{dayjs(row.getValue("updatedAt")).format("DD-MMM-YYYY HH:mm A")}</div>
    ),
  },
  {
    accessorKey: "author",
    header: () => <div className="">Author</div>,
    cell: ({ row }) => (
      <div className="">{row.getValue("author")}</div>
    ),
  },
  {
    accessorKey: "note",
    header: () => <div className="">Note</div>,
    cell: ({ row }) => (
      <div className="">{row.getValue("note")}</div>
    ),
  },
  {
    id: "action",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <CustomModal trigger={<RiEdit2Line onClick={() => console.log("Note Id : ", row.original.id)} className="size-6 cursor-pointer text-gray-600" />} title={"Add Note"} >
          <EditChef id={row.original.id} notes={row.original.note} />
        </CustomModal>
      </div>
    ),
  }
]