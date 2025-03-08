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
    <html lang="en" className={playfair.variable}>
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
