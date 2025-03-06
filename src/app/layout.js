import './globals.css';

export const metadata = {
  title: 'Akshit | Portfolio',
  description: 'Personal portfolio showcasing my work and experience in software development',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
