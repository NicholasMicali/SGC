import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex rounded-full w-full mx-auto my-4 space-x-4 bg-transparent">
  <input
    type="text"
    placeholder=" ⌕ Search for code"
    value={searchTerm}
    onChange={handleInputChange}
    className="flex-grow p-2 rounded-full focus:outline-none border border-blue-300 bg-blue-50 placeholder-blue-300"
  />
  <button
    type="submit"
    className="ml-1 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-300"
  >
    ✓
  </button>
</form>
  );
};
export default SearchBar;