import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-green-400 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-white text-lg font-bold">
          OMDB Movie Search
        </Link>
        <div>
          <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Home</Link>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
