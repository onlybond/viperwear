import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Zap, Users, Sparkles, Trophy, Flame } from 'lucide-react';

const SPORTS = [
  { name: 'KABADDI', image: '/images/kabaddi.png', path: '/customize?sport=kabaddi' },
  { name: 'CRICKET', image: '/images/cricket.png', path: '/customize?sport=cricket' },
  { name: 'FOOTBALL', image: '/images/football.png', path: '/customize?sport=football' },
  { name: 'BASKETBALL', image: '/images/basketball.png', path: '/customize?sport=basketball' },
];

const FEATURES = [
  {
    icon: <Sparkles className="text-accent-gold" size={24} />,
    title: 'UNLIMITED CUSTOMIZATION',
    desc: 'Design without limits. Pick colors, add gradients, custom textures, sponsor logos, names and numbers. Make it truly yours.'
  },
  {
    icon: <Trophy className="text-accent-gold" size={24} />,
    title: 'PREMIUM QUALITY',
    desc: 'Engineered with elite, sweat-wicking, breathable performance fabrics that are built to withstand the toughest games.'
  },
  {
    icon: <Flame className="text-accent-gold" size={24} />,
    title: 'PERFECT FIT',
    desc: 'Tailored athletic fit designed specifically for players, allowing absolute freedom of movement and ultimate comfort.'
  },
  {
    icon: <Users className="text-accent-gold" size={24} />,
    title: 'TEAM FIRST',
    desc: 'From local squads to school teams and professional leagues. We specialize in custom package deals for any roster size.'
  }
];

