'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail, Phone, MapPin, Send, MessageCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import JerseyPreview, { JerseyDesignState } from '@/components/JerseyCustomizer/JerseyPreview';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// --- Normal Form Schema ---
const normalFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

// --- Customizer Form Schema ---
const customizerFormSchema = z.object({
  teamName: z.string().min(2, { message: "Team name must be at least 2 characters." }),
  yourName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  sport: z.string(),
  quantity: z.string(),
  logoLink: z.string().optional(),
});

function ContactContent() {
  const searchParams = useSearchParams();
  const cameFromStudio = searchParams.get('ref') === 'customizer';

  const [customDesign, setCustomDesign] = useState<JerseyDesignState | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('viper_custom_design');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as JerseyDesignState;
        setCustomDesign(parsed);
      } catch (err) {
        console.error('Failed to parse saved design:', err);
      }
    }
  }, []);

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
        {/* Left Side */}
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

          <div className="flex flex-col gap-4 mt-6">
            <a
              href="https://wa.me/919885039653"
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
                <span>+91 98850 39653</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-accent-gold" />
                <span>support@shopviper.in</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-accent-gold" />
                <span>Hyderabad, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="lg:col-span-7 flex flex-col gap-6 animate-fade-in delay-200">
          
          {cameFromStudio && customDesign ? (
            <CustomizerFormView customDesign={customDesign} onRemove={() => setCustomDesign(null)} />
          ) : (
            <NormalFormView />
          )}

        </div>
      </div>
    </div>
  );
}

