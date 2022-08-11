import useSWR from 'swr';

const getComments = (slug: string) => {
  const { data, error, mutate } = useSWR(`/comment/post/${slug}`);

  return {
    comments: data?.comments,
    mutate,
    loading: !error && !data,
    error: error,
  };
};

export default getComments;
