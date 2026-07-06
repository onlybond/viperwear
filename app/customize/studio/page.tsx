'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Undo, Redo, RotateCcw, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import JerseyPreview, { JerseyDesignState } from '@/components/JerseyCustomizer/JerseyPreview';
import ControlPanel from '@/components/JerseyCustomizer/ControlPanel';

const INITIAL_STATE: JerseyDesignState = {
  view: 'front',
  template: 'classic',
  colors: {
    primary: '#060608',
    secondary: '#F5A623',
    accent: '#FFFFFF'
  },
  pattern: 'stripes',
  logo: null,
  logoPosition: 'center',
  text: {
    content: 'VIPER WEAR',
    font: 'Varsity',
    color: '#F5A623',
    position: 'chest'
  },
  number: {
    content: '10',
    font: 'Varsity',
    color: '#FFFFFF'
  }
};

const TEMPLATE_PRESETS = [
  {
    id: 'classic',
    name: 'Viper Classic',
    colors: { primary: '#060608', secondary: '#F5A623', accent: '#FFFFFF' },
    pattern: 'stripes' as const,
    thumbFill: '#F5A623'
  },
  {
    id: 'stealth',
    name: 'Stealth Noir',
    colors: { primary: '#1A1A1A', secondary: '#000000', accent: '#F5A623' },
    pattern: 'none' as const,
    thumbFill: '#1A1A1A'
  },
  {
    id: 'cyber',
    name: 'Cyber Strike',
    colors: { primary: '#0F172A', secondary: '#3B82F6', accent: '#00FFFF' },
    pattern: 'hex' as const,
    thumbFill: '#3B82F6'
  },
  {
    id: 'gold',
    name: 'Gold Fusion',
    colors: { primary: '#FFFFFF', secondary: '#F5A623', accent: '#1E293B' },
    pattern: 'chevron' as const,
    thumbFill: '#FFFFFF'
  }
];

