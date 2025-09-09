import { useEffect } from 'react'
import './styles/DayForecast.css'
// data here is from 5Day.js
function DayForecast({ data }) {
	
	// should display day of the week on top -> icon -> temp
	return (
		<div id='day-forecast'>
			<div>{data.temp}°</div>	
			<div className='icon' 
				style={{backgroundImage: `url(https://openweathermap.org/img/wn/${data.icon}@2x.png)`}}>
			</div>
			<div>{data.weekday}</div>	
		</div>
	);
}

export default DayForecast 
