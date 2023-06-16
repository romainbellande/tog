import { FC, PropsWithChildren } from 'react';
import { Header } from './Header';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-gray-100 w-screen h-screen">
      <Header />
      {children}
    </div>
  );
};
