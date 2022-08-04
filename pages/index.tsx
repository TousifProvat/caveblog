import type { NextPage } from 'next';
import Card from '../components/Card';

const Home = () => {
  return (
    <div className="h-fit pb-5 pt-10">
      <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

Home.public = true;

export default Home;
