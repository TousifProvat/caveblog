import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto">{children}</div>
    </div>
  );
};

export default Layout;
