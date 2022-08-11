import type { GetServerSideProps, NextPage } from 'next';
import Card from '../components/Card';
import { server } from '../config';
import { postTypes } from '../types';

interface PropTypes {
  posts: postTypes[];
}

const Home: NextPage<PropTypes> = ({ posts }) => {
  return (
    <div className="h-fit pb-5 pt-10">
      <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {posts.map((post, index) => (
          <Card key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${server}/post`);
  const data = await res.json();

  return {
    props: {
      posts: data.posts,
    },
  };
};
