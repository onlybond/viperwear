'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail, Phone, MapPin, Send, MessageCircle, ShieldCheck, CheckCircle2, Upload, AlertCircle } from 'lucide-react';
import JerseyPreview, { JerseyDesignState } from '@/components/JerseyCustomizer/JerseyPreview';

function ContactContent() {
  const searchParams = useSearchParams();
  const cameFromStudio = searchParams.get('ref') === 'customizer';

  // State to hold custom jersey if coming from customizer
  const [customDesign, setCustomDesign] = useState<JerseyDesignState | null>(null);
  
  // Form submission state
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Form inputs state
  const [formData, setFormData] = useState({
    teamName: '',
    yourName: '',
    email: '',
    phone: '',
    sport: 'football',
    quantity: '15-30',
    requirements: '',
    logoFile: null as string | null
  });

  useEffect(() => {
    // Load custom jersey from localStorage if available
    const saved = localStorage.getItem('viperwear_custom_design');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as JerseyDesignState;
        setCustomDesign(parsed);
        
        // Pre-fill some form fields
        setFormData((prev) => ({
          ...prev,
          teamName: parsed.text.content || '',
          requirements: `Custom design configured in studio: Text: "${parsed.text.content}", Number: "${parsed.number.content}", Pattern: "${parsed.pattern}", Primary: "${parsed.colors.primary}", Secondary: "${parsed.colors.secondary}".`
        }));
      } catch (err) {
        console.error('Failed to parse saved design:', err);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prev) => ({
            ...prev,
            logoFile: event.target!.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
      
      // Clear design from localstorage on successful quote request
      localStorage.removeItem('viperwear_custom_design');
    }, 2000);
  };

  const valueProps = [
    { title: '100% Custom Designs', desc: 'No cookie-cutter templates. Custom tailored layout.' },
    { title: 'Expert Design Support', desc: 'Work directly with professional sportswear designers.' },
    { title: 'Bulk Order Specialist', desc: 'Discounts and custom packages for complete squads.' },
    { title: 'Fast Turnaround', desc: 'Shipped to your doorstep in record time.' }
  ];

  return (
    <div className="min-h-screen bg-bg-primary pt-28 pb-20 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(245,166,35,0.04)_0%,rgba(6,6,8,1)_80%] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 w-full">
        {/* Left Side: Brand Vision & Info */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-10 animate-slide-up">
          <div className="flex flex-col gap-6">
            <span className="text-text-muted text-xs font-bold tracking-[3px] uppercase">GET IN TOUCH</span>
            <h1 className="font-varsity text-4xl sm:text-6xl font-extrabold tracking-tight leading-none text-text-primary">
              HAVE A UNIQUE<br />
              <span className="text-accent-gold">VISION?</span>
            </h1>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-md">
              Let our team of custom sports apparel experts bring your designs to life. Whether it is a professional league or a local league, we have got you covered.
            </p>

            {/* Checklist */}
            <div className="flex flex-col gap-4 mt-4">
              {valueProps.map((prop) => (
                <div key={prop.title} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-accent-gold flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="font-display text-xs font-bold text-text-primary tracking-wide">{prop.title}</span>
                    <span className="text-text-secondary text-[11px] leading-relaxed">{prop.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Channels / Action CTAs */}
          <div className="flex flex-col gap-4 mt-6">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-[#25D366]/40 hover:border-[#25D366] hover:bg-[#25D366]/5 text-[#25D366] font-display text-xs font-bold tracking-wider py-4 rounded-xl transition-all cursor-pointer"
            >
              <MessageCircle size={16} />
              WHATSAPP US
            </a>
            <div className="flex flex-col gap-3 text-xs text-text-secondary border-t border-border-color pt-6">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-accent-gold" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-accent-gold" />
                <span>info@viperwear.in</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-accent-gold" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Quote Form / Customizer Status */}
        <div className="lg:col-span-7 flex flex-col gap-6 animate-fade-in delay-200">
          
          {/* Customizer Attachment Banner */}
          {cameFromStudio && customDesign && (
            <div className="bg-accent-gold/5 border border-accent-gold/25 rounded-2xl p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Micro SVG preview thumbnail */}
                <div className="w-16 h-16 bg-bg-secondary border border-white/5 rounded-xl p-2 flex items-center justify-center flex-shrink-0">
                  <JerseyPreview designState={customDesign} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-accent-gold font-bold tracking-wider uppercase">DESIGN ATTACHED</span>
                  <h4 className="text-xs font-bold text-text-primary uppercase tracking-wide">
                    {customDesign.text.content || 'Custom Jersey'} - #{customDesign.number.content || '10'}
                  </h4>
                  <span className="text-[9px] text-text-muted mt-0.5">We will generate your quote based on this customized setup.</span>
                </div>
              </div>
              <button
                onClick={() => setCustomDesign(null)}
                className="text-[9px] font-bold text-red-400 hover:text-red-300 tracking-wider flex-shrink-0 cursor-pointer"
              >
                REMOVE
              </button>
            </div>
          )}

          {/* Form / Success Screen */}
          <div className="glass-panel border border-white/5 rounded-2xl p-6 sm:p-8 relative min-h-[480px]">
            {formSubmitted ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 animate-fade-in">
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-5 rounded-full mb-6">
                  <ShieldCheck size={48} />
                </div>
                <h3 className="font-varsity text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
                  REQUEST <span className="text-accent-gold">RECEIVED!</span>
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
                  Thank you! Our design coordinators will review your requirements and reach out within 24 hours with a custom mockup and pricing.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-8 border border-border-color hover:border-accent-gold text-text-primary hover:text-accent-gold text-xs font-bold tracking-wider px-8 py-3.5 rounded-xl transition-all cursor-pointer"
                >
                  SEND ANOTHER REQUEST
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-base font-bold tracking-wider text-text-primary">
                    TELL US ABOUT YOUR REQUIREMENT
                  </h3>
                  <p className="text-[10px] text-text-muted font-bold tracking-wider uppercase">
                    Fill out the fields to receive custom quote
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Team Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">Team / Organization</label>
                    <input
                      type="text"
                      name="teamName"
                      required
                      value={formData.teamName}
                      onChange={handleInputChange}
                      className="bg-bg-tertiary/60 border border-border-color focus:border-accent-gold text-sm text-text-primary px-4 py-3 rounded-xl transition-all"
                      placeholder="e.g. Warriors FC"
                    />
                  </div>

                  {/* Contact Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">Your Name</label>
                    <input
                      type="text"
                      name="yourName"
                      required
                      value={formData.yourName}
                      onChange={handleInputChange}
                      className="bg-bg-tertiary/60 border border-border-color focus:border-accent-gold text-sm text-text-primary px-4 py-3 rounded-xl transition-all"
                      placeholder="e.g. Rohit Sharma"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-bg-tertiary/60 border border-border-color focus:border-accent-gold text-sm text-text-primary px-4 py-3 rounded-xl transition-all"
                      placeholder="name@domain.com"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-bg-tertiary/60 border border-border-color focus:border-accent-gold text-sm text-text-primary px-4 py-3 rounded-xl transition-all"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Sport select */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">Select Sport</label>
                    <select
                      name="sport"
                      value={formData.sport}
                      onChange={handleInputChange}
                      className="bg-bg-tertiary/60 border border-border-color focus:border-accent-gold text-sm text-text-primary px-4 py-3 rounded-xl transition-all cursor-pointer"
                    >
                      <option value="football">Football / Soccer</option>
                      <option value="cricket">Cricket</option>
                      <option value="basketball">Basketball</option>
                      <option value="kabaddi">Kabaddi</option>
                      <option value="other">Other Sports</option>
                    </select>
                  </div>

                  {/* Quantity select */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">Estimated Quantity</label>
                    <select
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="bg-bg-tertiary/60 border border-border-color focus:border-accent-gold text-sm text-text-primary px-4 py-3 rounded-xl transition-all cursor-pointer"
                    >
                      <option value="1-15">1 - 15 jerseys</option>
                      <option value="15-30">15 - 30 jerseys</option>
                      <option value="30-100">30 - 100 jerseys</option>
                      <option value="100+">100+ jerseys</option>
                    </select>
                  </div>
                </div>

                {/* Requirements Description */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">Design Requirements</label>
                  <textarea
                    name="requirements"
                    rows={4}
                    value={formData.requirements}
                    onChange={handleInputChange}
                    className="bg-bg-tertiary/60 border border-border-color focus:border-accent-gold text-sm text-text-primary px-4 py-3 rounded-xl transition-all resize-none"
                    placeholder="Describe textures, styles, color ideas or specific logo instructions..."
                  />
                </div>

                {/* Logo upload (simulated attachment) */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">Upload logo (Optional)</label>
                  {formData.logoFile ? (
                    <div className="flex items-center justify-between bg-bg-tertiary/80 border border-emerald-500/25 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <img src={formData.logoFile} alt="uploaded logo" className="w-10 h-10 object-contain rounded bg-white/5 p-1" />
                        <span className="text-xs text-text-primary font-bold">Logo Attached Successfully</span>
                      </div>
                      <button
                        onClick={() => setFormData((prev) => ({ ...prev, logoFile: null }))}
                        className="text-[10px] text-red-400 hover:text-red-300 font-bold tracking-wider cursor-pointer"
                      >
                        REMOVE
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center gap-3 bg-bg-tertiary/40 border-2 border-dashed border-border-color hover:border-accent-gold px-4 py-4 rounded-xl cursor-pointer transition-colors group">
                      <Upload size={18} className="text-text-secondary group-hover:text-accent-gold transition-colors" />
                      <span className="text-xs font-semibold text-text-secondary group-hover:text-text-primary transition-colors">
                        Click to upload logo
                      </span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                    </label>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-accent-gold hover:bg-accent-gold-hover text-black font-display text-sm font-bold tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 glow-btn cursor-pointer disabled:opacity-50 disabled:pointer-events-none mt-2"
                >
                  {loading ? 'SENDING REQUEST...' : 'SEND REQUEST'}
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center text-text-secondary text-sm gap-3">
        <div className="w-8 h-8 border-2 border-accent-gold border-t-transparent rounded-full animate-spin" />
        LOADING WORKSPACE...
      </div>
    }>
      <ContactContent />
    </Suspense>
  );
}
