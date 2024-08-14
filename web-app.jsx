import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTwitter, FaFacebook } from 'react-icons/fa';

const SearchComponent = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyapi.online/api/users');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    if (searchTerm === '') {
      setSuggestions([]);
    } else {
      const filteredSuggestions = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  }, [searchTerm, data]);


  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>

      <header style={{ backgroundColor: '#4CAF50', padding: '10px', textAlign: 'center', color: 'white' }}>
        <h1>Search Application</h1>
      </header>


      <div style={{ padding: '20px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleChange}
          style={{ padding: '10px', width: '80%', fontSize: '16px' }}
        />
      </div>


      <div style={{ padding: '20px' }}>
        <ul>
          {suggestions.map((item, index) => (
            <li key={index} style={{ margin: '5px 0', fontSize: '18px' }}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <footer style={{ padding: '10px', backgroundColor: '#4CAF50', color: '#fff', position: 'fixed', width: '100%', bottom: '0' }}>
        <p style={{ textAlign: 'center' }}>© contact us</p>
        <div style={{ textAlign: 'center' }}>
          <FaTwitter />
          <FaFacebook />
        </div>
      </footer>
    </div>
  );
};
export default SearchComponent;
