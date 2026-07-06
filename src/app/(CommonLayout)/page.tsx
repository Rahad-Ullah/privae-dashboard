/* eslint-disable @typescript-eslint/no-explicit-any */
import KpiLeft from "@/components/pages/dashboard/KpiLeft";
import Shapshot from "../../components/pages/dashboard/Shapshot";
import KpiRight from "@/components/pages/dashboard/KpiRight";
import { StepDataType } from "@/types/type";
import CustomStep from "@/components/cui/CustomStep";
import { PopoverDemo } from "@/components/cui/CalenderPopover";
import { myFetch } from "@/utils/myFetch";
import CustomSelectOption from "@/components/cui/CustomSelectOption";
import { selectOptionsDateRange } from "@/constants/SelectOptions";

function toKebabCase(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

export default async function Home({ searchParams }: { searchParams: any }) {
  const { recurring, startDate, endDate, step } = await searchParams;

  const stepDatas: StepDataType[] = [
    { id: 1, title: "Revenue" },
    { id: 2, title: "Gross Margin" },
    { id: 3, title: "Orders" },
    { id: 4, title: "Avg Booking Length" },
    { id: 5, title: "New Users" },
    { id: 6, title: "New Chefs" },
  ];

  const queryParams = new URLSearchParams({
    ...(recurring && recurring !== "Custom" ? { recurring: recurring } : {}),
    ...(recurring === "Custom" && startDate ? { startDate: startDate } : {}),
    ...(recurring === "Custom" && endDate ? { endDate: endDate } : {})
  });

  const resSummary: any = await myFetch(`/admin/summary?${queryParams.toString()}`, { method: "GET" });
  // console.log("Summary : ", resSummary);

  const queryParamsGraph = new URLSearchParams({
    ...(step ? { tags: toKebabCase(step) } : { tags: "revenue" })
  })
  const resGraph = await myFetch(`/admin/summary/graph?${queryParamsGraph.toString()}`, { method: "GET" });
  const grapsValue = resGraph?.data?.map((item: any) => {
    return { label: item?.label, value: item?.value };
  });
  // console.log("Graph : ", resGraph);
  // console.log("Graph : ", grapsValue);

  const formatMoney = (input: string | number): string => {
    // Convert to number (parseFloat handles strings and ignores leading zeros)
    const amount = typeof input === 'string' ? parseFloat(input) : input;

    // Check for invalid numbers
    if (isNaN(amount)) return '$0.00';

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatNumber = (input: string | number, decimals: number = 0): string => {
    const num = typeof input === 'string' ? parseFloat(input) : input;
    if (isNaN(num)) return '0';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  };


  return (
    <div className="px-4 xl:px-6 pb-4">
      <div className="px-2 pb-4 flex items-center gap-3 xl:gap-4">
        <div className=''>
          <CustomSelectOption selectOptions={selectOptionsDateRange} placeHolderValue="Select" queryKey="recurring" />
        </div>
        {recurring === "Custom" && <PopoverDemo />}
      </div>
      <div className="px-2 flex gap-3 xl:gap-4">
        <div className="flex w-60">
          <KpiLeft analytic={{ title: "Total Revenue", value: formatMoney(resSummary?.data?.grossMargin), growth: "9.48%" }} />
        </div>
        <div className="flex-1 grid grid-cols-4 gap-3 xl:gap-4">
          <KpiRight analytic={{ title: "Total Gross Margin", value: formatMoney(resSummary?.data?.grossMargin), growth: "9.48%" }} />
          <KpiRight analytic={{ title: "# of Orders", value: formatNumber(resSummary?.data?.totalOrders, 0), growth: "9.48%" }} />
          <KpiRight analytic={{ title: "# of Users", value: formatNumber(resSummary?.data?.totalUsers, 0), growth: "9.48%" }} />
          <KpiRight analytic={{ title: "# of Chefs", value: formatNumber(resSummary?.data?.totalChef, 0), growth: "9.48%" }} />
          <KpiRight analytic={{ title: "Average Bookings per Week", value: formatNumber(resSummary?.data?.avgBooking, 2), growth: "9.48%" }} />
          <KpiRight analytic={{ title: "Average Revenue per Booking", value: formatMoney(resSummary?.data?.avgRevineue), growth: "9.48%" }} />
          <KpiRight analytic={{ title: "Average Booking Length", value: formatNumber(resSummary?.data?.avgBookingLength, 2), growth: "9.48%" }} />
          <KpiRight analytic={{ title: "Average Dishes per Booking", value: formatNumber(resSummary?.data?.avgDishesPerBooking, 2), growth: "9.48%" }} />
        </div>
      </div>
      <div className="pt-4 space-y-4 px-2">
        <p className="font-bold text-2xl text-gray-800">Snapshot</p>
        <CustomStep stepDatas={stepDatas} status="step" />
        <Shapshot grapsValue={grapsValue} />
      </div>
    </div>
  )
}