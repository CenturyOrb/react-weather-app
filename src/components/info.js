import React from 'react';
import './styles/info.css';

const Info = ({data, backgroundImg}) => {
	const high = data.main?.temp_max != null ? `H: ${data.main.temp_max.toFixed()}` : '';
	const low = data.main?.temp_min != null ? `L: ${data.main.temp_min.toFixed()}` : '';
	
	return (
		<div id='info-weather' className="container">
			<p id="info-city">{data.name ?? ''}</p>
			<div id='info-condition' style={{backgroundImage: `url(${backgroundImg})`}}>
				<p id="info-temp">{data.main?.temp ? `${data.main.temp.toFixed()}°F` : ''}</p>
				<div id='grouped'> 
					<p id="info-description">{Array.isArray(data.weather) && data.weather[0]?.description ? data.weather[0].description : ''}</p>
                    <p id="info-HL">{(high ? `${high}°F` : '') + ' ' + (low ? `${low}°F` : '')}</p>
				</div>
			</div>
		</div>
	);
}

export default Info;
