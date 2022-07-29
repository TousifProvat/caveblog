import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="w-full h-16 flex items-center justify-center bg-white shadow-sm fixed">
      <div className="flex justify-between items-center w-full max-w-7xl">
        <div className="left-side flex space-x-2">
          <div className="logo px-1 py-2 bg-blue-500 rounded">
            <Link href={'/'}>
              <a>
                <h2 className="text-xl font-extrabold text-white">Cave.Blog</h2>
              </a>
            </Link>
          </div>
          {/* <div>
            <input
              type="text"
              placeholder="Search..."
              className="rounded h-11 bg-white outline-none border border-gray-200 hover:border-gray-300 px-2 focus:border-blue-500 placeholder:text-gray-600"
            />
          </div> */}
        </div>
        <nav className="right-side">
          <ul className="flex space-x-4 text-l items-center">
            <li>
              <Link href="/">
                <a>Feed</a>
              </Link>
            </li>
            <li>
              <Link href="/login">
                <a className="hover:bg-blue-200 hover:text-blue-500 px-3 py-3 rounded">
                  Login
                </a>
              </Link>
            </li>
            <li>
              <Link href={'/register'}>
                <a className="px-3 py-3 border rounded border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
                  Create Account
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
