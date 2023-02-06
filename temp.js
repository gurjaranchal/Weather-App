import React,{useEffect, useState} from 'react';
import WeatherCard from './weathercard';
 import "./style.css";

 const Temp=()=>{
    const [searchValue , setSearchValue] = useState("pune");
    const [tempInfo , setTempInfo]=useState({});

    const getWeatherInfo = async() =>{
        try{
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=202acd0110eb22afa49efb1e3fff9a1c`  ;  

            const res = await fetch(url);
            const data =await res.json();
            const {temp ,humidity ,pressure }=data.main;
            const {main: weathermood } = data.weather[0];
            const {name}=data;
            const{speed}=data.wind;
            const {country,sunset}=data.sys;
            // console.log(temp);
            const myNew={
                temp,humidity,pressure,weathermood,name,country,speed,sunset,
            };
            setTempInfo(myNew);

        }catch(e)
        {
            console.log(e);
        }
    };
    useEffect(()=>{getWeatherInfo();},);
     return(
        <>
        <div className="wrap">
            <div className="search">
                <input type="search" placeholder='search..' autoFocus 
                id ="search" className='searchTerm' value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}/>
                <button className='searchButton' 
                type='button'
                onClick={getWeatherInfo}
                >Search</button>
            </div>
        </div>
        {/* our card temp */}
        <WeatherCard tempInfo={tempInfo}/>
        </>

     );
 };
 export default Temp;