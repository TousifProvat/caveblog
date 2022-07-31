import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-gray-50 pt-20 pb-5">
      <div className="mx-auto container">{children}</div>
    </div>
  );
};

export default Layout;
