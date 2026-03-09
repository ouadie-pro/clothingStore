import React from 'react'
import { FaTshirt ,FaSearch ,FaShoppingBag } from "react-icons/fa";
export default function Navbar() {
  return (
    <div
    className=''>
        <header
        className='flex justify-around bg-[#ffffff] items-center  h-[10vh]'>
            <nav
            className='flex gap-4'>
                {/*title*/}
                <div
                className='flex items-center gap-2'>
                    <i
                    className='text-2xl text-blue-700'><FaTshirt /></i>
                    <h1
                    className='uppercase font-bold text-2xl'>modern closet</h1>
                </div>
                {/*Menu */}
                <ul
                className='flex justify-center items-center gap-4'>
                    <li>Men</li>
                    <li>Women</li>
                    <li>New Arrivals</li>
                    <li>Sale</li>
                </ul>
            </nav>

            <div
            className='flex items-center text-2xl gap-4'>
              <div
              className='bg-[#f6f6f8] p-1.5 rounded-md flex items-center gap-2'>
                <i className='text-lg text-gray-500'><FaSearch /></i>
                <input type="text" placeholder='Search brabds,styles..'
                className='focus:outline-none'/>
              </div>
              <i><FaShoppingBag /></i>
              <div
              className='bg-[#f6f6f8] w-12 h-12 rounded-full'>
                <img src="" alt="" />
              </div>
            </div>
        </header>
    </div>
  )
}
