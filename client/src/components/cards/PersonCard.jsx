import React from 'react'


const PersonCard = (props) => {

    let isAlumni = (props.userType === "Alumni");
  return (
    <div className='min-w-80 max-w-80'>
        {isAlumni ? (
        <div className='flex flex-col bg-blue-500 px-5 py-5 text-center rounded-2xl'>
            <img className='mx-auto' src="pfp.png" alt="Profile Pic" width={65}/>
            <h1 className='text-2xl'>{props.name}</h1>
            <h1 className='text-lg'>{props.bio}</h1>
            <h1 className='text-lg'>{props.industry}</h1>
            <h1 className='text-lg'>{props.loc}</h1>
        </div>) : (
           <div className='flex flex-col bg-slate-500 px-5 py-5 text-center rounded-2xl'>
           <img className='mx-auto' src="pfp.png" alt="Profile Pic" width={65}/>
           <h1 className='text-2xl'>{props.name}</h1>
           <h1 className='text-lg'>{props.bio}</h1>
           <h1 className='text-lg'>{props.industry}</h1>
           <h1 className='text-lg'>{props.loc}</h1>
       </div> 
        )
        }
    </div>
  )
}

export default PersonCard