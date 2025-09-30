import { RootProvider } from 'fumadocs-ui/provider';
import { NextProvider } from 'fumadocs-core/framework/next';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import { Vazirmatn } from 'next/font/google';
import { i18n } from '@/lib/i18n';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const vazirMatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  variable: '--font-vazir',
});

export default async function LangLayout({ 
  children, 
  params 
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  // Determine if the locale is RTL
  const isRTL = ['fa', 'ar'].includes(lang);
  
  
  return (
    <html 
      lang={lang} 
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`${inter.variable} ${vazirMatn.variable}`}
      suppressHydrationWarning
    >
      <body className={`flex flex-col min-h-screen ${inter.variable} ${vazirMatn.variable} ${isRTL ? 'font-vazir' : 'font-inter'}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextProvider>
            <RootProvider i18n={{ ...i18n, locale: lang }}>
              {children}
            </RootProvider>
          </NextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
