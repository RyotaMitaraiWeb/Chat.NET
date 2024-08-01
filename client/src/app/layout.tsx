import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import 'normalize.css';
import { SnackbarContextProvider } from '@/hooks/useSnackbar/useSnackbar';
import Toolbar from '@/features/toolbar/Toolbar';
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const theme = cookies().get('theme')?.value || 'system';
  return (
    <html lang="en">
      <body className={`${inter.className} ${theme}`}>
        <SnackbarContextProvider>
          <Toolbar />
          <main>{children}</main>
        </SnackbarContextProvider>
      </body>
    </html>
  );
}
