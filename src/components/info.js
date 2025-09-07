import './styles/info.css';

const Info = ({ data }) => {
  const { name, main, weather } = data || {};
  const temp = main?.temp;
  const tempMax = main?.temp_max;
  const tempMin = main?.temp_min;
  const description = Array.isArray(weather) ? weather[0]?.description : '';

  const backgroundImgStyle =
  data?.weather?.[0]?.icon
    ? { backgroundImage: `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png)` }
    : {};
  const high = tempMax != null ? `H: ${tempMax.toFixed()}°F` : '';
  const low = tempMin != null ? `L: ${tempMin.toFixed()}°F` : '';
  const tempDisplay = temp != null ? `${temp.toFixed()}°F` : '';
  const highLow = [high, low].filter(Boolean).join(' ');

  return (
	<div id="info-weather" className="container">
		<p id="info-city">{name ?? ''}</p>
		<div id="info-condition" style={backgroundImgStyle}>
			<p id="info-temp">{tempDisplay}</p>
        	<div id="grouped">
          		<p id="info-description">{description}</p>
          		<p id="info-HL">{highLow}</p>
        	</div>
      	</div>
    </div>
  );
};

export default Info;
