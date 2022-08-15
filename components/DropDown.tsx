import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface PropTypes {
  icon: any;
  menus: any[];
}

const DropDown = ({ icon, menus = [] }: PropTypes) => {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setShow(false);
  }, [router.pathname]);

  return (
    <div className="relative" onBlur={() => setShow(false)}>
      <div onClick={() => setShow((prev) => !prev)} className="cursor-pointer">
        {icon}
      </div>
      {show && (
        <ul className="nav-links absolute bg-gray-50 shadow-md top-[3rem] w-[95%] md:w-[300px] right-[50%] md:right-0 md:translate-x-0 translate-x-[50%] p-2 rounded-md space-y-3 z-10">
          {menus.map((menu, index) => (
            <React.Fragment key={index}>{menu}</React.Fragment>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
