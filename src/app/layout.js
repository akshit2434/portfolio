import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';

export const metadata = {
  title: 'Akshit | Portfolio',
  description: 'Personal portfolio showcasing my work and experience in software development',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
