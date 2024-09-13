import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className=" bg-transparent text-black py-4 text-xl mt-7">
      <div className="container mx-auto flex justify-center items-center">
        <ul className="flex space-x-10 max-[390px]:space-x-1">
          <li>
            <Link to="/" className=" hover:bg-black hover:text-white rounded-md bg-white px-4 py-2">Feedback Form</Link>
          </li>
          <li>
            <Link to="/admin" className="hover:bg-black hover:text-white rounded-md bg-white px-4 py-2">Admin Records</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
