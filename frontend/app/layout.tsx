import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OwnFashion - High-End Editorial',
  description: 'A digital destination for the modern minimalist. Curating the finest in high-end editorial fashion, seasonal trends, and timeless essentials.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <meta name="p:domain_verify" content="a2d3046d043448b327e624ddd3d9b06b" />
      </head>
      <body>{children}</body>
    </html>
  );
}
