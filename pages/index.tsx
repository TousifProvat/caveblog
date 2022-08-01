import type { NextPage } from 'next';
import Card from '../components/Card';

const Home: NextPage = () => {
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

export default Home;
