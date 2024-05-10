import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import Navbar from '@/components/navbar/Navbar';
import Main from '@/components/Main';
import Provider from '@/components/Provider';
import { authConfig } from '@/configs/auth';

interface AppProps {
  children: ReactNode;
}

const App = async ({ children }: AppProps) => {
  const session = await getServerSession(authConfig);

  return (
    <Provider session={session}>
      <Navbar />
      <Main>{children}</Main>
    </Provider>
  );
};

export default App;