// --- NORMAL FORM COMPONENT ---
function NormalFormView() {
  const form = useForm<z.infer<typeof normalFormSchema>>({
    resolver: zodResolver(normalFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof normalFormSchema>) => {
    const text = `Hello! I have an inquiry:
*Name:* ${values.name}
*Email:* ${values.email}
*Phone:* ${values.phone}
*Message:* ${values.message}`;
    
    const encodedMessage = encodeURIComponent(text);
    window.open(`https://wa.me/919885039653?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="glass-panel border border-white/5 rounded-2xl p-6 sm:p-8 relative min-h-[480px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h3 className="font-display text-base font-bold tracking-wider text-text-primary">
              CONTACT US
            </h3>
            <p className="text-[10px] text-text-muted font-bold tracking-wider uppercase">
              Send us a message and we'll get back to you
            </p>
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 space-y-0">
                <FormLabel className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">Your Name</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    className="bg-bg-tertiary/60 border border-border-color focus:border-accent-gold focus:outline-none text-sm text-text-primary px-4 py-3 rounded-xl transition-all"
                    placeholder="e.g. Rohit Sharma"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2 space-y-0">
                  <FormLabel className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">Email Address</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="email"
                      className="bg-bg-tertiary/60 border border-border-color focus:border-accent-gold focus:outline-none text-sm text-text-primary px-4 py-3 rounded-xl transition-all"
                      placeholder="name@domain.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2 space-y-0">
                  <FormLabel className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">Phone Number</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="tel"
                      className="bg-bg-tertiary/60 border border-border-color focus:border-accent-gold focus:outline-none text-sm text-text-primary px-4 py-3 rounded-xl transition-all"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 space-y-0">
                <FormLabel className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">Message</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    rows={5}
                    className="bg-bg-tertiary/60 border border-border-color focus:border-accent-gold focus:outline-none text-sm text-text-primary px-4 py-3 rounded-xl transition-all resize-none"
                    placeholder="How can we help you?"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            className="bg-accent-gold hover:bg-accent-gold-hover text-black font-display text-sm font-bold tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 glow-btn cursor-pointer mt-2"
          >
            SEND MESSAGE
            <Send size={16} />
          </button>
        </form>
      </Form>
    </div>
  );
}

// --- CUSTOMIZER FORM COMPONENT ---
function CustomizerFormView({ customDesign, onRemove }: { customDesign: JerseyDesignState; onRemove: () => void }) {
  const form = useForm<z.infer<typeof customizerFormSchema>>({
    resolver: zodResolver(customizerFormSchema),
    defaultValues: {
      teamName: customDesign.text.content || "",
      yourName: "",
      email: "",
      phone: "",
      sport: "football",
      quantity: "15-30",
      logoLink: "",
    },
  });

  const onSubmit = (values: z.infer<typeof customizerFormSchema>) => {
    const customizerInfo = `Text: "${customDesign.text.content}", Number: "${customDesign.number.content}", Pattern: "${customDesign.pattern}", Primary: "${customDesign.colors.primary}", Secondary: "${customDesign.colors.secondary}"`;

    const text = `Hello, I'd like to request a custom jersey quote:
*Name:* ${values.yourName}
*Team:* ${values.teamName}
*Email:* ${values.email}
*Phone:* ${values.phone}
*Sport:* ${values.sport}
*Quantity:* ${values.quantity}
*Requirements:* ${customizerInfo}
${values.logoLink ? `*Logo Link:* ${values.logoLink}` : '*Logo:* Will share logo files on WhatsApp.'}`;

    const encodedMessage = encodeURIComponent(text);
    window.open(`https://wa.me/919885039653?text=${encodedMessage}`, '_blank');
    localStorage.removeItem('viper_custom_design');
  };

  return (
    <>
      <div className="bg-accent-gold/5 border border-accent-gold/25 rounded-2xl p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
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
          type="button"
          onClick={onRemove}
          className="text-[9px] font-bold text-red-400 hover:text-red-300 tracking-wider flex-shrink-0 cursor-pointer"
        >
          REMOVE
        </button>
      </div>

      <div className="glass-panel border border-white/5 rounded-2xl p-6 sm:p-8 relative min-h-[480px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-base font-bold tracking-wider text-text-primary">
                TELL US ABOUT YOUR REQUIREMENT
              </h3>
              <p className="text-[10px] text-text-muted font-bold tracking-wider uppercase">
                Fill out the fields to receive custom quote
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="teamName"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 space-y-0">
                    <FormLabel className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">Team / Organization</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        className="bg-bg-tertiary/60 border border-border-color focus:border-accent-gold focus:outline-none text-sm text-text-primary px-4 py-3 rounded-xl transition-all"
                        placeholder="e.g. Warriors FC"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="yourName"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 space-y-0">
                    <FormLabel className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">Your Name</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        className="bg-bg-tertiary/60 border border-border-color focus:border-accent-gold focus:outline-none text-sm text-text-primary px-4 py-3 rounded-xl transition-all"
                        placeholder="e.g. Rohit Sharma"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 space-y-0">
                    <FormLabel className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">Email Address</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        type="email"
                        className="bg-bg-tertiary/60 border border-border-color focus:border-accent-gold focus:outline-none text-sm text-text-primary px-4 py-3 rounded-xl transition-all"
                        placeholder="name@domain.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 space-y-0">
                    <FormLabel className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">Phone Number</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        type="tel"
                        className="bg-bg-tertiary/60 border border-border-color focus:border-accent-gold focus:outline-none text-sm text-text-primary px-4 py-3 rounded-xl transition-all"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sport"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 space-y-0">
                    <FormLabel className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">Select Sport</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="bg-bg-tertiary/60 border border-border-color focus:border-accent-gold focus:outline-none text-sm text-text-primary px-4 py-3 rounded-xl transition-all cursor-pointer"
                      >
                        <option value="football">Football / Soccer</option>
                        <option value="cricket">Cricket</option>
                        <option value="basketball">Basketball</option>
                        <option value="kabaddi">Kabaddi</option>
                        <option value="other">Other Sports</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 space-y-0">
                    <FormLabel className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">Estimated Quantity</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="bg-bg-tertiary/60 border border-border-color focus:border-accent-gold focus:outline-none text-sm text-text-primary px-4 py-3 rounded-xl transition-all cursor-pointer"
                      >
                        <option value="1-15">1 - 15 jerseys</option>
                        <option value="15-30">15 - 30 jerseys</option>
                        <option value="30-100">30 - 100 jerseys</option>
                        <option value="100+">100+ jerseys</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="bg-bg-secondary/40 border border-border-color p-4 rounded-xl flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <div className="bg-accent-gold/10 p-1.5 rounded-lg text-accent-gold mt-0.5">
                  <MessageCircle size={14} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-text-primary">Have a logo?</span>
                  <span className="text-[11px] text-text-secondary leading-relaxed">
                    You can paste a link to your logo below (Google Drive, Dropbox, etc.), or simply send the logo files to us on WhatsApp after you submit this form!
                  </span>
                </div>
              </div>
              <FormField
                control={form.control}
                name="logoLink"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1 space-y-0 mt-1">
                    <FormControl>
                      <input
                        {...field}
                        className="bg-bg-tertiary border border-border-color focus:border-accent-gold focus:outline-none text-xs text-text-primary px-3 py-2.5 rounded-lg transition-all"
                        placeholder="Paste logo link here (Optional)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <button
              type="submit"
              className="bg-accent-gold hover:bg-accent-gold-hover text-black font-display text-sm font-bold tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 glow-btn cursor-pointer mt-2"
            >
              SEND REQUEST
              <Send size={16} />
            </button>
          </form>
        </Form>
      </div>
    </>
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
