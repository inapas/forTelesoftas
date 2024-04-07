import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';

const SearchComponent = ({ onSearch }) => {
  const [input, setInput] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  // Effect for debouncing search value
  useEffect(() => {
    const handler = debounce((nextValue) => {
      setDebouncedValue(nextValue);
    }, 200);

    if (input.length >= 3) {
      handler(input);
    } else {
      setDebouncedValue('');
    }

    return () => {
      handler.cancel();
    };
  }, [input]); 

  useEffect(() => {
    if (debouncedValue) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch]); 

  return (
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Search..."
    />
  );
};

export default SearchComponent;
