import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Syntac Studio — Web Dev & Graphic Design',
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
      <body>{children}</body>
    </html>
  );
}
