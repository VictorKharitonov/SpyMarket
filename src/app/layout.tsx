import type { Metadata } from 'next';
import { ReactNode } from 'react';

import './globals.css';
import App from '@/components/App';

export const metadata: Metadata = {
  title: 'Мониторинг торговых площадок',
  description:
    'Отслеживание изменения и наличия товаров на популярных торговых площадках в реальном времени. Легко добавляйте, удаляйте и управляйте отслеживаемыми ссылками.'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <App>{children}</App>
      </body>
    </html>
  );
}
