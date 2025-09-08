import './styles/DayForecast.css'
// data here is from 5Day.js
function DayForecast({ data }) {
	const weekday = data.date.toLocaleDateString('en-US', { weekday: 'long' });
	console.log(weekday);
	return (
		<div id='day-forecast'>
		</div>
	);
}

export default DayForecast 
