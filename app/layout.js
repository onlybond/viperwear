import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata = {
  title: 'VIPER WEAR - Premium Custom Sportswear & Jerseys',
  description: 'Design and customize your own professional grade sportswear and jerseys. Unlimited customization, premium quality fabrics, and fast turnaround.',
  keywords: 'custom sportswear, custom jersey, custom team uniform, soccer jersey design, football jersey customizer, VIPER WEAR',
  metadataBase: new URL('https://viperwear.in'),
  openGraph: {
    title: 'VIPER WEAR - Premium Custom Sportswear & Jerseys',
    description: 'Design and customize your own professional grade sportswear and jerseys. Premium quality fabrics, and fast turnaround.',
    type: 'website',
    locale: 'en_IN',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
