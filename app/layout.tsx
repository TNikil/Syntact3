import type { Metadata } from 'next';
import Script from 'next/script'; // Added for script injection
import './globals.css';

export const metadata: Metadata = {
  title: 'Syntact³ Studio',
  description:
    'Syntac is a boutique creative studio crafting bold digital experiences — from pixel-perfect designs to powerful web builds.',
  openGraph: {
    title: 'Syntac Studio',
    description: 'We design. We build. We deliver.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Forces Google's auto banner widgets to remain hidden */}
        <style>{`
          .skiptranslate, .goog-te-banner-frame { display: none !important; }
          body { top: 0px !important; }
          .goog-te-gadget { display: none !important; }
        `}</style>
      </head>
      <body>
        {children}
        
        {/* Asynchronously loads the hidden translation core */}
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
