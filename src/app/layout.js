import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import { LoadingProvider } from '../context/LoadingContext';
import Loader from '../components/Loader';
import { Playfair_Display } from 'next/font/google';
import { metadata } from './metadata';
import { Content } from '../components/Content';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair'
});

export { metadata };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={playfair.variable} data-theme="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="/_next/static/css/app/globals.css"
          as="style"
          importance="high"
          fetchPriority="high"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <LoadingProvider>
          <ThemeProvider>
            <Loader />
            <Content>{children}</Content>
          </ThemeProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
