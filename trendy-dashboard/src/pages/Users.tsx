import { Users2, UserPlus, Shield, User, Search } from 'lucide-react';

const users = [
  { id: 1, name: 'Alice Admin', role: 'admin', email: 'alice@mail.com' },
  { id: 2, name: 'Bob Operator', role: 'operator', email: 'bob@mail.com' }
];

export default function Users() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
        <h1 className="text-2xl font-bold flex gap-2 items-center text-rose-700 dark:text-rose-300">
          <Users2 /> Users
        </h1>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex items-center rounded-md bg-white/80 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-2">
            <Search className="text-gray-400" size={18} />
            <input
              className="bg-transparent pl-2 py-1 outline-none text-sm w-32 sm:w-44 focus:w-48 transition-all text-gray-800 dark:text-gray-200"
              placeholder="Search users..."
            />
          </div>
          <select className="bg-white/80 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md text-sm px-2 py-1 text-gray-600 dark:text-gray-300">
            <option value="">Role: All</option>
            <option value="admin">Admin</option>
            <option value="operator">Operator</option>
          </select>
          <button className="bg-rose-500 text-white flex gap-2 items-center px-4 py-2 rounded-lg shadow hover:bg-rose-600 transition">
            <UserPlus /> Invite User
          </button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map(u => (
          <div key={u.id} className="bg-white/90 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow flex flex-col gap-2 p-5 items-start transition hover:shadow-lg">
            <div className="flex gap-3 items-center">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900 text-rose-500 dark:text-rose-200 font-bold text-xl"><User /></span>
              <div>
                <div className="text-lg font-semibold text-gray-800 dark:text-white">{u.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-300">{u.email}</div>
              </div>
            </div>
            <span
              className={`mt-2 px-2 py-0.5 text-xs rounded-full font-bold shadow ${
                u.role === 'admin'
                  ? 'bg-rose-600 text-white'
                  : 'bg-black/90 dark:bg-gray-700 text-white'
              }`}
            >
              {u.role.charAt(0).toUpperCase()+u.role.slice(1)}
            </span>
            <button className="text-xs text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 mt-3 underline underline-offset-2 font-medium">Change Role</button>
          </div>
        ))}
      </div>
    </div>
  );
}
