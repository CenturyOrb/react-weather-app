import { useEffect } from 'react'
import './styles/airPollution.css'
function AirPollution( { data } ) {
	const aqiLabels = {
  		1: "Good",
  		2: "Fair",
  		3: "Moderate",
  		4: "Poor",
  		5: "Very Poor"
	};

	// use condition rendering
	return(
		<div id='air-pollution'>
			<p >⚠️Air pollution:  
				{data?.main?.aqi ?
					` ${data.main.aqi} (${aqiLabels[data.main.aqi]})` : 
					null	
				}
			</p> 
			<hr />
			<div id='ap-info'>
				{ data.components ? (
					<><div >CO: {data.components.co}</div>						
                    <div >NH₃: {data.components.nh3}</div>	
                    <div >NO: {data.components.no}</div>	
                    <div >NO₂: {data.components.no2}</div>	
                    <div >O₃: {data.components.o3}</div>	
                    <div >PM2.5: {data.components.pm2_5}</div>	
                    <div >PM10: {data.components.pm10}</div>	
                    <div >SO₂: {data.components.so2}</div> </> ) : 
					null
				}
			</div>
		</div>
	);
}

export default AirPollution
