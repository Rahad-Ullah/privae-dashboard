import { ColumnDef } from "@tanstack/react-table"
import {  ICustomer} from "@/types/columnTypes";

export const chefColumns: ColumnDef<ICustomer>[] = [
  {
    accessorKey: "userId",
    header: () => <div className="ps-2">Chef ID</div>,
    cell: ({ row }) => (
      <div className="capitalize ps-2">{row.getValue("userId")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: () => <div className="">Name</div>,
    cell: ({ row }) => (
      <div className="">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div className="">Email</div>,
    cell: ({ row }) => (
      <div className="">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: () => <div className="">Phone</div>,
    cell: ({ row }) => (
      <div className="">{row.getValue("phone")}</div>
    ),
  },
  {
    accessorKey: "area",
    header: () => <div className="">Area</div>,
    cell: ({ row }) => (
      <div className="">{row.getValue("area")}</div>
    ),
  },
  {
    accessorKey: "bookings",
    header: () => <div className="">Bookings</div>,
    cell: ({ row }) => (
      <div className="">{row.getValue("bookings")}</div>
    ),
  },
  {
    accessorKey: "rating",
    header: () => <div className="">Rating</div>,
    cell: ({ row }) => {
      const rating: { score: number; reviews: number; } = row.getValue("rating");
      return (
      <div className="">{rating?.score}({rating?.reviews} reviews)</div>
    )
    },
  },
  {
    accessorKey: "lastBooking",
    header: () => <div className="">Last Booking</div>,
    cell: ({ row }) => (
      <div className="">{row.getValue("lastBooking")}</div>
    ),
  },
]