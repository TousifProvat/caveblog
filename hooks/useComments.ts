import useSWR from 'swr';

const useComments = (slug: string) => {
  const { data, error, mutate } = useSWR(
    slug !== 'undefined' ? `/comment/post/${slug}` : null
  );

  return {
    comments: data?.comments,
    mutate,
    loading: !error && !data,
    error: error,
  };
};

export default useComments;
