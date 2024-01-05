import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; // Import your Supabase instance

function FetchingCity({setSelectedCity,setSelectedPoliceStation}) {
  const [cities, setCities] = useState([]);
  const [policeStations, setPoliceStations] = useState([]);
  const [filteredPoliceStations, setFilteredPoliceStations] = useState([]);
  const [cityError, setCityError] = useState(false);
  const [stationError, setStationError] = useState(false);
  
 

  useEffect(() => {
    // Fetch all cities
    supabase
      .from('cities')
      .select('city')
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching cities:', error);
          return;
        }
        console.log(data);
        setCities(data);
      });
  }, []);

  useEffect(() => {
    // Fetch all police stations
    supabase
      .from('police_stations')
      .select('P_name', 'city')
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching police stations:', error);
          return;
        }
        console.log("fetched Police station",data)
        setPoliceStations(data);
        setFilteredPoliceStations(data);
      });
  }, []);

  
 
  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
  console.log("selected city --",selectedCity)

 
   if(!selectedCity){
    setCityError(true)
    console.log("Please select")
   }
   else{
    setCityError(false)
    console.log("selected---")
   }
 
  }

  const handlePoliceStationChange = (event) => {
    const selectedPoliceStation = event.target.value;
    setSelectedPoliceStation(selectedPoliceStation);

    if(!selectedPoliceStation){
      setStationError(true);
    }
    else{
      setStationError(false);
    }
  }
    //Inserting into database 

    
  return (
    <>
    
    <div className='grid grid-cols-1  md:ml-20 md:mr-20 sm:grid-cols-1'>
      <div className='mx-5 my-4'>
      <label 
      className='block text-sm font-medium md:py-3 leading-6 md:text-xl text-[#1E1C67]'
      htmlFor="citySelect">Select City</label>
      <select id="citySelect" 

      className='block flex-1 rounded-md  md:text-[1rem] font-medium border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-blue-600  sm:text-sm sm:leading-6"
      placeholder="Enter Email'
      onChange={handleCityChange
      }
      
      >
        <option
        value=''
        
        >Select a city</option>
        {cities.map((city) => (
          <option key={city.city} value={city.city}>
            {city.city}
          </option>
        ))}

      </select>
{cityError && (<p className="  mt-2 text-sm text-red-600 dark:text-red-500">Enter City</p>)}


</div>


<div className='mx-5 my-4'>
      <label 
      className='block text-sm font-medium leading-6  md:py-3 md:text-xl text-[#1E1C67]'
      
      htmlFor="policeStationSelect">Select Police Station</label>
      <select
      className='block flex-1 rounded-md md:text-[1rem] font-medium border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-blue-600 sm:text-sm sm:leading-6"
      placeholder="Enter Email'
     
        id="policeStationSelect"
        onChange={handlePoliceStationChange}
      >
        <option value="">Select a police station</option>
        {filteredPoliceStations.map((station) => (
          <option key={station.P_name} value={station.P_name}>
            {station.P_name}
          </option>
        ))}
      </select>


      </div>
    </div>
  
        </>
  );
}

export default FetchingCity;
