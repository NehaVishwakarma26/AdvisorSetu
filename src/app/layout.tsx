import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'AdvisorSetu – Connect with Top Financial Advisors',
  description: 'India\'s most trusted platform to connect investors with SEBI-registered financial advisors and mutual fund distributors.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
