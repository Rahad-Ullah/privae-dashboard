import { ArrowUpRight } from 'lucide-react';

export type Props = {
  title: string;
  value: string;
  growth: string;
}

export default function KpiRight({analytic}:{analytic:Props}) {

  return (
    <div className="w-full px-3 py-3 bg-[#F2F2F2] rounded-lg font-sans text-neutral-700 shadow-sm flex flex-col justify-between">
      <div>
        {/* Header */}
        <h3 className="text-neutral-400 text-sm xl:text-base mb-1">
          {analytic.title}
        </h3>

        {/* Main Value */}
        <div className="text-xl text-neutral-700 font-bold tracking-tight mb-1">
          {analytic.value}
        </div>
      </div>

      {/* Growth Metric */}
      <div className="flex xl:items-center gap-1 mt-auto">
        <div className="flex items-center">
          <ArrowUpRight className="text-green-500 w-3 xl:w-4 h-3 xl:h-4" strokeWidth={1} />
          <span className="text-green-500 text-[10px] xl:text-xs">{analytic.growth}</span>
        </div>
        <span className="text-neutral-600 text-[10px] xl:text-xs">higher than last week</span>
      </div>
    </div>
  );
}