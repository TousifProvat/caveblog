import Image from 'next/image';
import React, {
  FunctionComponent,
  SyntheticEvent,
  useRef,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import useOutsideClick from '../hooks/useOutsideClick';
import Spinner from './Spinner';

interface PropTypes {
  autoFocus?: boolean;
  onSubmit: Function;
  session: any;
  loading: boolean;
  type?: string;
  initValue?: string;
}

const CommentForm: FunctionComponent<PropTypes> = ({
  autoFocus = false,
  onSubmit,
  session,
  loading,
  type,
  initValue = '',
}) => {
  const ref = useRef<any>(null);
  useOutsideClick(ref, () => setFormFocus(false));

  const [formFocus, setFormFocus] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(initValue);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (message === '') return alert('Comment cannot be empty');
    onSubmit(message).then(() => type !== 'update' && setMessage(''));
  };

  return (
    <form
      className="add-comment-section flex flex-col space-y-2"
      onSubmit={handleSubmit}
      ref={ref}
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
          autoFocus={autoFocus}
          placeholder="Add Comment..."
          className={`comment-box w-[90%] h-${
            formFocus ? '36' : '20'
          } border-[1px] rounded-md border-gray-300 outline-none focus:border-blue-500 px-2 py-1 placeholder:font-light resize-y min-h-[100px]`}
          onFocus={(e) => {
            e.target.setSelectionRange(message.length, message.length);
            setFormFocus(true);
          }}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          required
        ></textarea>
      </div>
      {formFocus && (
        <button
          className="comment-submit-button px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md w-20 ml-[3rem] text-white"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <Spinner size={5} />
          ) : type !== 'update' ? (
            'Submit'
          ) : (
            'Update'
          )}
        </button>
      )}
    </form>
  );
};

export default CommentForm;
