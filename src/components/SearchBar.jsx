import { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value); // Call search immediately on every keystroke
    };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

    return (
    <div className="search-bar">
      <form className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search Pokemon by name... "
            value={searchTerm}
            onChange={handleInputChange}
            className="search-input"
          />
          {searchTerm && (
            <button 
              type="button" 
              onClick={handleClear}
              className="clear-button"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;