'use client';

import React, { useState } from 'react';
import { JerseyDesignState } from './JerseyPreview';
import { Upload, ChevronRight, RefreshCw, Palette, Type, Hash, ShieldAlert } from 'lucide-react';

interface ControlPanelProps {
  designState: JerseyDesignState;
  setDesignState: React.Dispatch<React.SetStateAction<JerseyDesignState>>;
  onSave?: () => void;
  onNext?: () => void;
}

type TabType = 'templates' | 'colors' | 'logo' | 'text' | 'numbers';

const PRESETS = [
  {
    name: 'Stealth Mode',
    colors: { primary: '#1A1A1A', secondary: '#000000', accent: '#F5A623' },
    pattern: 'none' as const,
    text: 'STEALTH',
    number: '00'
  },
  {
    name: 'Viper Strike',
    colors: { primary: '#060608', secondary: '#F5A623', accent: '#FFFFFF' },
    pattern: 'stripes' as const,
    text: 'VIPER',
    number: '10'
  },
  {
    name: 'Cyber Hex',
    colors: { primary: '#0F172A', secondary: '#3B82F6', accent: '#00FFFF' },
    pattern: 'hex' as const,
    text: 'CYBER',
    number: '08'
  },
  {
    name: 'Gold Fusion',
    colors: { primary: '#FFFFFF', secondary: '#F5A623', accent: '#1E293B' },
    pattern: 'chevron' as const,
    text: 'FUSION',
    number: '07'
  }
];

const COLOR_SWATCHES = [
  { name: 'Dark Black', hex: '#060608' },
  { name: 'Stealth Grey', hex: '#1F2937' },
  { name: 'Viper Gold', hex: '#F5A623' },
  { name: 'Ice White', hex: '#FFFFFF' },
  { name: 'Crimson Red', hex: '#DC2626' },
  { name: 'Royal Blue', hex: '#1D4ED8' },
  { name: 'Cyan Neon', hex: '#06B6D4' },
  { name: 'Forest Green', hex: '#15803D' }
];

