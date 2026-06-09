import { SparklesText } from "@/components/ui/sparkles-text";
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import { Spotlight } from "@/components/ui/spotlight";
import { LampContainer } from "@/components/ui/lamp";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { MagicCard } from "@/components/ui/magic-card";
import { Layers, Zap, PenTool, CheckCircle2, Download, ArrowRight } from 'lucide-react';
import { motion } from "framer-motion";

export default function App() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground selection:bg-accent/50 dark overflow-x-hidden font-sans">
      {/* Header Navbar */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/sublify_logo.png" alt="Sublify Logo" className="w-10 h-10 object-contain" />
            <div className="flex flex-col items-center">
              <span className="font-black text-[22px] leading-none" style={{ fontFamily: "'Monument Extended', sans-serif" }}>SUBLIFY</span>
              <span className="text-[10px] text-muted-foreground uppercase font-semibold -mt-0.5">Sublimation Automation</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm pr-4">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="#download" className="text-muted-foreground hover:text-foreground transition-colors">Download</a>
          </nav>
        </div>
      </header>

      {/* 1. Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
        
        {/* Background Effect */}
        <div className="absolute inset-0 z-0">
          <StarsBackground />
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center max-w-4xl px-6 text-center">
          <div className="mb-8 inline-flex items-center justify-center rounded-full border border-border bg-surface px-3 py-1 text-sm font-medium text-primary backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Sublimation Automation
          </div>

          <img src="/sublify_logo.png" alt="Sublify Logo" className="w-40 h-40 md:w-48 md:h-48 mb-6 object-contain" />

          <SparklesText 
            className="text-4xl md:text-6xl font-black text-foreground tracking-[0.1em] drop-shadow-sm mb-1"
            colors={{ first: '#ffffff', second: '#888888' }}
            style={{ fontFamily: "'Monument Extended', sans-serif" }}
          >
            SUBLIFY
          </SparklesText>

          <span className="text-sm md:text-base font-bold tracking-[0.3em] text-muted-foreground mb-12 drop-shadow-sm">AUTOMATE. LAYOUT. PERFECT.</span>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed font-medium">
            The ultimate Photoshop automation toolkit for modern print shops. Batch process jerseys, shorts, and sleeves with zero manual effort.
          </p>

          <div className="z-20 mt-4">
            <a href="https://drive.google.com/file/d/1cBn_YshTpSP1PfTBDaYYylRfVzY592nT/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="group">
              <RainbowButton className="px-8 py-7 text-lg font-bold shadow-2xl flex items-center gap-3">
                <Download className="w-5 h-5 text-white" />
                <span className="text-white">Download for Windows</span>
              </RainbowButton>
            </a>
          </div>
          <p className="text-sm text-muted-foreground mt-4 z-20">Requires Windows 10 or later</p>
        </div>
      </section>

      {/* 2. Features Grid */}
      <section id="features" className="relative w-full py-24 bg-background">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-6xl mx-auto px-6"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Built for Scale</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sublify eliminates the tedious manual labor of sublimation layout, giving you back hours of your day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MagicCard className="flex flex-col items-start p-8 shadow-2xl bg-surface border-border" gradientColor="var(--border)">
              <div className="h-12 w-12 rounded-lg bg-surface flex items-center justify-center mb-6">
                <Layers className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Batch Processing</h3>
              <p className="text-muted-foreground leading-relaxed">
                Automatically generate hundreds of personalized jerseys, shorts, and sleeves from a single roster list in seconds.
              </p>
            </MagicCard>

            <MagicCard className="flex flex-col items-start p-8 shadow-2xl bg-surface border-border" gradientColor="var(--border)">
              <div className="h-12 w-12 rounded-lg bg-surface flex items-center justify-center mb-6">
                <Zap className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Smart Resizing</h3>
              <p className="text-muted-foreground leading-relaxed">
                Intelligently scale your artwork and layouts to match every size variation from Youth XS to Adult 5XL perfectly.
              </p>
            </MagicCard>

            <MagicCard className="flex flex-col items-start p-8 shadow-2xl bg-surface border-border" gradientColor="var(--border)">
              <div className="h-12 w-12 rounded-lg bg-surface flex items-center justify-center mb-6">
                <PenTool className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Lineup Formatter</h3>
              <p className="text-muted-foreground leading-relaxed">
                Organize your print lineup instantly. Sublify automatically positions elements on the artboard for maximum fabric yield.
              </p>
            </MagicCard>
          </div>
        </motion.div>
      </section>

      {/* 3. Pricing Section */}
      <section id="pricing" className="relative w-full py-32 px-6 flex flex-col items-center bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background z-0"></div>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl w-full z-10"
        >
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Simple Pricing</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start automating your workflow today. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* 90 Days Tier */}
            <div className="rounded-3xl p-8 bg-surface border border-border backdrop-blur-xl flex flex-col">
              <h3 className="text-2xl font-bold text-foreground mb-2">90 Days</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-black text-foreground">₱1k</span>
                <span className="text-muted-foreground">/ 90 days</span>
              </div>
              <p className="text-muted-foreground mb-8 pb-8 border-b border-border">Perfect for seasonal shops or short-term projects.</p>
              
              <ul className="flex flex-col gap-4 mb-8 flex-grow">
                {['Full Batch Processing', 'Auto-Resizing Engine', 'Lineup Formatter', 'Community Support'].map(feature => (
                  <li key={feature} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-muted-foreground opacity-50" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="https://facebook.com/djbenzzmc" target="_blank" rel="noopener noreferrer" className="block mt-auto">
                <button className="w-full py-4 rounded-xl font-bold text-foreground bg-surface hover:bg-surface/80 border border-border flex items-center justify-center gap-2 transition-colors">
                  Contact to Buy
                </button>
              </a>
            </div>

            {/* 1 Year Tier */}
            <div className="rounded-3xl p-8 bg-surface border border-primary/30 backdrop-blur-xl flex flex-col relative shadow-[0_0_40px_rgba(255,255,255,0.05)] md:-translate-y-4">
              <div className="absolute top-0 right-8 transform -translate-y-1/2">
                <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">1 Year</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-black text-foreground">₱3k</span>
                <span className="text-muted-foreground">/ 1 year</span>
              </div>
              <p className="text-muted-foreground mb-8 pb-8 border-b border-border">Everything you need for a growing sublimation business.</p>
              
              <ul className="flex flex-col gap-4 mb-8 flex-grow">
                {[
                  'All 90-Day Features',
                  'Assorted Template Support',
                  'Priority Support',
                  'Save ₱1,000 annually'
                ].map(feature => (
                  <li key={feature} className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="font-medium text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="https://facebook.com/djbenzzmc" target="_blank" rel="noopener noreferrer" className="block mt-auto">
                <button className="w-full py-4 rounded-xl font-bold text-primary-foreground bg-primary hover:opacity-90 shadow-lg shadow-black/25 flex items-center justify-center gap-2 transition-colors">
                  Contact to Buy
                  <ArrowRight className="w-5 h-5" />
                </button>
              </a>
            </div>

            {/* Lifetime Tier */}
            <div className="rounded-3xl p-8 bg-surface border border-border backdrop-blur-xl flex flex-col">
              <h3 className="text-2xl font-bold text-foreground mb-2">Lifetime</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-black text-foreground">₱5k</span>
                <span className="text-muted-foreground">/ forever</span>
              </div>
              <p className="text-muted-foreground mb-8 pb-8 border-b border-border">One-time payment for ultimate, unrestricted automation.</p>
              
              <ul className="flex flex-col gap-4 mb-8 flex-grow">
                {[
                  'All 1-Year Features',
                  'Free Lifetime Updates',
                  '24/7 VIP Support',
                  'No recurring fees'
                ].map(feature => (
                  <li key={feature} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-muted-foreground opacity-50" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="https://facebook.com/djbenzzmc" target="_blank" rel="noopener noreferrer" className="block mt-auto">
                <button className="w-full py-4 rounded-xl font-bold text-foreground bg-surface hover:bg-surface/80 border border-border flex items-center justify-center gap-2 transition-colors">
                  Contact to Buy
                </button>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 4. Lamp Call to Action */}
      <section className="relative w-full h-[80vh] flex flex-col items-center justify-center bg-background overflow-hidden">
        <LampContainer className="pt-20">
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-8 bg-gradient-to-br from-foreground to-muted-foreground py-4 bg-clip-text text-center text-5xl font-black tracking-tight text-transparent md:text-7xl"
          >
            Ready to Automate <br /> Your Print Shop?
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.6,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-12 flex justify-center w-full"
          >
            <a href="https://drive.google.com/file/d/1cBn_YshTpSP1PfTBDaYYylRfVzY592nT/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="group cursor-pointer">
              <RainbowButton className="px-10 py-8 text-xl font-bold shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center gap-3">
                <Download className="w-6 h-6 text-white" />
                <span className="text-white">Download Sublify Now</span>
              </RainbowButton>
            </a>
          </motion.div>
        </LampContainer>
      </section>

      {/* Footer */}
      <footer className="w-full bg-surface border-t border-border pt-16 pb-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <img src="/sublify_logo.png" alt="Sublify Logo" className="w-10 h-10 object-contain" />
              <div className="flex flex-col items-center">
                <span className="font-black text-[22px] leading-none" style={{ fontFamily: "'Monument Extended', sans-serif" }}>SUBLIFY</span>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold -mt-0.5">Sublimation Automation</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm text-center md:text-left">
              The ultimate Photoshop automation toolkit for modern print shops.
            </p>
          </div>
          
          <div className="flex gap-8 text-sm font-medium">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="#download" className="text-muted-foreground hover:text-foreground transition-colors">Download</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Support</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-border text-center text-muted-foreground text-sm flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Sublify. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