export default function Home() {
  return (
    <div className="flex flex-col w-full relative">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Background Radial Glow */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(245,166,35,0.06)_0%,rgba(6,6,8,1)_70%] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 w-full">
          {/* Typography */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6 animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-accent-gold/10 border border-accent-gold/20 px-3.5 py-1.5 rounded-full text-accent-gold text-xs font-bold tracking-wider uppercase">
              <Trophy size={12} />
              CUSTOM SPORTSWEAR
            </div>
            
            <h1 className="font-varsity text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] text-text-primary">
              YOUR TEAM.<br />
              YOUR IDENTITY.<br />
              <span className="text-accent-gold">OUR CRAFT.</span>
            </h1>
            
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-md">
              Premium quality. Unlimited customization. Built for peak performance. Designed to dominate the game.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mt-2 w-full sm:w-auto">
              <Link
                href="/customize"
                className="flex items-center justify-center gap-2 bg-accent-gold hover:bg-accent-gold-hover text-black font-display text-sm font-bold tracking-wider px-8 py-4 rounded-xl transition-all glow-btn w-full sm:w-auto cursor-pointer"
              >
                CUSTOMIZE NOW
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center bg-bg-tertiary hover:bg-bg-accent border border-border-color hover:border-text-secondary text-text-primary font-display text-sm font-semibold tracking-wider px-8 py-4 rounded-xl transition-all w-full sm:w-auto cursor-pointer"
              >
                EXPLORE STORE
              </Link>
            </div>
          </div>
          
          {/* Hero Banner Image */}
          <div className="lg:col-span-6 flex justify-center items-center relative animate-fade-in delay-200">
            <div className="absolute -inset-4 bg-accent-gold/5 blur-3xl rounded-full" />
            <div className="relative w-full max-w-[500px] aspect-square rounded-2xl overflow-hidden border border-white/5 shadow-2xl glass-card">
              <Image
                src="/images/hero_players.png"
                alt="Viperwear custom jerseys"
                fill
                priority
                className="object-cover"
                sizes="(max-w-1024px) 100vw, 500px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Strip */}
      <section className="border-y border-border-color bg-bg-secondary/40 py-10 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5">
            <div className="bg-bg-tertiary border border-border-color p-3 rounded-xl text-accent-gold">
              <ShieldCheck size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold tracking-wider text-text-primary">100% CUSTOM</span>
              <span className="text-[10px] text-text-muted font-semibold tracking-widest uppercase">MADE FOR YOU</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5">
            <div className="bg-bg-tertiary border border-border-color p-3 rounded-xl text-accent-gold">
              <Sparkles size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold tracking-wider text-text-primary">PREMIUM QUALITY</span>
              <span className="text-[10px] text-text-muted font-semibold tracking-widest uppercase">ELITE ATHLETIC FABRIC</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5">
            <div className="bg-bg-tertiary border border-border-color p-3 rounded-xl text-accent-gold">
              <Zap size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold tracking-wider text-text-primary">FAST TURNAROUND</span>
              <span className="text-[10px] text-text-muted font-semibold tracking-widest uppercase">PROMPT SHIPMENT</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5">
            <div className="bg-bg-tertiary border border-border-color p-3 rounded-xl text-accent-gold">
              <Users size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold tracking-wider text-text-primary">TRUSTED BY TEAMS</span>
              <span className="text-[10px] text-text-muted font-semibold tracking-widest uppercase">100+ CLUBS GLOBALLY</span>
            </div>
          </div>
        </div>
      </section>

      {/* Built For Every Game (Sport Showcase) */}
      <section id="store" className="py-24 max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col items-center text-center mb-16 gap-3">
          <h2 className="font-varsity text-3xl sm:text-5xl font-extrabold tracking-tight">
            BUILT FOR <span className="text-accent-gold">EVERY GAME</span>
          </h2>
          <div className="h-[2px] w-12 bg-accent-gold" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {SPORTS.map((sport) => (
            <Link
              href={sport.path}
              key={sport.name}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 group shadow-lg glass-card cursor-pointer"
            >
              <Image
                src={sport.image}
                alt={sport.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-w-768px) 100vw, 240px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-col items-start gap-1">
                <span className="font-display text-lg font-extrabold tracking-wider text-text-primary">
                  {sport.name}
                </span>
                <span className="text-[10px] text-accent-gold font-bold tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                  EXPLORE
                  <ArrowRight size={10} />
                </span>
              </div>
            </Link>
          ))}

          {/* And More Card */}
          <Link
            href="/customize"
            className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-accent-gold/20 bg-radial-[circle_at_center,rgba(245,166,35,0.08)_0%,rgba(13,14,18,1)_100%] flex flex-col items-center justify-center text-center p-6 group cursor-pointer"
          >
            <div className="bg-bg-tertiary border border-border-color group-hover:border-accent-gold p-4 rounded-full text-accent-gold transition-all mb-4">
              <Trophy size={28} />
            </div>
            <span className="font-display text-lg font-extrabold tracking-wider text-text-primary mb-1">
              AND MORE
            </span>
            <span className="text-xs text-text-secondary leading-relaxed mb-4 max-w-[150px]">
              Kabaddi, Hockey, Volleyball, E-Sports & more.
            </span>
            <span className="text-[10px] text-accent-gold font-bold tracking-wider flex items-center gap-1">
              CUSTOMIZE NOW
              <ArrowRight size={10} />
            </span>
          </Link>
        </div>
      </section>

      {/* Why Viperwear Section */}
      <section id="about" className="py-24 bg-bg-secondary/20 border-t border-border-color w-full">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16 gap-3">
            <h2 className="font-varsity text-3xl sm:text-5xl font-extrabold tracking-tight">
              WHY <span className="text-accent-gold">VIPERWEAR?</span>
            </h2>
            <div className="h-[2px] w-12 bg-accent-gold" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feat) => (
              <div key={feat.title} className="glass-card rounded-2xl p-8 flex flex-col gap-4 border border-white/[0.02]">
                <div className="bg-bg-tertiary border border-border-color w-12 h-12 rounded-xl flex items-center justify-center">
                  {feat.icon}
                </div>
                <h3 className="font-display text-sm font-bold tracking-wider text-text-primary uppercase">
                  {feat.title}
                </h3>
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready To Create Section */}
      <section className="py-24 relative overflow-hidden border-t border-border-color">
        <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(245,166,35,0.03)_0%,rgba(6,6,8,1)_80%] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-8 z-10 relative">
          <h2 className="font-varsity text-4xl sm:text-6xl font-extrabold tracking-tight leading-none text-text-primary">
            READY TO CREATE<br />
            <span className="text-accent-gold">SOMETHING EPIC?</span>
          </h2>
          
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-lg">
            Design your dream jersey in minutes. Bulk orders. Custom sponsor logos. Perfect sizes for all players. No minimum limits.
          </p>

          {/* Overlay jerseys mockup representation */}
          <div className="flex gap-4 sm:gap-8 justify-center my-6 flex-wrap">
            {/* Jersey 1: Gold Theme */}
            <div className="w-24 sm:w-32 transform -rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-300">
              <svg viewBox="0 0 100 120" className="w-full h-auto drop-shadow-xl">
                <path d="M30 20 L15 35 L22 45 L35 32 L33 90 L67 90 L65 32 L78 45 L85 35 L70 20 Z" fill="#060608" stroke="#F5A623" strokeWidth="2" />
                <path d="M45 40 H55 V60 H45 Z" fill="#F5A623" />
                <text x="50" y="80" fill="#FFFFFF" fontSize="14" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">10</text>
              </svg>
            </div>
            
            {/* Jersey 2: Crimson theme */}
            <div className="w-24 sm:w-32 transform translate-y-[-10px] hover:scale-105 transition-all duration-300">
              <svg viewBox="0 0 100 120" className="w-full h-auto drop-shadow-xl">
                <path d="M30 20 L15 35 L22 45 L35 32 L33 90 L67 90 L65 32 L78 45 L85 35 L70 20 Z" fill="#DC2626" stroke="#000000" strokeWidth="2" />
                <path d="M45 40 H55 V60 H45 Z" fill="#FFFFFF" />
                <text x="50" y="80" fill="#FFFFFF" fontSize="14" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">07</text>
              </svg>
            </div>

            {/* Jersey 3: Neon theme */}
            <div className="w-24 sm:w-32 transform rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-300">
              <svg viewBox="0 0 100 120" className="w-full h-auto drop-shadow-xl">
                <path d="M30 20 L15 35 L22 45 L35 32 L33 90 L67 90 L65 32 L78 45 L85 35 L70 20 Z" fill="#0F172A" stroke="#06B6D4" strokeWidth="2" />
                <path d="M45 40 H55 V60 H45 Z" fill="#06B6D4" />
                <text x="50" y="80" fill="#FFFFFF" fontSize="14" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">99</text>
              </svg>
            </div>
          </div>
          
          <Link
            href="/customize"
            className="flex items-center gap-2 bg-accent-gold hover:bg-accent-gold-hover text-black font-display text-sm font-bold tracking-wider px-10 py-5 rounded-xl transition-all glow-btn cursor-pointer"
          >
            START CUSTOMIZING
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  );
}
