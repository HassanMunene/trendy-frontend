import { Settings, Upload } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="max-w-xl mx-auto pt-10 space-y-8">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="text-xl font-semibold flex gap-2 items-center mb-4"><Settings className="text-rose-500"/>Store Settings</div>
        <div className="mb-3">
          <label className="block text-gray-700 font-medium">Store Name</label>
          <input value="My Trendy Store" disabled className="w-full mt-1 p-2 border rounded bg-gray-50" />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 font-medium">Contact Email</label>
          <input value="info@trendy.com" disabled className="w-full mt-1 p-2 border rounded bg-gray-50" />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 font-medium">Store Logo</label>
          <div className="mt-1 flex items-center gap-3">
            <span className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">LOGO</span>
            <button className="flex gap-2 items-center px-3 py-1 bg-rose-500 text-white rounded shadow hover:bg-rose-600"><Upload size={16}/>Upload</button>
          </div>
        </div>
        <div className="border-t mt-6 pt-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="accent-rose-500 scale-125" />
            <span className="font-medium text-gray-700">Email me new order notifications</span>
          </label>
        </div>
      </div>
    </div>
  );
}
