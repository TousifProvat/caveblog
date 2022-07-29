import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className="w-100 bg-blue-200">
      <h1 className="text-center font-bold text-2xl mt-5 text-blue-500">
        Hello
      </h1>
    </div>
  );
};

export default Home;
