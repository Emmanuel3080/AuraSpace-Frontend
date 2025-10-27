import React, { useContext } from "react";
import { adminAuthContext } from "../Context/adminAuthContext";

const Dashboard = () => {
  const { userInfo } = useContext(adminAuthContext);
//   return (
//     <div className="flex min-h-screen bg-gray-50 text-gray-900">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-sm flex flex-col justify-between p-6">
//         <div>
//           {/* Logo */}
//           <div className="flex items-center mb-10">
//             <img
//               src="/logo.png"
//               alt="Logo"
//               className="w-10 h-10 object-contain mr-2"
//             />
//           </div>

//           {/* Navigation */}
//           <nav className="space-y-3">
//             <a
//               href="#"
//               className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 font-medium text-gray-800"
//             >
//               <span>📊</span> Dashboard
//             </a>
//             <a
//               href="#"
//               className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
//             >
//               <span>📅</span> Events
//             </a>
//             <a
//               href="#"
//               className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
//             >
//               <span>💰</span> Wallet
//             </a>
//             <a
//               href="#"
//               className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
//             >
//               <span>⚙️</span> Settings
//             </a>
//           </nav>
//         </div>

//         {/* Footer Links */}
//         <div className="mt-10 space-y-3">
//           <a
//             href="#"
//             className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
//           >
//             <span>🎧</span> Contact
//           </a>
//           <a
//             href="#"
//             className="flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-50"
//           >
//             <span>🚪</span> Logout
//           </a>
//         </div>
//       </aside>

//       <main className="flex-1 p-8 overflow-y-auto">
//         <h1 className="text-2xl font-bold mb-6">HELLO EMMANUEL 👋</h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
//           <div className="bg-indigo-100 p-6 rounded-2xl">
//             <p className="text-gray-600">Account Balance:</p>
//             <h2 className="text-2xl font-bold">₦0.00</h2>
//           </div>
//           <div className="bg-indigo-100 p-6 rounded-2xl">
//             <p className="text-gray-600">Total Events:</p>
//             <h2 className="text-2xl font-bold">1</h2>
//           </div>
//         </div>

//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-semibold">Upcoming Events</h2>
//           <button className="bg-indigo-700 text-white px-6 py-2 rounded-full hover:bg-indigo-800">
//             View All Events
//           </button>
//         </div>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           <div className="bg-white shadow-md rounded-2xl overflow-hidden">
//             <img
//               src="/truck.jpg"
//               alt="Event"
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4"></div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
};

export default Dashboard;
