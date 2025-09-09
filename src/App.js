import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './components/phone-frame.css';
import SearchBar from './components/search.js';
import Info from './components/info.js';
import FiveDay from './components/5Day.js';

function App() {
	const api_key = '3cb9449ad382eea08832734e94a58749';
	const [currentData, setCurrentData] = useState({});
	const [fiveDayData, setFiveDayData] = useState([]);
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
				// fiveDayResponse should handle all the filtering/reformatting
				const days = calculateFiveDay(fiveDayResponse.data.list, currentResponse.data);
				setFiveDayData(days);
			} catch (error)	{ console.error(error) }
		}
		// this section to avoid axios.get on first open
		if (!isFirstRender.current && city) fetchData();
		else isFirstRender.current = false;
	}, [city]);	

	useEffect(() => {
	}, [fiveDayData]);

	return (
		<div className="phone-frame">
			<SearchBar searchCity={setCity}/>
			<Info data={currentData} />
			<FiveDay data={fiveDayData}/>
		</div>
	);
}

const calculateFiveDay = (fiveDay, currentDay) => {
	const currentDayDate = new Date(currentDay.dt * 1000);
	let cumTemp = 0;
	let count = 0;
	// abstract needed data from currentDay (temp, weekday, icon);
	const days = [{ 
		temp: Math.round(currentDay.main.temp),
		weekday: currentDayDate.toLocaleDateString('en-US', { weekday: 'short' }),
		icon: currentDay.weather[0].icon
	}];
	
	const removedCurrentDay = fiveDay.filter(day => {
		return new Date(day.dt * 1000).toDateString() !== new Date().toDateString();
	});	

	removedCurrentDay.forEach((day, index, arr) => {
    	const curr = new Date(day.dt * 1000);
    	
    	if (!index) { // first day of the array (index = 0)
    		cumTemp = day.main.temp;
    		count = 1;
    	} else if (curr.toDateString() !== new Date(arr[index-1].dt * 1000).toDateString()) { 
    		const prevDay = new Date(arr[index-1].dt * 1000);
    		days.push({
    			temp: Math.round(cumTemp / count),
    			weekday: prevDay.toLocaleDateString('en-US', { weekday: 'short' }),
    			icon: arr[index-1].weather[0].icon
    		});
    		cumTemp = day.main.temp;
    		count = 1;
    	} else {
    		cumTemp += day.main.temp;	
    		count++;
    	}	
    });

	return days;
}

export default App
