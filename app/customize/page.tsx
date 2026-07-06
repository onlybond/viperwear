'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Paintbrush, ShieldCheck, ShoppingBag } from 'lucide-react';
import JerseyPreview, { JerseyDesignState } from '@/components/JerseyCustomizer/JerseyPreview';

export default function CustomizeLanding() {
  const steps = [
    {
      num: '01',
      title: 'CHOOSE DESIGN',
      desc: 'Select a preset template or start completely from scratch.',
      icon: <Sparkles size={18} className="text-accent-gold" />
    },
    {
      num: '02',
      title: 'CUSTOMIZE',
      desc: 'Add your primary, secondary, and accent colors, textures, logo, name and number.',
      icon: <Paintbrush size={18} className="text-accent-gold" />
    },
    {
      num: '03',
      title: 'PREVIEW',
      desc: 'Visualize your design in real time with our 360° rotation preview.',
      icon: <ShieldCheck size={18} className="text-accent-gold" />
    },
    {
      num: '04',
      title: 'PLACE ORDER',
      desc: 'Specify your sizes, quantities, and place your order directly.',
      icon: <ShoppingBag size={18} className="text-accent-gold" />
    }
  ];

  // Static preview state matching the back view in the reference image
  const previewState: JerseyDesignState = {
    view: 'back',
    template: 'classic',
    colors: {
      primary: '#0D0E12',
      secondary: '#F5A623',
      accent: '#FFFFFF'
    },
    pattern: 'stripes',
    logo: null,
    logoPosition: 'center',
    text: {
      content: 'YOUR TEAM',
      font: 'Varsity',
      color: '#F5A623',
      position: 'back'
    },
    number: {
      content: '10',
      font: 'Varsity',
      color: '#FFFFFF'
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary pt-28 pb-20 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(245,166,35,0.04)_0%,rgba(6,6,8,1)_80%] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left Side: Step Guide */}
        <div className="lg:col-span-6 flex flex-col items-start gap-8 animate-slide-up">
          <div className="flex flex-col gap-2">
            <span className="text-text-muted text-xs font-bold tracking-[3px] uppercase">CREATION PATHWAY</span>
            <h1 className="font-varsity text-4xl sm:text-6xl font-extrabold tracking-tight leading-none text-text-primary">
              CUSTOMIZE<br />
              <span className="text-accent-gold">YOUR JERSEY</span>
            </h1>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed mt-2 max-w-md">
              Design your perfect team wear in 4 simple steps. Work in real time and see the results instantly.
            </p>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-5 w-full">
            {steps.map((step) => (
              <div
                key={step.num}
                className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.02] bg-white/[0.01] hover:bg-white/[0.02] transition-colors group"
              >
                <div className="font-varsity text-2xl font-black text-accent-gold/40 group-hover:text-accent-gold transition-colors pt-0.5">
                  {step.num}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    {step.icon}
                    <h3 className="font-display text-sm font-bold tracking-wider text-text-primary">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-text-secondary text-xs sm:text-sm leading-relaxed max-w-sm">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Showcase */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative animate-fade-in delay-200">
          <div className="absolute -inset-4 bg-accent-gold/5 blur-3xl rounded-full pointer-events-none" />
          
          <div className="flex items-center gap-8 w-full max-w-[480px]">
            {/* Jersey Preview Wrapper */}
            <div className="flex-1 glass-card border border-white/5 rounded-2xl p-6 relative">
              <JerseyPreview designState={previewState} />
              
              {/* Overlay Thumbnail Previews */}
              <div className="flex justify-center gap-3 mt-4">
                <div className="w-12 h-14 border border-accent-gold bg-bg-secondary/80 rounded-md p-1 opacity-100 flex items-center justify-center">
                  {/* Small Back View Icon */}
                  <svg viewBox="0 0 100 120" className="w-full h-full opacity-60">
                    <path d="M30 20 L15 35 L22 45 L35 32 L33 90 L67 90 L65 32 L78 45 L85 35 L70 20 Z" fill="#0D0E12" stroke="#F5A623" strokeWidth="2" />
                  </svg>
                </div>
                <div className="w-12 h-14 border border-white/5 bg-bg-secondary/40 rounded-md p-1 opacity-50 hover:opacity-80 transition-all flex items-center justify-center">
                  {/* Small Front View Icon */}
                  <svg viewBox="0 0 100 120" className="w-full h-full opacity-40">
                    <path d="M30 20 L15 35 L22 45 L35 32 L33 90 L67 90 L65 32 L78 45 L85 35 L70 20 Z" fill="#0D0E12" stroke="#FFFFFF" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Vertical Control Labels (Matches reference layout) */}
            <div className="hidden sm:flex flex-col gap-5 border-l border-border-color pl-6">
              {[
                { label: 'TEMPLATES', active: true },
                { label: 'COLORS', active: false },
                { label: 'LOGO', active: false },
                { label: 'TEXT', active: false },
                { label: 'NUMBERS', active: false }
              ].map((item) => (
                <div
                  key={item.label}
                  className={`text-[10px] font-bold tracking-[2px] cursor-default transition-all uppercase ${
                    item.active ? 'text-accent-gold translate-x-1' : 'text-text-muted hover:text-text-secondary'
                  }`}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
          
          {/* Action Button Below Showcase */}
          <div className="mt-10 w-full max-w-[480px] flex justify-center">
            <Link
              href="/customize/studio"
              className="flex items-center justify-center gap-2 bg-accent-gold hover:bg-accent-gold-hover text-black font-display text-sm font-bold tracking-wider px-10 py-5 rounded-xl transition-all glow-btn w-full cursor-pointer"
            >
              START CUSTOMIZING
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
