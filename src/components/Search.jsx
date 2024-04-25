import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiOutlineX } from 'react-icons/hi';

function Search() {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?q=${searchTerm}`
        );
        setOptions(response.data);
      } catch (error) {
        console.error(error);
        setOptions([]);
      }
    };

    if (searchTerm) {
      fetchOptions();
    } else {
      setOptions([]);
    }
  }, [searchTerm]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSearchTerm(option.title);
    setShowOptions(false);
  };

  return (
    <div className="flex justify-center font-poppins font-medium items-center h-screen bg-gradient-to-r from-purple-500 to-pink-500"  style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="w-full md:w-1/2 m-4 relative">
        <div className="relative">
          <input
            className="w-full h-16 shadow-2xl p-4 rounded-md shadow-sm shadow-white/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-pink-500 sm:text-sm"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowOptions(true)}
          />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedOption(null);
                setShowOptions(false);
              }}
              className="absolute top-0 right-0 h-full flex items-center px-4 text-gray-400 hover:text-gray-500"
            >
              <HiOutlineX className="h-5 w-5" />
            </button>
          )}
        </div>
        {showOptions && (
          <div className="absolute top-full mt-2 w-full bg-white shadow-white  rounded-md shadow-md max-h-48 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option.id}
                className={`cursor-pointer p-4 m-2 rounded-md hover:bg-pink-600 hover:text-white shadow-sm ${
                  selectedOption && selectedOption.id === option.id
                    ? 'bg-yellow-100'
                    : ''
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
