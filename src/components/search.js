import React from 'react';
import './styles/searchbar.css'

const SearchBar = ({onSearch, onChange, location}) => {
	function handleKeyPress(event) {
		// check if user "Enters" then run handleSearch of parent
		// if not then still update city
		if (event.key === "Enter") onSearch(location);
	}
	
	// controlled component change call
	function handleChange(event) {
		onChange(event.target.value);
	}

	return (
		<div id="city-form"> 
			<input 
				id="city-search" 
				type="text" 
				placeholder="Search city..."
				value={location}
				onKeyDown={handleKeyPress}
				onChange={handleChange}
			/>
		</div>				
	);
}

export default SearchBar;
