import type { Metadata } from "next";
import { Providers } from './providers';
import { Inter } from 'next/font/google';
import { CartButton } from '../components/CartButton';
import { CartModal } from '../components/CartModal';
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "E-commerce Product Gallery",
  description: "A modern e-commerce product gallery built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1000 }}>
            <CartButton />
          </div>
          <CartModal />
          {children}
        </Providers>
      </body>
    </html>
  );
}
