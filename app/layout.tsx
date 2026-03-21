import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { SmoothScroller } from '@/components/smooth-scroller';
import { CustomCursor } from '@/components/custom-cursor';
import { ThemeProvider } from '@/components/theme-provider';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { ScrollProgress } from '@/components/scroll-progress';
import { ConvexClientProvider } from '@/components/convex-client-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DeeTours | Curated Travel Experiences',
  description: 'To remove the complexity of travel planning and replace it with curated journeys that are safe, meaningful, and transformative.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`} suppressHydrationWarning>
      <body className="antialiased font-body bg-background text-foreground min-h-screen flex flex-col cursor-none">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ConvexClientProvider>
            <CustomCursor />
            <WhatsAppButton />
            <ScrollProgress />
            <SmoothScroller>
              {children}
            </SmoothScroller>
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

