import React from 'react'


const SearchPersonCard = (props) => {
  return (
    <div className='mt-5'>
        <div className='inline-flex flex-row bg-slate-500 px-5 py-2'>
            <div className='m-auto'><img src="pfp.png" alt="Profile Pic" width={65}/></div>
            <div className='my-auto ml-5'>
                <h1 className='text-2xl'>{"Khalid Qureshi"}</h1>
                <h1 className='text-lg'>{"Student At Thadomal Shahani"}</h1>
                <h1 className='text-lg'>{"Mumbai"}</h1>
            </div>
        </div>
    </div>
  )
}

export default SearchPersonCard