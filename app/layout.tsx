import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Foundation — A 6-Week Program with Natasha Berness',
  description:
    'You don\'t have a parasite problem. You have a foundation problem. A 6-week educational program to build the foundation your body needs to cleanse safely — and keep results. Not medical advice.',
  openGraph: {
    title: 'The Foundation',
    description:
      'A 6-week educational program to build the foundation your body needs to cleanse safely — and keep results.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
