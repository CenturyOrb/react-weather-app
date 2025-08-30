import React from 'react';
import './styles/info.css';

const Info = ({data, backgroundImg}) => {
	const high = data.main?.temp_max != null ? `H: ${data.main.temp_max.toFixed()}` : '';
	const low = data.main?.temp_min != null ? `L: ${data.main.temp_min.toFixed()}` : '';
	
	return (
		<div id='info-weather' className="container"
			style={{ backgroundImage: `url(${backgroundImg})` }}	
		>
			<p id="info-city">{data.name ?? ''}</p>
			<p id="info-temp">{data.main?.temp ? `${data.main.temp.toFixed()}°F` : ''}</p>
			<p id="info-description">{Array.isArray(data.weather) && data.weather[0]?.description ? data.weather[0].description : ''}</p>
			<p id="info-HL">{(high ? `${high}°F` : '') + ' ' + (low ? `${low}°F` : '')}</p>
		</div>
	);
}

export default Info;