export default function ControlPanel({ designState, setDesignState, onSave, onNext }: ControlPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('templates');

  const updateColor = (type: 'primary' | 'secondary' | 'accent', hex: string) => {
    setDesignState((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [type]: hex
      }
    }));
  };

  const updatePattern = (pat: JerseyDesignState['pattern']) => {
    setDesignState((prev) => ({ ...prev, pattern: pat }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setDesignState((prev) => ({
            ...prev,
            logo: event.target!.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePresetSelect = (preset: typeof PRESETS[0]) => {
    setDesignState((prev) => ({
      ...prev,
      colors: preset.colors,
      pattern: preset.pattern,
      text: { ...prev.text, content: preset.text },
      number: { ...prev.number, content: preset.number }
    }));
  };

  const handleReset = () => {
    setDesignState({
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
    });
  };

  const toggleView = () => {
    setDesignState((prev) => ({
      ...prev,
      view: prev.view === 'front' ? 'back' : 'front'
    }));
  };

  return (
    <div className="flex flex-col h-full bg-bg-secondary/40 border border-white/5 rounded-2xl p-6 backdrop-blur-md">
      {/* View Toggle */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border-color">
        <span className="font-display text-sm font-semibold text-text-secondary">VIEWING: <span className="text-accent-gold uppercase font-bold">{designState.view}</span></span>
        <button
          onClick={toggleView}
          className="flex items-center gap-2 bg-bg-tertiary border border-border-color hover:border-accent-gold hover:text-accent-gold text-xs font-semibold px-4 py-2 rounded-lg transition-all cursor-pointer"
        >
          <RefreshCw size={14} />
          ROTATE JERSEY
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border-color overflow-x-auto gap-4 mb-6 no-scrollbar">
        {(['templates', 'colors', 'logo', 'text', 'numbers'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-display text-xs font-bold tracking-wider pb-3 border-b-2 transition-all uppercase cursor-pointer whitespace-nowrap ${
              activeTab === tab
                ? 'border-accent-gold text-accent-gold'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-y-auto pr-1 min-h-[300px] max-h-[420px] no-scrollbar">
        {/* TEMPLATES TAB */}
        {activeTab === 'templates' && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <h4 className="text-sm font-semibold text-text-primary mb-1">Select starting template</h4>
            <div className="grid grid-cols-2 gap-3">
              {PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handlePresetSelect(preset)}
                  className="bg-bg-tertiary/60 hover:bg-bg-tertiary border border-border-color hover:border-accent-gold rounded-xl p-4 text-left transition-all group cursor-pointer"
                >
                  <div className="font-display text-xs font-bold text-text-primary mb-3 group-hover:text-accent-gold transition-colors">
                    {preset.name}
                  </div>
                  <div className="flex gap-1.5 mb-1.5">
                    <span className="w-4 h-4 rounded-full border border-white/10" style={{ backgroundColor: preset.colors.primary }} />
                    <span className="w-4 h-4 rounded-full border border-white/10" style={{ backgroundColor: preset.colors.secondary }} />
                    <span className="w-4 h-4 rounded-full border border-white/10" style={{ backgroundColor: preset.colors.accent }} />
                  </div>
                  <span className="text-[10px] text-text-muted capitalize">Pattern: {preset.pattern}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* COLORS & PATTERNS TAB */}
        {activeTab === 'colors' && (
          <div className="flex flex-col gap-6 animate-fade-in">
            {/* Primary Color */}
            <div>
              <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Primary Color</h4>
              <div className="flex flex-wrap gap-2">
                {COLOR_SWATCHES.map((swatch) => (
                  <button
                    key={`primary-${swatch.hex}`}
                    onClick={() => updateColor('primary', swatch.hex)}
                    className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                      designState.colors.primary === swatch.hex ? 'border-accent-gold scale-110 shadow-lg' : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: swatch.hex }}
                    title={swatch.name}
                  />
                ))}
              </div>
            </div>

            {/* Secondary Color */}
            <div>
              <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Secondary Color</h4>
              <div className="flex flex-wrap gap-2">
                {COLOR_SWATCHES.map((swatch) => (
                  <button
                    key={`secondary-${swatch.hex}`}
                    onClick={() => updateColor('secondary', swatch.hex)}
                    className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                      designState.colors.secondary === swatch.hex ? 'border-accent-gold scale-110 shadow-lg' : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: swatch.hex }}
                    title={swatch.name}
                  />
                ))}
              </div>
            </div>

            {/* Accent Color */}
            <div>
              <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Accent Color</h4>
              <div className="flex flex-wrap gap-2">
                {COLOR_SWATCHES.map((swatch) => (
                  <button
                    key={`accent-${swatch.hex}`}
                    onClick={() => updateColor('accent', swatch.hex)}
                    className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                      designState.colors.accent === swatch.hex ? 'border-accent-gold scale-110 shadow-lg' : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: swatch.hex }}
                    title={swatch.name}
                  />
                ))}
              </div>
            </div>

            {/* Jersey Pattern */}
            <div>
              <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Texture Pattern</h4>
              <div className="grid grid-cols-3 gap-2">
                {['none', 'stripes', 'chevron', 'hex', 'gradient', 'half'].map((pat) => (
                  <button
                    key={pat}
                    onClick={() => updatePattern(pat as JerseyDesignState['pattern'])}
                    className={`bg-bg-tertiary border text-[10px] font-bold tracking-wider py-2.5 rounded-lg text-center transition-all cursor-pointer uppercase ${
                      designState.pattern === pat ? 'border-accent-gold text-accent-gold' : 'border-border-color text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {pat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* LOGO TAB */}
        {activeTab === 'logo' && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-2">Upload Team/Sponsor Logo</h4>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-border-color hover:border-accent-gold rounded-xl p-8 cursor-pointer transition-colors group">
                <Upload size={32} className="text-text-secondary group-hover:text-accent-gold transition-colors mb-3" />
                <span className="text-xs font-semibold text-text-secondary group-hover:text-text-primary transition-colors">
                  Click to upload or drag logo
                </span>
                <span className="text-[10px] text-text-muted mt-1">PNG, JPG or SVG (Max 5MB)</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
              </label>
            </div>

            {designState.logo && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-text-secondary">Uploaded Logo Preview:</span>
                  <button
                    onClick={() => setDesignState((prev) => ({ ...prev, logo: null }))}
                    className="text-[10px] text-red-400 hover:text-red-300 font-bold tracking-wider cursor-pointer"
                  >
                    REMOVE
                  </button>
                </div>
                <div className="flex items-center gap-4 bg-bg-tertiary border border-border-color rounded-xl p-4">
                  <img src={designState.logo} alt="Uploaded logo" className="w-12 h-12 object-contain bg-white/5 rounded p-1" />
                  <div className="flex-1">
                    <h5 className="text-[10px] font-bold text-text-secondary uppercase mb-2">Placement</h5>
                    <div className="flex gap-2">
                      {['left-chest', 'center', 'right-chest'].map((pos) => (
                        <button
                          key={pos}
                          onClick={() => setDesignState((prev) => ({ ...prev, logoPosition: pos as any }))}
                          className={`text-[9px] font-bold px-3 py-1.5 border rounded-md transition-colors cursor-pointer ${
                            designState.logoPosition === pos ? 'bg-accent-gold border-accent-gold text-black' : 'border-border-color text-text-secondary hover:text-text-primary'
                          }`}
                        >
                          {pos.replace('-', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TEXT TAB */}
        {activeTab === 'text' && (
          <div className="flex flex-col gap-5 animate-fade-in">
            {/* Text input */}
            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Team / Sponsor Name</label>
              <input
                type="text"
                value={designState.text.content}
                onChange={(e) => setDesignState((prev) => ({
                  ...prev,
                  text: { ...prev.text, content: e.target.value }
                }))}
                className="w-full bg-bg-tertiary border border-border-color focus:border-accent-gold rounded-xl px-4 py-3 text-sm text-text-primary"
                placeholder="Enter team/sponsor name"
              />
            </div>

            {/* Font family selection */}
            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Text Font</label>
              <div className="grid grid-cols-3 gap-2">
                {['Varsity', 'Modern', 'Sleek'].map((font) => (
                  <button
                    key={font}
                    onClick={() => setDesignState((prev) => ({
                      ...prev,
                      text: { ...prev.text, font }
                    }))}
                    className={`bg-bg-tertiary border text-[10px] font-bold tracking-wider py-2 rounded-lg transition-colors cursor-pointer ${
                      designState.text.font === font ? 'border-accent-gold text-accent-gold' : 'border-border-color text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {font}
                  </button>
                ))}
              </div>
            </div>

            {/* Color selection */}
            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Text Color</label>
              <div className="flex flex-wrap gap-2">
                {COLOR_SWATCHES.map((swatch) => (
                  <button
                    key={`text-color-${swatch.hex}`}
                    onClick={() => setDesignState((prev) => ({
                      ...prev,
                      text: { ...prev.text, color: swatch.hex }
                    }))}
                    className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                      designState.text.color === swatch.hex ? 'border-accent-gold scale-110 shadow-lg' : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: swatch.hex }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* NUMBERS TAB */}
        {activeTab === 'numbers' && (
          <div className="flex flex-col gap-5 animate-fade-in">
            {/* Number input */}
            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Jersey Number</label>
              <input
                type="text"
                maxLength={3}
                value={designState.number.content}
                onChange={(e) => setDesignState((prev) => ({
                  ...prev,
                  number: { ...prev.number, content: e.target.value }
                }))}
                className="w-full bg-bg-tertiary border border-border-color focus:border-accent-gold rounded-xl px-4 py-3 text-sm text-text-primary"
                placeholder="10"
              />
            </div>

            {/* Font selection */}
            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Number Font</label>
              <div className="grid grid-cols-3 gap-2">
                {['Varsity', 'Modern', 'Sleek'].map((font) => (
                  <button
                    key={font}
                    onClick={() => setDesignState((prev) => ({
                      ...prev,
                      number: { ...prev.number, font }
                    }))}
                    className={`bg-bg-tertiary border text-[10px] font-bold tracking-wider py-2 rounded-lg transition-colors cursor-pointer ${
                      designState.number.font === font ? 'border-accent-gold text-accent-gold' : 'border-border-color text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {font}
                  </button>
                ))}
              </div>
            </div>

            {/* Color picker */}
            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Number Color</label>
              <div className="flex flex-wrap gap-2">
                {COLOR_SWATCHES.map((swatch) => (
                  <button
                    key={`num-color-${swatch.hex}`}
                    onClick={() => setDesignState((prev) => ({
                      ...prev,
                      number: { ...prev.number, color: swatch.hex }
                    }))}
                    className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                      designState.number.color === swatch.hex ? 'border-accent-gold scale-110 shadow-lg' : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: swatch.hex }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Control Actions */}
      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border-color">
        <button
          onClick={handleReset}
          className="bg-bg-tertiary border border-border-color hover:border-red-400 hover:text-red-400 font-display text-xs font-bold tracking-wider py-3.5 rounded-xl transition-all cursor-pointer"
        >
          RESET DESIGN
        </button>
        <button
          onClick={onNext}
          className="bg-accent-gold hover:bg-accent-gold-hover text-black font-display text-xs font-bold tracking-wider py-3.5 rounded-xl flex items-center justify-center gap-1 glow-btn cursor-pointer"
        >
          NEXT STEP
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
