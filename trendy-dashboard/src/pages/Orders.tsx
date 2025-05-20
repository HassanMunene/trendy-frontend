import { ShoppingCart, Mail, Search } from "lucide-react";

const orders = [
  { id: 1, buyer: "Jane Doe", email: true, items: "Sneakers", total: "$120", status: "unseen" },
  { id: 2, buyer: "John Smith", email: false, items: "Leather Belt", total: "$45", status: "fulfilled" },
  { id: 3, buyer: "Akua Mensah", email: true, items: "Handbag", total: "$90", status: "unseen" },
];

export default function Orders() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
        <h1 className="text-2xl font-bold flex gap-2 items-center text-rose-700 dark:text-rose-300">
          <ShoppingCart /> Orders
        </h1>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex items-center rounded-md bg-white/80 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-2">
            <Search className="text-gray-400" size={18} />
            <input
              className="bg-transparent pl-2 py-1 outline-none text-sm w-32 sm:w-44 focus:w-48 transition-all text-gray-800 dark:text-gray-200"
              placeholder="Search orders..."
            />
          </div>
          <select className="bg-white/80 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md text-sm px-2 py-1 text-gray-600 dark:text-gray-300">
            <option value="">Status: All</option>
            <option value="unseen">Unseen</option>
            <option value="fulfilled">Fulfilled</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white/90 dark:bg-gray-900 rounded-xl min-w-[400px] shadow border border-gray-200 dark:border-gray-800">
          <thead>
            <tr className="text-left bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-200 text-sm">
              <th className="py-2 px-3">Buyer</th>
              <th>Product</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr
                key={o.id}
                className="border-b dark:border-gray-800 last:border-none hover:bg-rose-50/25 dark:hover:bg-rose-900/10 transition"
              >
                <td className="py-2 px-3 font-medium flex gap-2 items-center text-gray-900 dark:text-white">
                  {o.buyer} {o.email && <Mail size={16} className="text-rose-400" />}
                </td>
                <td className="text-gray-600 dark:text-gray-200">{o.items}</td>
                <td>{o.total}</td>
                <td>
                  {o.status === "unseen" ? (
                    <span className="bg-rose-100 dark:bg-rose-900 text-rose-600 dark:text-rose-300 rounded-full px-2 py-0.5 text-xs font-semibold">
                      Unseen
                    </span>
                  ) : (
                    <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-200 rounded-full px-2 py-0.5 text-xs font-semibold">
                      Fulfilled
                    </span>
                  )}
                </td>
                <td>
                  <button className="px-2 py-1 text-xs bg-rose-500 hover:bg-rose-600 text-white rounded transition font-semibold shadow-md">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
