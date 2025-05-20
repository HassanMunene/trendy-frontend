import { Bell, Mail, ShoppingCart, AlertTriangle, Search } from 'lucide-react';

const notifications = [
  { id: 1, type: 'order', title: 'New Order Received', time: '2m ago', unread: true },
  { id: 2, type: 'message', title: 'Customer Inquiry', time: '5m ago', unread: false },
  { id: 3, type: 'system', title: 'Low Stock Alert', time: '7m ago', unread: true },
];

function getIcon(type: string) {
  switch (type) {
    case 'order': return <ShoppingCart className="text-rose-500" />;
    case 'message': return <Mail className="text-rose-500" />;
    case 'system': return <AlertTriangle className="text-yellow-500" />;
    default: return <Bell />;
  }
}

export default function Notifications() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
        <h1 className="text-2xl font-bold flex gap-2 items-center text-rose-700 dark:text-rose-300">
          <Bell /> Notifications
        </h1>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex items-center rounded-md bg-white/80 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-2">
            <Search className="text-gray-400" size={18} />
            <input
              className="bg-transparent pl-2 py-1 outline-none text-sm w-32 sm:w-44 focus:w-48 transition-all text-gray-800 dark:text-gray-200"
              placeholder="Search notifications..."
            />
          </div>
          <select className="bg-white/80 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md text-sm px-2 py-1 text-gray-600 dark:text-gray-300">
            <option value="">Type: All</option>
            <option value="order">Orders</option>
            <option value="message">Messages</option>
            <option value="system">System</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {notifications.map(n => (
          <div
            key={n.id}
            className={`flex items-center bg-white/90 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800 shadow p-4 gap-4 relative transition hover:ring-2 hover:ring-rose-400/30 ${n.unread ? 'ring-2 ring-rose-500/30' : ''}`}
          >
            <div className="w-8 h-8 flex items-center justify-center">{getIcon(n.type)}</div>
            <div className="flex-1">
              <div className="font-medium text-gray-700 dark:text-white">{n.title}</div>
              <div className="text-xs text-gray-400 dark:text-gray-300">{n.time}</div>
            </div>
            {n.unread && <span className="relative">
              <span className="w-2 h-2 bg-rose-500 rounded-full inline-block animate-pulse" />
              <span className="sr-only">Unread</span>
            </span>}
          </div>
        ))}
      </div>
    </div>
  );
}
