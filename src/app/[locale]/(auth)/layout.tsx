import Providers from '@/components/providers';
import { getMessages } from 'next-intl/server';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();

  return (
    <Providers messages={messages}>
      {children}
    </Providers>
  );
}