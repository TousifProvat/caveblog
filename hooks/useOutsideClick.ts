import { useEffect } from 'react';

const useOutsideClick = (ref: HTMLElement | any, callback: Function) => {
  useEffect(() => {
    function handleOutsideClick(e: any): any {
      if (ref.current && !ref.current.contains(e.target)) {
        callback && callback();
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [ref]);
};

export default useOutsideClick;
