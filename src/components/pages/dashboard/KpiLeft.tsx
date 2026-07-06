import { ArrowUpRight } from 'lucide-react';

export type Props = {
  title: string;
  value: string;
  growth: string;
}

export default function KpiLeft({analytic}:{analytic:Props}) {
  return (
    <div className="w-full h-full px-4 py-4 bg-[#272727] rounded-lg font-sans text-white shadow-xl flex flex-col justify-between">
      <div>
        {/* Header */}
        <h3 className="text-neutral-300 text-lg font-medium mb-2">
          {analytic.title}
        </h3>

        {/* Main Value */}
        <div className="text-2xl font-bold tracking-tight mb-4">
          {analytic.value}
        </div>

        {/* Growth Metric */}
        <div className="flex items-center gap-1 mb-4">
          <ArrowUpRight className="text-green-500 w-5 h-5" strokeWidth={3} />
          <span className="text-green-500 text-sm">{analytic.growth}</span>
          <span className="text-neutral-300 text-sm">higher than last week</span>
        </div>
      </div>

      {/* Sparkline Graph (SVG) */}
      <div className="w-full h-16 mt-auto">
        <svg
          viewBox="0 0 100 50"
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <polyline
            fill="none"
            stroke="#F97316" // Tailwind orange-500
            strokeWidth="1"
            strokeLinejoin="round"
            strokeLinecap="round"
            points="0,35 5,28 10,32 15,22 20,38 25,25 30,30 35,20 40,32 45,28 50,22 55,26 60,18 65,25 70,20 75,10 80,15 85,8 90,12 94,8 100,10"
          />
        </svg>
      </div>
    </div>
  );
}