export default function DesignStudio() {
  const router = useRouter();
  
  // Customizer State
  const [designState, setDesignState] = useState<JerseyDesignState>({ ...INITIAL_STATE });
  
  // History Stacks for Undo/Redo
  const [history, setHistory] = useState<JerseyDesignState[]>([]);
  const [redoHistory, setRedoHistory] = useState<JerseyDesignState[]>([]);
  
  // Success Alert on design save
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Custom Dispatch wrapper to record history automatically
  const updateDesignState: React.Dispatch<React.SetStateAction<JerseyDesignState>> = (action) => {
    setDesignState((prev) => {
      const next = typeof action === 'function' ? action(prev) : action;
      setHistory((h) => [...h, prev]);
      setRedoHistory([]); // Clear redo stack
      return next;
    });
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setRedoHistory((r) => [...r, designState]);
    setHistory((h) => h.slice(0, h.length - 1));
    setDesignState(prev);
  };

  const handleRedo = () => {
    if (redoHistory.length === 0) return;
    const next = redoHistory[redoHistory.length - 1];
    setHistory((h) => [...h, designState]);
    setRedoHistory((r) => r.slice(0, r.length - 1));
    setDesignState(next);
  };

  const handleReset = () => {
    setHistory((h) => [...h, designState]);
    setRedoHistory([]);
    setDesignState({ ...INITIAL_STATE });
  };

  const handleSaveDesign = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    // Optionally persist to localStorage
    localStorage.setItem('viperwear_custom_design', JSON.stringify(designState));
  };

  const handleNextStep = () => {
    // Navigate to contact/quote request page carrying current custom configuration in localstorage or state
    localStorage.setItem('viperwear_custom_design', JSON.stringify(designState));
    router.push('/contact?ref=customizer');
  };

  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-12 flex flex-col justify-between relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(245,166,35,0.03)_0%,rgba(6,6,8,1)_85%] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col z-10 relative mt-4">
        {/* Breadcrumbs / Top Actions */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/customize" className="flex items-center gap-1.5 text-xs font-bold text-text-secondary hover:text-accent-gold transition-colors tracking-wider uppercase">
            <ChevronLeft size={14} />
            BACK TO STEPS
          </Link>
          <span className="text-[10px] text-text-muted font-bold tracking-[2px] uppercase">
            STUDIO / WORKSPACE
          </span>
        </div>

        {/* Studio Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch flex-1">
          
          {/* Left Sidebar: Quick Templates Selection */}
          <div className="lg:col-span-3 bg-bg-secondary/40 border border-white/5 rounded-2xl p-6 backdrop-blur-md flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-sm font-bold tracking-wider text-text-primary">TEMPLATES</h3>
              <p className="text-[10px] text-text-muted font-semibold tracking-wider">CHOOSE BASE STYLE</p>
            </div>
            
            <div className="flex flex-col gap-3">
              {TEMPLATE_PRESETS.map((preset) => {
                const isSelected = designState.pattern === preset.pattern && designState.colors.primary === preset.colors.primary;
                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      updateDesignState((prev) => ({
                        ...prev,
                        colors: preset.colors,
                        pattern: preset.pattern
                      }));
                    }}
                    className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all group cursor-pointer ${
                      isSelected ? 'bg-bg-tertiary border-accent-gold' : 'bg-transparent border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-5 h-5 rounded-full border border-white/10 flex-shrink-0"
                        style={{ backgroundColor: preset.thumbFill }}
                      />
                      <span className={`text-xs font-semibold ${isSelected ? 'text-accent-gold' : 'text-text-secondary group-hover:text-text-primary'}`}>
                        {preset.name}
                      </span>
                    </div>
                    {isSelected && <Check size={14} className="text-accent-gold" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Middle Pane: Large Preview Canvas with Quick Controls */}
          <div className="lg:col-span-5 bg-bg-secondary/20 border border-white/5 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between items-center relative min-h-[480px]">
            {/* Quick Editor Controls */}
            <div className="flex items-center gap-4 bg-bg-tertiary/60 border border-white/5 px-4 py-2.5 rounded-xl w-full justify-center">
              <button
                onClick={handleUndo}
                disabled={history.length === 0}
                className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-text-secondary hover:text-accent-gold disabled:text-text-muted disabled:pointer-events-none transition-colors cursor-pointer"
                title="Undo last change"
              >
                <Undo size={12} />
                UNDO
              </button>
              <span className="w-[1px] h-3 bg-white/10" />
              <button
                onClick={handleRedo}
                disabled={redoHistory.length === 0}
                className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-text-secondary hover:text-accent-gold disabled:text-text-muted disabled:pointer-events-none transition-colors cursor-pointer"
                title="Redo last change"
              >
                <Redo size={12} />
                REDO
              </button>
              <span className="w-[1px] h-3 bg-white/10" />
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-text-secondary hover:text-accent-gold transition-colors cursor-pointer"
                title="Reset layout to default"
              >
                <RotateCcw size={12} />
                RESET
              </button>
            </div>

            {/* Main SVG Jersey Canvas */}
            <div className="flex-1 flex items-center justify-center w-full py-6">
              <div className="w-full max-w-[320px] transition-transform duration-500 hover:scale-102">
                <JerseyPreview designState={designState} />
              </div>
            </div>

            {/* Notification alert on save */}
            {saveSuccess && (
              <div className="absolute top-20 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2 animate-fade-in">
                <Check size={14} />
                Design successfully saved to local gallery!
              </div>
            )}
          </div>

          {/* Right Sidebar: Tabs Controls panel */}
          <div className="lg:col-span-4">
            <ControlPanel
              designState={designState}
              setDesignState={updateDesignState}
              onSave={handleSaveDesign}
              onNext={handleNextStep}
            />
          </div>
        </div>
      </div>

      {/* Footer Design Bar */}
      <div className="border-t border-border-color bg-bg-secondary/40 py-5 mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-xs text-text-muted font-bold tracking-wider uppercase">Active Design</span>
              <span className="text-sm font-bold text-text-primary uppercase tracking-wide">
                {designState.text.content || 'Custom Jersey'} - #{designState.number.content || '10'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleSaveDesign}
              className="flex-1 sm:flex-none border border-border-color hover:border-accent-gold text-text-primary hover:text-accent-gold text-xs font-bold tracking-wider px-8 py-3.5 rounded-xl transition-all cursor-pointer"
            >
              SAVE DESIGN
            </button>
            <button
              onClick={handleNextStep}
              className="flex-1 sm:flex-none bg-accent-gold hover:bg-accent-gold-hover text-black text-xs font-bold tracking-wider px-8 py-3.5 rounded-xl flex items-center justify-center gap-1 glow-btn cursor-pointer"
            >
              NEXT STEP
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
