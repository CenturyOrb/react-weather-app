import { useState } from 'react';
import './styles/searchbar.css'

const SearchBar = ({ searchCity }) => {
	// (1) controlled component for input box (good practice)
	// (2) searches things on enter
	const [cityValue, setCityValue]	= useState('');

	// handles Entering. prompts to search for city and it's data
	const handleKeyPress = event =>  { 
		if (event.key === 'Enter' && cityValue) {
			searchCity(cityValue)
			setCityValue('');
		}
	}
	
	// for controlled input component
	const handleChange = event => setCityValue(event.target.value)
	
	return (
		<div id="city-form"> 
			<input 
				id="city-search" 
				type="text" 
				placeholder="Search city..."
				value={cityValue}
				onKeyDown={handleKeyPress}
				onChange={handleChange}
			/>
		</div>				
	);
}

export default SearchBar;
