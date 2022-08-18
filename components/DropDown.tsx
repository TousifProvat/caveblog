import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import useOutsideClick from '../hooks/useOutsideClick';

interface PropTypes {
  icon: any;
  menus: any[];
}

const DropDown = ({ icon, menus = [] }: PropTypes) => {
  const router = useRouter();

  const [show, setShow] = useState<boolean>(false);
  const ref = useRef<any>(null);

  // detects outside click and sets the dropdown show to false
  useOutsideClick(ref, () => setShow(false));

  useEffect(() => {
    setShow(false);
  }, [router.pathname]);

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setShow((prev) => !prev)} className="cursor-pointer">
        {icon}
      </div>
      {show && (
        <ul className="nav-links absolute bg-white shadow-md top-[3rem] min-w-[180px] right-0  p-2 rounded-md space-y-3 z-10">
          {menus.map((menu, index) => (
            <React.Fragment key={index}>{menu}</React.Fragment>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
