import React, {useState} from 'react';
import axios from 'axios';
import './components/phone-frame.css';
import SearchBar from './components/search.js';
import Info from './components/info.js';


function App() {
	const api_key = '3cb9449ad382eea08832734e94a58749';
	const [data, setData] = useState({});	
	const [city, setCity] = useState('');
	const [conditionImg, setConditionImg] = useState('');
	const url = `https://api.openweathermap.org/data/2.5/weather`; 
	
	// Searches for using city parameter
	async function handleSearch(city) {
		// change city state
		setCity(city);
		try {
			// api call 	
			const dataResponse = await axios.get(url, {
				params: { q: city, appid: api_key, units: 'imperial' }
			});
			setData(dataResponse.data);
			setConditionImg(`https://openweathermap.org/img/wn/${dataResponse.data.weather[0].icon}@2x.png`);
		} catch (error) { console.error(error); }
		finally {setCity('');}
	}

  	return (
    	<div className="phone-frame">
			<SearchBar onSearch={handleSearch} onChange={setCity} location={city}/>
			<Info data={data} backgroundImg={conditionImg}/>			
		</div>
  	);
}

export default App;
