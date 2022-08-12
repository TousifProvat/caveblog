import useSWR from 'swr';

const useComments = (id: number) => {
  const { data, error, mutate } = useSWR(`/comment/post/${id}`);

  return {
    comments: data?.comments,
    mutate,
    loading: !error && !data,
    error: error,
  };
};

export default useComments;
