import { BarChart2, ShoppingCart, Boxes, AlertTriangle, Users2 } from "lucide-react";

const cards = [
  {
    icon: <ShoppingCart className="text-white group-hover:text-rose-200 transition" size={32} />,
    label: "New Orders",
    value: 8,
    color: "from-rose-500 to-rose-400 border-rose-400",
  },
  {
    icon: <Boxes className="text-white group-hover:text-indigo-200 transition" size={32} />,
    label: "Total Products",
    value: 124,
    color: "from-indigo-500 to-indigo-400 border-indigo-400",
  },
  {
    icon: <Users2 className="text-white group-hover:text-emerald-200 transition" size={32} />,
    label: "Users",
    value: 52,
    color: "from-emerald-500 to-emerald-400 border-emerald-400",
  },
  {
    icon: <BarChart2 className="text-white group-hover:text-amber-200 transition" size={32} />,
    label: "Revenue",
    value: "$2,350",
    color: "from-amber-500 to-amber-400 border-amber-400",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c, i) => (
          <div
            key={i}
            className={
              `relative rounded-2xl border-t-4 shadow group transition scale-100 hover:scale-[1.027] hover:shadow-lg p-6 dark:bg-gray-900 ${c.color} bg-gradient-to-br text-white overflow-hidden`
            }
          >
            <div className="absolute right-3 top-3 opacity-30 dark:opacity-10 pointer-events-none scale-150">
              {c.icon}
            </div>
            <div className="flex flex-col z-10">
              <span className="text-lg font-semibold tracking-tight text-white/90 drop-shadow-sm mb-2">
                {c.label}
              </span>
              <span className="text-3xl font-bold drop-shadow-lg">{c.value}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/80 dark:bg-gray-900 rounded-2xl shadow-sm p-6 border border-slate-100 dark:border-gray-800">
          <div className="font-semibold mb-4 flex items-center gap-2 text-rose-700 dark:text-rose-300"><ShoppingCart className="text-rose-400" /> Latest Orders</div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-500 dark:text-gray-300 font-normal">
                  <th className="py-2 px-2">Name</th>
                  <th className="py-2 px-2">Product</th>
                  <th className="py-2 px-2">Date</th>
                  <th className="py-2 px-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-800 last:border-none">
                  <td className="py-2 px-2">Jane Doe</td>
                  <td className="py-2 px-2">Sneakers</td>
                  <td className="py-2 px-2">May 12</td>
                  <td><span className="bg-rose-200/80 dark:bg-rose-800 text-rose-700 dark:text-white px-2 py-0.5 rounded-full text-xs">New</span></td>
                </tr>
                <tr className="border-b dark:border-gray-800 last:border-none">
                  <td className="py-2 px-2">John Smith</td>
                  <td className="py-2 px-2">Belt</td>
                  <td className="py-2 px-2">May 11</td>
                  <td><span className="bg-gray-200/60 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-2 py-0.5 rounded-full text-xs">Seen</span></td>
                </tr>
                <tr>
                  <td className="py-2 px-2">Akua Mensah</td>
                  <td className="py-2 px-2">Handbag</td>
                  <td className="py-2 px-2">May 10</td>
                  <td><span className="bg-yellow-100/90 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-100 px-2 py-0.5 rounded-full text-xs">Unseen</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white/80 dark:bg-gray-900 rounded-2xl shadow-sm p-6 border border-slate-100 dark:border-gray-800">
          <div className="font-semibold mb-3 flex items-center gap-2 text-amber-700 dark:text-amber-300"><BarChart2 className="text-amber-400" /> Performance Trends</div>
          <div className="h-36 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
            <svg width="98%" height="80" viewBox="0 0 240 80" fill="none">
              <path d="M 0 70 Q 25 55 45 55 Q 65 55 75 40 Q 95 15 110 30 Q 125 50 145 55 Q 165 60 175 40 Q 190 15 210 30 Q 225 45 240 15" stroke="#fb7185" strokeWidth="3" fill="none" strokeOpacity="0.85" />
              <circle cx="110" cy="30" r="4" fill="#fb7185" />
              <circle cx="75" cy="40" r="4" fill="#fb7185" />
              <circle cx="145" cy="55" r="4" fill="#fb7185" />
              <circle cx="175" cy="40" r="4" fill="#fb7185" />
              <circle cx="210" cy="30" r="4" fill="#fb7185" />
              <circle cx="240" cy="15" r="4" fill="#fb7185" />
            </svg>
            <div className="mt-2 text-xs text-center">Last 7 Days (dummy)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
