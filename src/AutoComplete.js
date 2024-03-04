import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Autocomplete = () => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setTimeoutId(
      setTimeout(() => {
        if (inputValue.trim() !== '') {
          fetchOptions();
        }
      }, 4000)
    );

    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue]);

  const fetchOptions = () => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setOptions(response.data.map(user => user.name));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type here..."
      />
      <ul>
        {filteredOptions.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
