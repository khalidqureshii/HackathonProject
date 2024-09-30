import React, { useState, useEffect } from 'react'
import SearchPersonCard from '../components/cards/SearchPersonCard'
import PersonCard from '../components/cards/PersonCard'
import LINK from '../store/Link';
import { useNavigate } from 'react-router-dom';


function Connect(){
  const navigate = useNavigate();
  const maxLen = 30;
  function createCard(person) {
    let toDisplay = person.bio;
    
    if (toDisplay.length > maxLen) {
      toDisplay = toDisplay.slice(0, maxLen - 2) + "...";
    } 

    const handleClick = () => {
      navigate(`/userprofile/${person._id}`, { state: { userId: person._id } });
    };

    return <PersonCard name={person.username} bio={toDisplay} loc={person.location} userType={person.userType} industry={person.industry} onClick={handleClick}/>;
  }

  const [profiles, setProfiles] = useState([]);
  const [profLen, setProfLen] = useState(0);
  const [userType, setUserType] = useState(''); 
  const [industry, setIndustry] = useState(''); 
  const [location, setLocation] = useState(''); 
  let entireProfiles = null;

  async function fetchEntries() {
    const response = await fetch(LINK + "api/filter/getAllProfiles", {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          },
      });
      const data = await response.json();
      const allProfiles = data.allProfiles;
      setProfiles(allProfiles);
      setProfLen(allProfiles.length);
      entireProfiles = allProfiles;
      //console.log(entireProfiles);
  }

  useEffect(()=>{
    fetchEntries();
  }, []);

  const clearFilters = async() => {
    setUserType('');
    setIndustry('');
    setLocation('');
    fetchEntries();
  }

  const handleApplyFilters = async () => {
    const filterBody = {
      userType,
      industry,
      location
    }
    const response = await fetch(LINK + "api/filter/getProfiles", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(filterBody)
    });
    const data = await response.json();
    setProfiles(data.filteredProfiles);
    setProfLen(data.filteredProfiles.length);
  };

  return (
    <div className='flex flex-col gap-4 justify-center items-center mt-9 '>
      <div className='flex flex-col bg-slate-300 px-9 py-8 rounded-xl mb-8 mt-2'>
        <h1 className='text-black mb-4 text-center'>Preferences</h1>
        <div className='flex flex-row gap-6 justify-between mb-4'>
          <div className='flex flex-col'>
            <label className='block mb-2'>User Type</label>
            <select value={userType} onChange={(e) => setUserType(e.target.value)} className='border rounded p-2'>
              <option value=''>--Select--</option>
              <option value='Student'>Student</option>
              <option value='Alumni'>Alumni</option>
            </select>
          </div>

          <div className='flex flex-col'>
            <label className='block mb-2'>Industry</label>
            <select value={industry} onChange={(e) => setIndustry(e.target.value)} className='border rounded p-2'>
              <option value=''>--Select--</option>
              <option value='Healthcare'>Healthcare</option>
              <option value='Finance'>Finance</option>
              <option value='Technology'>Technology</option>
              <option value='Education'>Education</option>
              <option value='Others'>Others</option>
            </select>
          </div>

          <div className='flex flex-col'>
            <label className='block mb-2'>Location</label>
            <input
              type='text'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className='border rounded p-2'
              placeholder='Enter location'
            />
          </div>
        </div>
        <div className='flex flex-row justify-center gap-10'>
          <button onClick={clearFilters} className='bg-gray-500 text-white p-2 min-w-24 rounded'>
            Clear
          </button>
          <button onClick={handleApplyFilters} className='bg-blue-500 text-white p-2 min-w-24 rounded'>
            Apply
          </button>
        </div>
      </div>
      <div className='flex flex-wrap justify-center items-center gap-5 lg:mx-24 max-w-7xl'>
        {(profLen!=0)?(<>{profiles.map(createCard)}</>):(<><h1 className='text-3xl'>Sorry, No Users Found</h1></>)}
      </div>
    </div>
  );
}

export default Connect