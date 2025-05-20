import { User, Sun, Moon } from 'lucide-react';

export default function Profile() {
  return (
    <div className="space-y-8 max-w-xl mx-auto pt-8">
      <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
        <div className="w-20 h-20 mb-4 rounded-full bg-rose-100 flex items-center justify-center text-5xl text-rose-500"><User size={64}/></div>
        <div className="text-2xl font-bold mb-2">Your Name</div>
        <div className="text-gray-500 mb-1">Admin</div>
        <div className="text-gray-500 mb-4">you@email.com</div>
        <button className="bg-rose-500 text-white px-4 py-2 rounded shadow font-semibold hover:bg-rose-700 transition">Change Password</button>
      </div>
      <div className="flex justify-center items-center gap-3 mt-6">
        <span className="text-gray-700">Theme:</span>
        <button className="p-2 rounded-full bg-white border hover:bg-rose-100"><Sun className="text-rose-400"/></button>
        <button className="p-2 rounded-full bg-white border hover:bg-rose-100"><Moon className="text-black"/></button>
        <span className="ml-1 text-xs text-gray-500">Toggle Light/Dark</span>
      </div>
    </div>
  );
}
