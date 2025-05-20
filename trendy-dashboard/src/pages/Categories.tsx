import { ListChecks, Plus, Edit2, Trash2, Search } from "lucide-react";

const categories = [
  { id: 1, name: "Shoes", count: 7 },
  { id: 2, name: "Bags", count: 2 },
  { id: 3, name: "Hats", count: 4 },
];

export default function Categories() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
        <h1 className="text-2xl font-bold flex gap-2 items-center text-rose-700 dark:text-rose-300">
          <ListChecks /> Categories
        </h1>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex items-center rounded-md bg-white/80 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-2">
            <Search className="text-gray-400" size={18} />
            <input
              className="bg-transparent pl-2 py-1 outline-none text-sm w-32 sm:w-44 focus:w-48 transition-all text-gray-800 dark:text-gray-200"
              placeholder="Search categories..."
            />
          </div>
          <button className="flex gap-2 items-center bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg shadow transition">
            <Plus /> Add Category
          </button>
        </div>
      </div>
      <div className="flex gap-3 flex-wrap">
        {categories.map(cat => (
          <span
            key={cat.id}
            className="inline-flex items-center gap-2 bg-rose-50 dark:bg-rose-900 text-rose-700 dark:text-rose-200 border border-rose-200 dark:border-rose-900 px-4 py-1 rounded-full font-semibold shadow-inner transition"
          >
            {cat.name}
            <span className="bg-rose-100 dark:bg-rose-700 text-rose-500 dark:text-white px-2 py-0.5 rounded-full text-xs font-bold">
              {cat.count}
            </span>
            <button className="ml-1 text-xs text-rose-400 hover:text-rose-700 dark:hover:text-rose-200"><Edit2 size={14}/></button>
            <button className="ml-1 text-xs text-gray-400 hover:text-rose-600 dark:hover:text-rose-200"><Trash2 size={14}/></button>
          </span>
        ))}
      </div>
    </div>
  );
}
