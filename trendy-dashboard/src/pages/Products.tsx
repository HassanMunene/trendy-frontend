import { Boxes, Plus, Pencil, Camera, Trash2, Search } from "lucide-react";

export default function Products() {
  const products = [
    { id: 1, name: "Sneakers", category: "Shoes", stock: 3, price: 75, status: "almost-out" },
    { id: 2, name: "Leather Belt", category: "Accessories", stock: 24, price: 45, status: "ok" },
    { id: 3, name: "Canvas Bag", category: "Bags", stock: 1, price: 120, status: "almost-out" },
  ];
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
        <h1 className="text-2xl font-bold flex gap-2 items-center text-rose-700 dark:text-rose-300">
          <Boxes /> Products
        </h1>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex items-center rounded-md bg-white/80 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-2">
            <Search className="text-gray-400" size={18} />
            <input
              className="bg-transparent pl-2 py-1 outline-none text-sm w-32 sm:w-44 focus:w-48 transition-all text-gray-800 dark:text-gray-200"
              placeholder="Search products..."
            />
          </div>
          <select className="bg-white/80 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md text-sm px-2 py-1 text-gray-600 dark:text-gray-300">
            <option value="">Status: All</option>
            <option value="almost-out">Almost out</option>
            <option value="ok">OK</option>
          </select>
          <button className="flex gap-2 items-center bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg shadow transition">
            <Plus /> Add Product
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white/90 dark:bg-gray-900 rounded-xl min-w-[500px] shadow border border-gray-200 dark:border-gray-800">
          <thead>
            <tr className="text-left bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-200 text-sm">
              <th className="py-2 px-3">Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className="border-b dark:border-gray-800 last:border-none hover:bg-rose-50/30 dark:hover:bg-rose-900/10 transition"
              >
                <td className="py-2 px-3 font-medium text-gray-900 dark:text-white">
                  {p.name}
                </td>
                <td className="text-gray-600 dark:text-gray-200">{p.category}</td>
                <td>
                  <span
                    className={
                      p.stock <= 3
                        ? "text-rose-500 font-bold"
                        : "text-gray-700 dark:text-gray-200"
                    }
                  >
                    {p.stock}
                  </span>
                </td>
                <td>${p.price}</td>
                <td>
                  {p.stock <= 3 ? (
                    <span className="bg-rose-100 dark:bg-rose-900 text-rose-600 dark:text-rose-400 rounded-full px-2 py-0.5 text-xs">
                      Almost out
                    </span>
                  ) : (
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full px-2 py-0.5 text-xs">
                      OK
                    </span>
                  )}
                </td>
                <td className="flex gap-2">
                  <button className="text-rose-400 hover:text-rose-600">
                    <Pencil size={16} />
                  </button>
                  <button className="text-rose-400 hover:text-rose-600">
                    <Camera size={16} />
                  </button>
                  <button className="text-gray-400 hover:text-rose-500">
                    <Trash2 size={16} />
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
