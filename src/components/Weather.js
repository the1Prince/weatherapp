import React from "react";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Calendar, ClockFill, Thermometer, Wind, Water } from "react-bootstrap-icons";


const Weather = (props)=>{

  const [weather, setWeather] = useState({})
  

  useEffect(()=>{
    const url = 'https://api.weatherapi.com/v1/current.json?key=5bb844c98b1d44eabd8101033231604&q='+props.country+'&aqi=no'
    fetch(url)
    .then(response => response.json())
    .then((response)=>{
        var ar = response.location.localtime.split(' ')
        console.log(response.location.localtime)
        var lt = ar[1]
        console.log(lt)
        var dt = ar[0]
        console.log(dt)
        var tempc = response.current.temp_c
        var wicon = response.current.condition.icon
        var tempf = response.current.temp_f
        var wind = response.current.wind_mph
        var humidity = response.current.humidity

        setWeather({'tmpc':tempc, 'icon': wicon, 'tmpf': tempf, 'w': wind, 'humid': humidity, 'localtime':lt, 'date':dt})
        console.log(weather)
    })
    .catch(error => console.log(error))
  },[props.country])

  return(
    <div className="row">
        <div className='col-sm'>
    <Card style={{ boxShadow:'0 8px 32px 0 rgba( 0, 0, 0, 0.18 )', backdropFilter:'blur( 7.5px )', width: '70%', backgroundColor:'rgba( 239, 221, 218, 0.1)'}}>
    {weather !== undefined && (
       <>
       <div className='mt-10 text-center flex items-center gap-7'>
         <p className='text-4xl'>{weather.tmpc} °C</p>
         <img className='w-30 h-30' src={weather.icon} alt='weather' />
       </div>
       <div className='mt-10 text-center flex items-center gap-7'>
         <div className='flex flex-col p-2 tracking-wider md:text-xl items-center gap-2'>
           <h3 className='mt-10 text-center flex items-center gap-7'><Thermometer></Thermometer></h3>
           <p className='mt-10 text-center flex items-center gap-7'>{weather.tmpf} F</p>
         </div>
         <div className='flex flex-col  px-6 border-x-2 justify-center  tracking-wider md:text-xl items-center gap-2'>
           <h3><Wind></Wind></h3>
           <p className='mt-10 text-center flex items-center gap-7'>{weather.w}/Mph</p>
         </div>
         <div className='mt-10 text-center flex items-center gap-7'>
           <h3 className='mt-10 text-center flex items-center gap-7'><Water></Water></h3>
           <p className='mt-10 text-center flex items-center gap-7'>{weather.humid}</p>
         </div>
       </div>
     </>
  
    )}
    </Card>
    </div>
    <div className="col-sm">
    <Card style={{ boxShadow:'0 8px 32px 0 rgba( 0, 0, 0, 0.18 )', backdropFilter:'blur( 7.5px )', width: '70%', backgroundColor:'rgba( 239, 221, 218, 0.1)'}}>
    {weather !== undefined && (
       <>
       <div className='mt-10 text-center flex items-center gap-7'>
         <h4 className='text-4xl'><ClockFill></ClockFill></h4>
         <h2 className='text-4xl'>{weather.localtime}</h2>
       </div>
       <div className='mt-10 text-center flex items-center gap-7'>
         <div className='flex flex-col p-2 tracking-wider md:text-xl items-center gap-2'>
           <h4><Calendar></Calendar></h4>
           <h2 className='opacity-90'>{weather.date}</h2>
         </div>
        
         
       </div>
     </>
  
    )}
    </Card>
    </div>
    </div>
  )

}
export default Weather