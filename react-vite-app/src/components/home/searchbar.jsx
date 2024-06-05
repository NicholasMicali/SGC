import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {animateSideFadeIn} from "../../constants/anim";
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
  <motion.input
    {...animateSideFadeIn(true)}
    type="text"
    placeholder="Search for code"
    value={searchTerm}
    onChange={handleInputChange}
    className="flex-grow px-6 py-2 rounded-full focus:outline-none border border-blue-300 bg-blue-50 placeholder-blue-300"
  />
  <motion.button
    type="submit"
    className="ml-1 px-4 bg-blue-500 text-white rounded-full "
    whileTap = {{ scale: 0.8 }}
    whileHover={{scale: 1.1, backgroundColor: "#2563EB"}}
    {...animateSideFadeIn(false)}
  >
    ✓
  </motion.button>
</form>
  );
};
export default SearchBar;