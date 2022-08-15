import Image from 'next/image';
import React, { FunctionComponent, SyntheticEvent, useState } from 'react';
import Spinner from './Spinner';

interface PropTypes {
  onSubmit: Function;
  session: any;
  loading: boolean;
}

const CommentForm: FunctionComponent<PropTypes> = ({
  onSubmit,
  session,
  loading,
}) => {
  const [formFocus, setFormFocus] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit(message).then(() => setMessage(''));
  };

  return (
    <form
      className="add-comment-section flex flex-col space-y-2"
      onSubmit={handleSubmit}
    >
      <div className="comment-box flex space-x-2">
        <div className="profile-avatar w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
          {session?.user?.image && (
            <Image
              priority
              src={session.user.image}
              width={40}
              height={40}
              alt={session.user.name!}
            />
          )}
        </div>
        <textarea
          placeholder="Add Comment..."
          className={`comment-box w-[90%] h-${
            formFocus ? '36' : '20'
          } border-[1px] rounded-md border-gray-300 outline-none focus:border-blue-500 px-2 py-1 placeholder:font-light resize-y min-h-[100px]`}
          onFocus={() => setFormFocus(true)}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          required
        ></textarea>
      </div>
      {formFocus && (
        <button
          className="comment-submit-button px-4 py-2 bg-blue-400 hover:bg-blue-500 rounded-md w-20 ml-[3rem] text-white"
          type="submit"
          disabled={loading}
        >
          {loading ? <Spinner /> : 'Submit'}
        </button>
      )}
    </form>
  );
};

export default CommentForm;
