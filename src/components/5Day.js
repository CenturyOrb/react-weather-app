import { useEffect, useState } from 'react'
import DayForecast from './DayForecast.js'
import './styles/5Day.css'

// data prop is now reformatted
const FiveDay = ( { data }) => {
	return (
        <div id='five-day'>
            {data.length === 0 ? (
				null
            ) : (
                data.map((day, index) => (
                    <DayForecast key={index} data={day}></DayForecast>
                ))
            )}
        </div>
    );
}

export default FiveDay;
