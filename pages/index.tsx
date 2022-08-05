import type { GetServerSideProps, NextPage } from 'next';
import Card from '../components/Card';
import axios from '../lib/axios';

interface authorType {
  name: string;
  username: string;
  image: string;
}

interface postType {
  authorId: String;
  body: string;
  id: number;
  slug: string;
  title: string;
  author: authorType;
}

interface homePropsType {
  posts: postType[];
}

const Home = ({ posts }: homePropsType) => {
  return (
    <div className="h-fit pb-5 pt-10">
      <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {posts.map((post, index) => (
          <Card
            key={index}
            name={post.author.name}
            title={post.title}
            image={post.author.image}
            slug={post.slug}
          />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await axios.get('/post');

  return {
    props: {
      posts: data.posts,
    },
  };
};

Home.public = true;

export default Home;
