import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-color pt-20 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.5fr_3fr] gap-16 pb-16">
        {/* Brand Section */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col line-height-[0.9]">
            <span className="font-varsity text-4xl font-extrabold tracking-wider text-text-primary">
              VIPER
            </span>
            <span className="font-sans text-sm font-bold tracking-[6px] text-accent-gold -mt-1">
              WEAR
            </span>
          </div>
          <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
            We don't just make jerseys. We build identity. Premium custom sportswear engineered for champions.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-bg-tertiary border border-border-color text-text-secondary w-9 h-9 rounded-full flex items-center justify-center hover:bg-accent-gold hover:text-black hover:border-accent-gold hover:-translate-y-1 transition-all cursor-pointer"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-bg-tertiary border border-border-color text-text-secondary w-9 h-9 rounded-full flex items-center justify-center hover:bg-accent-gold hover:text-black hover:border-accent-gold hover:-translate-y-1 transition-all cursor-pointer"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-bg-tertiary border border-border-color text-text-secondary w-9 h-9 rounded-full flex items-center justify-center hover:bg-accent-gold hover:text-black hover:border-accent-gold hover:-translate-y-1 transition-all cursor-pointer"
              aria-label="YouTube"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.528 3.545 12 3.545 12 3.545s-7.528 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.022 0 12 0 12s0 3.978.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.86.508 9.388.508 9.388.508s7.528 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.978 24 12 24 12s0-3.978-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-bg-tertiary border border-border-color text-text-secondary w-9 h-9 rounded-full flex items-center justify-center hover:bg-accent-gold hover:text-black hover:border-accent-gold hover:-translate-y-1 transition-all cursor-pointer"
              aria-label="Twitter"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h3 className="font-display text-xs font-bold tracking-wider text-text-primary">
              QUICK LINKS
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-text-secondary">
              <li>
                <Link href="/" className="hover:text-accent-gold hover:pl-1 transition-all">Home</Link>
              </li>
              <li>
                <Link href="/#store" className="hover:text-accent-gold hover:pl-1 transition-all">Store</Link>
              </li>
              <li>
                <Link href="/customize" className="hover:text-accent-gold hover:pl-1 transition-all">Customize</Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-accent-gold hover:pl-1 transition-all">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent-gold hover:pl-1 transition-all">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="flex flex-col gap-6">
            <h3 className="font-display text-xs font-bold tracking-wider text-text-primary">
              HELP
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-text-secondary">
              <li>
                <Link href="/help/size-guide" className="hover:text-accent-gold hover:pl-1 transition-all">Size Guide</Link>
              </li>
              <li>
                <Link href="/help/how-it-works" className="hover:text-accent-gold hover:pl-1 transition-all">How It Works</Link>
              </li>
              <li>
                <Link href="/help/faq" className="hover:text-accent-gold hover:pl-1 transition-all">FAQ</Link>
              </li>
              <li>
                <Link href="/help/shipping" className="hover:text-accent-gold hover:pl-1 transition-all">Shipping & Returns</Link>
              </li>
              <li>
                <Link href="/help/track-order" className="hover:text-accent-gold hover:pl-1 transition-all">Track Order</Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className="flex flex-col gap-6">
            <h3 className="font-display text-xs font-bold tracking-wider text-text-primary">
              POLICIES
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-text-secondary">
              <li>
                <Link href="/policies/terms" className="hover:text-accent-gold hover:pl-1 transition-all">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="hover:text-accent-gold hover:pl-1 transition-all">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/policies/refund" className="hover:text-accent-gold hover:pl-1 transition-all">Refund Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-6">
            <h3 className="font-display text-xs font-bold tracking-wider text-text-primary">
              CONTACT
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-text-secondary">
              <li className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">Phone:</span>
                <a href="tel:+919876543210" className="hover:text-accent-gold transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">Email:</span>
                <a href="mailto:info@viperwear.in" className="hover:text-accent-gold transition-colors">info@viperwear.in</a>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">Location:</span>
                <span>Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-border-color bg-black/40 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-text-muted">
          <p>&copy; {new Date().getFullYear()} ViperWear. All rights reserved.</p>
          <p>Crafted for premium performance.</p>
        </div>
      </div>
    </footer>
  );
}
