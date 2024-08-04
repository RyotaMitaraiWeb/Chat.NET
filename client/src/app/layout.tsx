import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import 'normalize.css';
import { SnackbarContextProvider } from '@/hooks/useSnackbar/useSnackbar';
import Toolbar from '@/features/toolbar/Toolbar';
import { cookies } from 'next/headers';
import App from './App';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const theme = cookies().get('theme')?.value || 'system';
  const animations = cookies().get('animations')?.value || 'system';

  return (
    <html lang="en">
      <body className={`${inter.className} ${theme} animations-${animations}`}>
        <SnackbarContextProvider>
          <Toolbar />
          <App>{children}</App>
        </SnackbarContextProvider>
      </body>
    </html>
  );
}
