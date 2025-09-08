import { useEffect, useState } from 'react'
import DayForecast from './DayForecast.js'
import './styles/5Day.css'

const FiveDay = ( { data }) => {
	const [fiveDayForecast, setFiveDayForecast] = useState([]);
	
	useEffect(() => {
		// seperate weather data by day from array
		if (!data?.list) return;
		const daysData = data.list;
		// now create new Objects based off of 
		calculateFiveDay(data.list, setFiveDayForecast);
	}, [data]);
	
	// make new component for individual forecast day
	return(	
		<div id='five-day'>				
		</div>
	);	
}

const calculateFiveDay = (daysData, forecastSetter) => {
	let cumTemp = 0;
	let count = 0;
	const days = [];

	const removedCurrentDay = daysData.filter(day => {
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
				weekday: prevDay.toLocaleDateString('en-US', { weekday: 'long' })
			});
			cumTemp = day.main.temp;
			count = 1;
		} else {
			cumTemp += day.main.temp;	
			count++;
		}	
	});
	
	console.log(days);
}

export default FiveDay;
