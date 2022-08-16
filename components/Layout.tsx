import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-5">
      <Toaster />
      <div className="mx-auto container">{children}</div>
    </div>
  );
};

export default Layout;
