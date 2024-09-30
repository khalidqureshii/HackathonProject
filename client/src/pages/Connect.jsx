import React, { useState, useEffect } from 'react'
import SearchPersonCard from '../components/cards/SearchPersonCard'
import PersonCard from '../components/cards/PersonCard'
import LINK from '../store/Link';


function Connect(){
  const maxLen = 30;
  function createCard(person) {
    let toDisplay = person.bio;
    
    if (toDisplay.length > maxLen) {
      toDisplay = toDisplay.slice(0, maxLen - 2) + "...";
    } 

    return <PersonCard name={person.username} bio={toDisplay} loc={person.location} userType={person.userType} industry={person.industry}/>;
  }

  const [profiles, setProfiles] = useState([]);

  useEffect(()=>{
    async function fetchEntries() {
        const response = await fetch(LINK + "api/auth/getProfiles", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const data = await response.json();
        const allProfiles = data.allProfiles;
        setProfiles(allProfiles);
    }
    fetchEntries();
    
  }, []);

  return (
    <div className='flex justify-center items-center mt-9'>
      <div className='flex flex-wrap justify-center items-center gap-5 lg:mx-24 max-w-7xl'>
        <>{profiles.map(createCard)}</>
      </div>
    </div>
  );
}

export default Connect