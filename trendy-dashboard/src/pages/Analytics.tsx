import { BarChart2, TrendingUp } from 'lucide-react';

export default function Analytics() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BarChart2 className="text-rose-500" />
          Trends & Performance
        </div>
        <div className="h-40 flex flex-col items-center justify-center text-gray-400">
          [Chart Placeholder]
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <div className="text-lg font-semibold mb-3 flex items-center gap-2">
          <TrendingUp className="text-rose-400" />
          Top Products
        </div>
        <ol className="list-decimal pl-6 text-gray-700">
          <li>Sneakers - $1200 sales</li>
          <li>Canvas Bag - $900 sales</li>
          <li>Leather Belt - $450 sales</li>
        </ol>
      </div>
    </div>
  );
}
