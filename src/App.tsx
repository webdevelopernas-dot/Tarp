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
  ExternalLink,
  Lock,
  Save,
  LogOut,
  Edit3,
  Plus,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock Data for Admin Dashboard (Static for now, but could be dynamic)
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
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'cms', name: 'CMS Editor', icon: Edit3 },
  { id: 'orders', name: 'Orders', icon: ShoppingBag },
  { id: 'products', name: 'Products', icon: Package },
  { id: 'customers', name: 'Customers', icon: Users },
  { id: 'settings', name: 'Settings', icon: Settings },
];

export default function App() {
  const [view, setView] = useState<'landing' | 'login' | 'admin'>('landing');
  const [adminTab, setAdminTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [cmsData, setCmsData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch('/api/cms')
      .then(res => res.json())
      .then(data => setCmsData(data));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      const data = await res.json();
      if (data.success) {
        setView('admin');
      } else {
        setLoginError(data.message);
      }
    } catch (err) {
      setLoginError('Login failed. Please try again.');
    }
  };

  const saveCmsData = async () => {
    setIsSaving(true);
    try {
      await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cmsData)
      });
      alert('CMS Data saved successfully!');
    } catch (err) {
      alert('Failed to save CMS data.');
    } finally {
      setIsSaving(false);
    }
  };

  if (view === 'landing') {
    return <LandingPage onGoToDashboard={() => setView('login')} cmsData={cmsData} />;
  }

  if (view === 'login') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <Card className="border-none shadow-2xl">
            <CardHeader className="space-y-1 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Lock className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
              <p className="text-sm text-slate-500">Enter your credentials to access the CMS</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <Input 
                    required
                    value={loginData.username}
                    onChange={e => setLoginData({ ...loginData, username: e.target.value })}
                    placeholder="admin" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <Input 
                    required
                    type="password" 
                    value={loginData.password}
                    onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                    placeholder="••••••••" 
                  />
                </div>
                {loginError && <p className="text-xs font-medium text-rose-500">{loginError}</p>}
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Sign In
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => setView('landing')}
                >
                  Back to Site
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
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
            <button
              key={item.id}
              onClick={() => setAdminTab(item.id)}
              className={`
                flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                ${adminTab === item.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
              `}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </button>
          ))}
          <div className="my-4 border-t border-slate-800" />
          <button
            onClick={() => setView('landing')}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <ExternalLink className="h-5 w-5" />
            View Site
          </button>
          <button
            onClick={() => setView('landing')}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-rose-400 transition-colors hover:bg-rose-900/20 hover:text-rose-300"
          >
            <LogOut className="h-5 w-5" />
            Logout
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
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm lg:px-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input 
                placeholder="Search..." 
                className="w-64 rounded-full border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm focus:border-blue-500"
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
          {adminTab === 'dashboard' && (
            <>
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
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
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
                      {RECENT_ORDERS.map((order) => (
                        <tr key={order.id} className="group hover:bg-slate-50 transition-colors">
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {adminTab === 'cms' && cmsData && (
            <div className="max-w-4xl">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">CMS Editor</h1>
                  <p className="text-slate-500">Modify the landing page content in real-time.</p>
                </div>
                <Button 
                  onClick={saveCmsData} 
                  disabled={isSaving}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>

              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Hero Section</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Badge Text</label>
                      <Input 
                        value={cmsData.hero.badge} 
                        onChange={e => setCmsData({ ...cmsData, hero: { ...cmsData.hero, badge: e.target.value } })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Main Title</label>
                      <Input 
                        value={cmsData.hero.title} 
                        onChange={e => setCmsData({ ...cmsData, hero: { ...cmsData.hero, title: e.target.value } })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <textarea 
                        className="w-full rounded-lg border border-slate-200 bg-transparent p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        rows={3}
                        value={cmsData.hero.description} 
                        onChange={e => setCmsData({ ...cmsData, hero: { ...cmsData.hero, description: e.target.value } })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Primary CTA</label>
                        <Input 
                          value={cmsData.hero.primaryCta} 
                          onChange={e => setCmsData({ ...cmsData, hero: { ...cmsData.hero, primaryCta: e.target.value } })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Secondary CTA</label>
                        <Input 
                          value={cmsData.hero.secondaryCta} 
                          onChange={e => setCmsData({ ...cmsData, hero: { ...cmsData.hero, secondaryCta: e.target.value } })}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Stats Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {cmsData.stats.map((stat: any, i: number) => (
                      <div key={i} className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Label</label>
                          <Input 
                            value={stat.label} 
                            onChange={e => {
                              const newStats = [...cmsData.stats];
                              newStats[i].label = e.target.value;
                              setCmsData({ ...cmsData, stats: newStats });
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Value</label>
                          <Input 
                            value={stat.value} 
                            onChange={e => {
                              const newStats = [...cmsData.stats];
                              newStats[i].value = e.target.value;
                              setCmsData({ ...cmsData, stats: newStats });
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {adminTab === 'products' && cmsData && (
            <div className="max-w-6xl">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Product Management</h1>
                  <p className="text-slate-500">Add, edit, or remove products from your catalog.</p>
                </div>
                <Button 
                  onClick={() => {
                    const newProduct = {
                      id: `prod-${Date.now()}`,
                      name: "New Product",
                      description: "",
                      price: "0.00",
                      stock: "0",
                      image: "https://picsum.photos/seed/new/400/400"
                    };
                    const newCmsData = { ...cmsData, products: [...(cmsData.products || []), newProduct] };
                    setCmsData(newCmsData);
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Product
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Product List Table */}
                <div className="lg:col-span-2">
                  <Card className="overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            <th className="px-6 py-4">Product</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Stock</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {(cmsData.products || []).map((product: any, index: number) => (
                            <tr key={product.id} className="group hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="h-10 w-10 rounded-lg object-cover"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="overflow-hidden">
                                    <p className="truncate text-sm font-medium text-slate-900">{product.name}</p>
                                    <p className="truncate text-xs text-slate-500">{product.id}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm font-semibold text-slate-900">${product.price}</td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  parseInt(product.stock) < 5 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                                }`}>
                                  {product.stock} in stock
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => {
                                      const newProducts = cmsData.products.filter((p: any) => p.id !== product.id);
                                      setCmsData({ ...cmsData, products: newProducts });
                                    }}
                                    className="text-rose-500 hover:bg-rose-50 hover:text-rose-600"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </div>

                {/* Edit Form (Simple for now, editing the last added or selected) */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Edit Product Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {cmsData.products && cmsData.products.length > 0 ? (
                        <>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Product Name</label>
                            <Input 
                              value={cmsData.products[cmsData.products.length - 1].name} 
                              onChange={e => {
                                const newProducts = [...cmsData.products];
                                newProducts[newProducts.length - 1].name = e.target.value;
                                setCmsData({ ...cmsData, products: newProducts });
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <textarea 
                              className="w-full rounded-lg border border-slate-200 bg-transparent p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                              rows={4}
                              value={cmsData.products[cmsData.products.length - 1].description} 
                              onChange={e => {
                                const newProducts = [...cmsData.products];
                                newProducts[newProducts.length - 1].description = e.target.value;
                                setCmsData({ ...cmsData, products: newProducts });
                              }}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Price ($)</label>
                              <Input 
                                type="number"
                                value={cmsData.products[cmsData.products.length - 1].price} 
                                onChange={e => {
                                  const newProducts = [...cmsData.products];
                                  newProducts[newProducts.length - 1].price = e.target.value;
                                  setCmsData({ ...cmsData, products: newProducts });
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Stock</label>
                              <Input 
                                type="number"
                                value={cmsData.products[cmsData.products.length - 1].stock} 
                                onChange={e => {
                                  const newProducts = [...cmsData.products];
                                  newProducts[newProducts.length - 1].stock = e.target.value;
                                  setCmsData({ ...cmsData, products: newProducts });
                                }}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Image URL</label>
                            <Input 
                              value={cmsData.products[cmsData.products.length - 1].image} 
                              onChange={e => {
                                const newProducts = [...cmsData.products];
                                newProducts[newProducts.length - 1].image = e.target.value;
                                setCmsData({ ...cmsData, products: newProducts });
                              }}
                            />
                          </div>
                          <Button 
                            onClick={saveCmsData} 
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            disabled={isSaving}
                          >
                            <Save className="mr-2 h-4 w-4" />
                            {isSaving ? 'Saving...' : 'Save Product Changes'}
                          </Button>
                        </>
                      ) : (
                        <p className="text-center text-sm text-slate-500 py-8">No products to edit. Add one to get started.</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
