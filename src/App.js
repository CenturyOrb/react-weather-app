import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './components/phone-frame.css';
import SearchBar from './components/search.js';
import Info from './components/info.js';
import FiveDay from './components/5Day.js';

function App() {
	const api_key = '3cb9449ad382eea08832734e94a58749';
	const [currentData, setCurrentData] = useState({});
	const [fiveDayData, setFiveDayData] = useState({});
	const [city, setCity] = useState('');
	const url = `https://api.openweathermap.org/data/2.5/weather`;
	const urlFiveDay = `https://api.openweathermap.org/data/2.5/forecast`;
	const isFirstRender = useRef(true);

	// city gets changed -> re-renders -> useEffect(callback)
	// useEffect(callback, [...state] also runs when components mounts
	// axios get requst for current OWM and 5D OWM
	useEffect(() => {
		const fetchData = async () => {
			try {
				const currentResponse = await axios.get(url, {
                	params: { q: city, appid: api_key, units: 'imperial'}		
                });	
				const fiveDayResponse = await axios.get(urlFiveDay, {
					params: { q: city, appid: api_key, units: 'imperial'}
				});
				setCurrentData(currentResponse.data);
				setFiveDayData(fiveDayResponse.data);
			} catch (error)	{ console.error(error) }
		}
		// this section to avoid axios.get on first open
		if (!isFirstRender.current && city) fetchData();
		else isFirstRender.current = false;
	}, [city]);	
	
	return (
		<div className="phone-frame">
			<SearchBar searchCity={setCity}/>
			<Info data={currentData}/>
			<FiveDay data={fiveDayData}/>
		</div>
	);
}

export default App;
