import { 
  Printer, 
  Search, 
  Menu, 
  ShoppingCart, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  ChevronRight,
  Star,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const CATEGORIES = [
  { name: "Heavy Duty Tarps", count: "120+ Products", image: "https://picsum.photos/seed/heavy/400/300" },
  { name: "Mesh Tarps", count: "85+ Products", image: "https://picsum.photos/seed/mesh/400/300" },
  { name: "Vinyl Tarps", count: "64+ Products", image: "https://picsum.photos/seed/vinyl/400/300" },
  { name: "Clear Tarps", count: "42+ Products", image: "https://picsum.photos/seed/clear/400/300" },
];

const FEATURED_PRODUCTS = [
  { name: "Super Heavy Duty Blue Tarp", price: "$45.99", rating: 5, image: "https://picsum.photos/seed/tarp1/400/400" },
  { name: "Industrial Grade Mesh Tarp", price: "$32.50", rating: 4, image: "https://picsum.photos/seed/tarp2/400/400" },
  { name: "Clear Vinyl Patio Tarp", price: "$58.00", rating: 5, image: "https://picsum.photos/seed/tarp3/400/400" },
  { name: "Canvas Truck Cover", price: "$120.00", rating: 5, image: "https://picsum.photos/seed/tarp4/400/400" },
];

export default function LandingPage({ onGoToDashboard, cmsData }: { onGoToDashboard: () => void, cmsData: any }) {
  // Fallback data if cmsData is not yet loaded
  const hero = cmsData?.hero || {
    badge: "Industrial Grade Quality",
    title: "Premium Tarps Built to Last.",
    description: "The nation's leading supplier of heavy-duty, industrial, and custom-sized tarps. Weather-proof protection for what matters most.",
    primaryCta: "Shop All Products",
    secondaryCta: "Custom Quote"
  };

  const stats = cmsData?.stats || [
    { label: "Quality Guaranteed", desc: "Industrial standards" },
    { label: "Fast Shipping", desc: "Across the nation" },
    { label: "Top Rated", desc: "5,000+ Happy clients" },
    { label: "USA Based", desc: "Support local business" },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Top Bar */}
      <div className="bg-slate-900 py-2 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 text-xs font-medium">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> 1-800-TARP-LESS</span>
            <span className="hidden items-center gap-1 sm:flex"><Mail className="h-3 w-3" /> sales@tarpforless.com</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onGoToDashboard} className="hover:text-blue-400">Admin Login</button>
            <span>Track Order</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-blue-600 p-1.5 text-white">
              <Printer className="h-6 w-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">TARP FOR LESS</span>
          </div>

          <div className="hidden flex-1 px-12 lg:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input 
                placeholder="Search for tarps, sizes, materials..." 
                className="w-full rounded-full border-slate-200 bg-slate-50 pl-10 focus-visible:ring-blue-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden flex-col items-end sm:flex">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Your Cart</span>
              <span className="text-sm font-bold">$0.00</span>
            </div>
            <Button size="icon" variant="ghost" className="relative">
              <ShoppingCart className="h-6 w-6" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 justify-center rounded-full bg-blue-600 p-0">0</Badge>
            </Button>
            <Button size="icon" variant="ghost" className="lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Categories Nav */}
        <nav className="hidden border-t border-slate-50 bg-white lg:block">
          <div className="mx-auto flex max-w-7xl gap-8 px-6 py-3 text-sm font-semibold text-slate-600">
            <a href="#" className="text-blue-600">Home</a>
            <a href="#" className="hover:text-blue-600">All Products</a>
            <a href="#" className="hover:text-blue-600">Heavy Duty</a>
            <a href="#" className="hover:text-blue-600">Mesh</a>
            <a href="#" className="hover:text-blue-600">Vinyl</a>
            <a href="#" className="hover:text-blue-600">Custom Size</a>
            <a href="#" className="hover:text-blue-600">About Us</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden bg-slate-900">
        <img 
          src="https://picsum.photos/seed/industrial/1920/1080" 
          alt="Industrial Tarp" 
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <Badge className="mb-6 bg-blue-600 px-4 py-1 text-sm">{hero.badge}</Badge>
            <h1 className="mb-6 text-5xl font-black leading-tight text-white lg:text-7xl">
              {hero.title.split('Built to Last.')[0]} <br />
              <span className="text-blue-500 text-shadow-sm">Built to Last.</span>
            </h1>
            <p className="mb-8 text-xl text-slate-300">
              {hero.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="h-14 rounded-full bg-blue-600 px-8 text-lg font-bold hover:bg-blue-700">
                {hero.primaryCta}
              </Button>
              <Button size="lg" variant="outline" className="h-14 rounded-full border-white px-8 text-lg font-bold text-white hover:bg-white hover:text-slate-900">
                {hero.secondaryCta}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="border-b border-slate-100 bg-slate-50 py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          {stats.map((item: any, i: number) => (
            <div key={i} className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                {i === 0 && <CheckCircle2 className="h-6 w-6" />}
                {i === 1 && <ShoppingCart className="h-6 w-6" />}
                {i === 2 && <Star className="h-6 w-6" />}
                {i === 3 && <MapPin className="h-6 w-6" />}
              </div>
              <div>
                <p className="text-sm font-bold">{item.label}</p>
                <p className="text-xs text-slate-500">{item.value || item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-black tracking-tight">Shop by Category</h2>
              <p className="text-slate-500">Find the perfect material for your needs</p>
            </div>
            <Button variant="link" className="text-blue-600">View all categories <ChevronRight className="ml-1 h-4 w-4" /></Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="group relative h-80 overflow-hidden rounded-2xl"
              >
                <img src={cat.image} alt={cat.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-400">{cat.count}</p>
                  <h3 className="text-xl font-bold">{cat.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black tracking-tight">Featured Products</h2>
            <p className="text-slate-500">Our most popular industrial solutions</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_PRODUCTS.map((product, i) => (
              <Card key={i} className="overflow-hidden border-none shadow-sm transition-shadow hover:shadow-md">
                <div className="relative aspect-square overflow-hidden">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  <Button size="icon" className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-white text-slate-900 shadow-lg hover:bg-blue-600 hover:text-white">
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <div className="mb-2 flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={`h-3 w-3 ${j < product.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                    ))}
                  </div>
                  <h3 className="mb-1 font-bold text-slate-900">{product.name}</h3>
                  <p className="text-lg font-black text-blue-600">{product.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-[2rem] bg-blue-600 px-8 py-16 text-center text-white lg:px-16 lg:py-24">
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="mb-4 text-4xl font-black">Get 10% Off Your First Order</h2>
              <p className="mb-8 text-blue-100">Subscribe to our newsletter for exclusive deals, new product launches, and industrial tips.</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input 
                  placeholder="Enter your email address" 
                  className="h-14 rounded-full border-none bg-white/20 px-6 text-white placeholder:text-blue-100 focus-visible:ring-white"
                />
                <Button size="lg" className="h-14 rounded-full bg-white px-8 font-bold text-blue-600 hover:bg-blue-50">
                  Subscribe Now
                </Button>
              </div>
            </div>
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/50 blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-700/50 blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 pt-20 pb-10 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 grid gap-12 lg:grid-cols-4">
            <div className="col-span-1 lg:col-span-1">
              <div className="mb-6 flex items-center gap-2">
                <Printer className="h-8 w-8 text-blue-500" />
                <span className="text-2xl font-black tracking-tighter">TARP FOR LESS</span>
              </div>
              <p className="mb-8 text-slate-400">
                The nation's most trusted source for industrial tarps and covers. Quality materials, expert craftsmanship, and unbeatable prices.
              </p>
              <div className="flex gap-4">
                <Button size="icon" variant="outline" className="rounded-full border-slate-700 hover:bg-blue-600 hover:border-blue-600"><Facebook className="h-4 w-4" /></Button>
                <Button size="icon" variant="outline" className="rounded-full border-slate-700 hover:bg-blue-600 hover:border-blue-600"><Twitter className="h-4 w-4" /></Button>
                <Button size="icon" variant="outline" className="rounded-full border-slate-700 hover:bg-blue-600 hover:border-blue-600"><Instagram className="h-4 w-4" /></Button>
              </div>
            </div>
            <div>
              <h4 className="mb-6 text-lg font-bold">Quick Links</h4>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#" className="hover:text-white">Shop All</a></li>
                <li><a href="#" className="hover:text-white">Custom Sizes</a></li>
                <li><a href="#" className="hover:text-white">Bulk Orders</a></li>
                <li><a href="#" className="hover:text-white">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white">Return Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-lg font-bold">Categories</h4>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#" className="hover:text-white">Heavy Duty Tarps</a></li>
                <li><a href="#" className="hover:text-white">Mesh Tarps</a></li>
                <li><a href="#" className="hover:text-white">Vinyl Tarps</a></li>
                <li><a href="#" className="hover:text-white">Clear Tarps</a></li>
                <li><a href="#" className="hover:text-white">Canvas Covers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-lg font-bold">Contact Us</h4>
              <ul className="space-y-4 text-slate-400">
                <li className="flex gap-3"><MapPin className="h-5 w-5 text-blue-500" /> 123 Industrial Way, <br />Chicago, IL 60601</li>
                <li className="flex gap-3"><Phone className="h-5 w-5 text-blue-500" /> 1-800-TARP-LESS</li>
                <li className="flex gap-3"><Mail className="h-5 w-5 text-blue-500" /> sales@tarpforless.com</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between border-t border-slate-800 pt-10 text-sm text-slate-500 md:flex-row">
            <p>© 2026 Tarp For Less. All rights reserved.</p>
            <div className="mt-4 flex gap-8 md:mt-0">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
