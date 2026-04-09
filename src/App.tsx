/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  Settings, 
  Search, 
  Bell, 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
  MoreVertical,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import LandingPage from './components/LandingPage';

// Mock Data
const STATS = [
  { 
    label: 'Total Sales', 
    value: '$128,430', 
    trend: '+15.2%', 
    trendUp: true, 
    icon: TrendingUp,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  { 
    label: 'Active Orders', 
    value: '432', 
    trend: '+8.4%', 
    trendUp: true, 
    icon: ShoppingBag,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  },
  { 
    label: 'Low Stock Tarps', 
    value: '12', 
    trend: 'Needs attention', 
    trendUp: false, 
    icon: AlertCircle,
    color: 'text-rose-600',
    bg: 'bg-rose-50'
  },
];

const RECENT_ORDERS = [
  { id: '#ORD-7421', customer: 'Sarah Jenkins', product: 'Heavy Duty Blue Tarp', status: 'Shipped', total: '$89.99' },
  { id: '#ORD-7422', customer: 'Michael Chen', product: 'Clear Vinyl Tarp', status: 'Pending', total: '$145.50' },
  { id: '#ORD-7423', customer: 'Emma Wilson', product: 'Canvas Truck Tarp', status: 'Shipped', total: '$210.00' },
  { id: '#ORD-7424', customer: 'James Rodriguez', product: 'Mesh Shade Tarp', status: 'Processing', total: '$56.25' },
  { id: '#ORD-7425', customer: 'Linda Thompson', product: 'Fire Retardant Tarp', status: 'Shipped', total: '$178.00' },
];

const NAV_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard, active: true },
  { name: 'Orders', icon: ShoppingBag },
  { name: 'Products', icon: Package },
  { name: 'Customers', icon: Users },
  { name: 'Settings', icon: Settings },
];

export default function App() {
  const [view, setView] = useState<'landing' | 'admin'>('landing');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (view === 'landing') {
    return <LandingPage onGoToDashboard={() => setView('admin')} />;
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transition-transform duration-300 lg:static lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex h-16 items-center px-6">
          <span className="text-xl font-bold tracking-tight text-blue-400">Tarp For Less</span>
        </div>
        
        <nav className="mt-4 space-y-1 px-3">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.name}
              href="#"
              className={`
                flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                ${item.active ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
              `}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </a>
          ))}
          <button
            onClick={() => setView('landing')}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <ExternalLink className="h-5 w-5" />
            Public Site
          </button>
        </nav>

        <div className="absolute bottom-0 w-full border-t border-slate-800 p-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">A</div>
            <div className="overflow-hidden">
              <p className="truncate text-sm font-medium">Admin User</p>
              <p className="truncate text-xs text-slate-400">admin@tarpforless.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-bottom border-slate-200 bg-white px-4 shadow-sm lg:px-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search orders, products..." 
                className="w-64 rounded-full border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
              <img 
                src="https://picsum.photos/seed/admin/100/100" 
                alt="Avatar" 
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
            <p className="text-slate-500">Welcome back, here's what's happening today.</p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`rounded-xl ${stat.bg} p-3`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.trendUp ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                    {stat.trend}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
              </motion.div>
            ))}
          </div>

          {/* Recent Orders Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h2 className="text-lg font-bold text-slate-900">Recent Orders</h2>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View all</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {RECENT_ORDERS.map((order, index) => (
                    <motion.tr 
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="group hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-blue-600">{order.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{order.customer}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{order.product}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          order.status === 'Shipped' ? 'bg-emerald-100 text-emerald-700' :
                          order.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900">{order.total}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="rounded-lg p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
