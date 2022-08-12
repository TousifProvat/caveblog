import Head from 'next/head';
import React, { FunctionComponent, ReactNode } from 'react';

interface PropTypes {
  title: string;
  children: ReactNode;
}

const PageHead: FunctionComponent<PropTypes> = ({ title, children }) => {
  return (
    <Head>
      <title>{title}</title>
      {children}
    </Head>
  );
};

export default PageHead;
