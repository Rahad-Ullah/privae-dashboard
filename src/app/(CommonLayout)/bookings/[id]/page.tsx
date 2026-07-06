/* eslint-disable @typescript-eslint/no-explicit-any */
// import { dymmySingleBookingData } from "@/datas/bookingData";
import SingleBooking from "./SingleBooking";
import { ChevronRight } from "lucide-react";
import { myFetch } from "@/utils/myFetch";
import BackButton from "@/components/button/BackButton";

const SingleBookingPage = async ({ params }: { params: any }) => {
  const { id } = await params;
  //console.log("Single Booking Id : ", id)
  // const order: any = dymmySingleBookingData;

  const resBooking:any = await myFetch(`/order/${id}`, {
    method: "GET",
    tags: ['Booking']
  })

  //console.log("Booking Details : ", resBooking)

  return (
    <div className="ps-4 xl:ps-6">
      <div className="flex justify-between items-center px-4 pb-8">
        <p className="font-bold text-xl text-gray-800">Booking {resBooking?.data?.order_id}</p>
        <div className="flex items-center gap-1 font-semibold">
          <BackButton>
            <span className="flex items-center text-gray-700">Bookings <ChevronRight className="size-6" /></span>
          </BackButton>
          <span className="text-[#FD713F]">ID {resBooking?.data?.order_id}</span>
        </div>
      </div>
      <SingleBooking order={resBooking?.data} id={id} />
    </div>
  )
}

export default SingleBookingPage;