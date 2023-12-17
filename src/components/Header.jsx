import React from 'react'
import Rajasthan_Police_logo from "../assets/Rajasthan_Police_Logo.png"
const Header = () => {
  return (
    <div className='w-full border-b-2  flex justify-center items-center'>

       <div className="max-w-[1240px]"> 
      <img src={Rajasthan_Police_logo}
      className=' object-contain w-[10rem] h-[8rem]'
      alt="/" 
      fill
      />
      </div>
      <div>
        <h1 className='text-xl sm:text-2xl md:text-3xl font-medium uppercase'>
            Rajasthan Police
        </h1>
      </div>
    </div>
  )
}

export default Header
