import { 
  Printer, 
  Zap, 
  ShieldCheck, 
  Maximize, 
  ArrowRight, 
  CheckCircle2,
  PlayCircle,
  Cpu,
  Layers,
  Droplets
} from 'lucide-react';
import { motion } from 'motion/react';

const FEATURES = [
  {
    title: "Ultra-Fast UV Printing",
    description: "Print up to 120sqm/hr with our proprietary high-frequency print heads.",
    icon: Zap,
  },
  {
    title: "Large Format Capability",
    description: "Supports rolls up to 5 meters wide, perfect for industrial-grade tarps.",
    icon: Maximize,
  },
  {
    title: "Weather-Resistant Ink",
    description: "UV-cured inks that last up to 5 years in extreme outdoor conditions.",
    icon: Droplets,
  },
  {
    title: "Precision Engineering",
    description: "0.01mm accuracy for sharp text and vibrant, photographic quality graphics.",
    icon: Cpu,
  }
];

const SPECS = [
  { label: "Print Width", value: "Up to 5.2m" },
  { label: "Resolution", value: "1440 x 1440 DPI" },
  { label: "Ink Type", value: "Industrial UV-LED" },
  { label: "Media Weight", value: "Up to 150kg rolls" },
];

export default function LandingPage({ onGoToDashboard }: { onGoToDashboard: () => void }) {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Printer className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold tracking-tighter">TARP-TECH</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600">Features</a>
            <a href="#specs" className="text-sm font-medium text-slate-600 hover:text-blue-600">Specifications</a>
            <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-blue-600">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={onGoToDashboard}
              className="text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              Admin Login
            </button>
            <button className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95">
              Order Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600"></span>
                </span>
                New Release: Titan X-500
              </div>
              <h1 className="mb-6 text-5xl font-extrabold leading-[1.1] tracking-tight lg:text-7xl">
                The Future of <span className="text-blue-600">Industrial</span> Tarp Printing.
              </h1>
              <p className="mb-8 text-lg text-slate-600 lg:text-xl">
                Meet the Titan X-500. Engineered for high-volume production, extreme durability, and unmatched precision. Print larger, faster, and better.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-slate-800 hover:shadow-xl">
                  Get a Quote <ArrowRight className="h-5 w-5" />
                </button>
                <button className="flex items-center gap-2 rounded-full border border-slate-200 px-8 py-4 text-lg font-bold transition-all hover:bg-slate-50">
                  <PlayCircle className="h-5 w-5" /> Watch Demo
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-[2rem] bg-blue-100/50 blur-3xl"></div>
              <img 
                src="https://picsum.photos/seed/printer/800/600" 
                alt="Industrial Printer" 
                className="relative rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-6 shadow-xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-emerald-100 p-2 text-emerald-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">99.9% Uptime</p>
                    <p className="text-xs text-slate-500">Industrial reliability</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight lg:text-4xl">Built for Performance</h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              The Titan X-500 combines cutting-edge hardware with intelligent software to deliver the most efficient printing experience in the industry.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-6 inline-flex rounded-xl bg-blue-50 p-3 text-blue-600">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section id="specs" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-3xl bg-slate-900 p-8 text-white lg:p-16">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 text-3xl font-bold lg:text-4xl">Technical Specifications</h2>
                <p className="mb-12 text-slate-400">
                  Detailed breakdown of the Titan X-500's capabilities. Designed to meet the highest standards of industrial production.
                </p>
                <div className="grid gap-6 sm:grid-cols-2">
                  {SPECS.map((spec) => (
                    <div key={spec.label} className="border-l-2 border-blue-600 pl-4">
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{spec.label}</p>
                      <p className="text-lg font-semibold">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-64 w-64 lg:h-96 lg:w-96">
                  <div className="absolute inset-0 animate-pulse rounded-full bg-blue-600/20 blur-3xl"></div>
                  <div className="relative flex h-full w-full items-center justify-center rounded-full border-2 border-slate-800">
                    <Printer className="h-32 w-32 text-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-3xl bg-blue-600 px-8 py-16 text-center text-white lg:px-16 lg:py-24">
            <div className="relative z-10">
              <h2 className="mb-6 text-4xl font-extrabold lg:text-5xl">Ready to upgrade your production?</h2>
              <p className="mx-auto mb-10 max-w-2xl text-lg text-blue-100">
                Join hundreds of industrial printing facilities that have already switched to the Titan X-500.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="rounded-full bg-white px-8 py-4 text-lg font-bold text-blue-600 shadow-xl transition-transform hover:scale-105">
                  Contact Sales
                </button>
                <button className="rounded-full border border-blue-400 bg-blue-500/20 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-transform hover:scale-105">
                  Download Brochure
                </button>
              </div>
            </div>
            {/* Background Accents */}
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/50 blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-700/50 blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <Printer className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold tracking-tighter">TARP-TECH</span>
            </div>
            <p className="text-sm text-slate-500">© 2026 Tarp-Tech Industrial. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-slate-500 hover:text-blue-600">Privacy Policy</a>
              <a href="#" className="text-sm text-slate-500 hover:text-blue-600">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
