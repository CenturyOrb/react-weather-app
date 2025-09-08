import { useEffect } from 'react'
import './styles/5Day.css'

const FiveDay = ( { data }) => {
	let days; 
	useEffect(() => {
		// seperate weather data by day from array
		if (!data?.list) return;
		const daysData = data.list;
		days = daysData.map(day => {
			const date = new Date(day.dt * 1000);
			return date.getDate();	
		});

		calculateFiveDay(days, data.list);
	
		// now create new Objects based off of 
	}, [data]);

	return(	
		<div id='five-day'>				
			
		</div>
	);	
}

const calculateFiveDay = (daysArray, daysData) => {
	const fiveDay = [];
	let currSum = 0;
	let count = 0;
	daysData.forEach((day, index) => {
		const date = new Date(day.dt * 1000);
		// check if this day is the same as the last prevDay 
		if (daysArray[index-1] === date.getDate() || !index) { // if matching day or the first day
			currSum += day.main.temp; 
			count++;
			if (!daysArray[index+1]) { // last day 
				fiveDay.push({
					temp: currSum / count
				});	
			}
		}
		else { // if they arent the same or the last
			// add new objet to fiveDay (avg temp of day)
			fiveDay.push({
				temp: currSum / count
			});
			// reset trackers
			currSum = day.main.temp;
			count = 1;
		}
	});
	console.log(fiveDay);
	console.log(daysArray);
	console.log(daysData);
}

export default FiveDay;
