import React from 'react'

export default function inform() {
  return (
    <div
    className='p-4'>
        <h1
            className='text-2xl font-bold pb-5'>Checkout</h1>
        <div
        className='flex items-center gap-2 pb-5'>
            <div
            className='flex justify-center items-center rounded-full w-12 h-12 bg-gray-400 '>
                <p
                className='text-blue-600'>1</p>
            </div>
            <p
            className='text-xl font-bold'>Shipping Address</p>
        </div>
        <form action=""
        className='flex flex-col  gap-4'>
            <div
            className='flex gap-2'>
                <div 
                className='flex flex-col gap-2 '>
                    <label htmlFor="">First Name</label>
                    <input type="text" name="" id="" placeholder='Enter first name' 
                    className='focus:outline-none bg-white p-2 border border-gray-200 rounded-[10px]'/>
                </div>
                <div
                className='flex flex-col gap-2'>
                    <label htmlFor="">Last name</label>
                    <input type="text" name="" id="" placeholder='Enter last name' 
                    className='focus:outline-none bg-white p-2 border border-gray-200 rounded-[10px]'/>
                </div>
            </div>

            <div
            className='flex flex-col w-[50%]'>
                <label htmlFor="">Address Line 1</label>
                <input type="text" name="" id="" placeholder='Enter Address' 
                className='focus:outline-none bg-white p-2 border border-gray-200 rounded-[10px]'/>
            </div>

            <div
            className='flex gap-2 w-full'>
                <div 
                className='flex flex-col gap-2 '>
                    <label htmlFor="">City</label>
                    <input type="text" name="" id="" placeholder='Enter City' 
                    className='focus:outline-none bg-white p-2 border border-gray-200 rounded-[10px]'/>
                </div>
                <div
                className='flex flex-col gap-2'>
                    <label htmlFor="">Postal Code</label>
                    <input type="text" name="" id="" placeholder='10001' 
                    className='focus:outline-none bg-white p-2 border border-gray-200 rounded-[10px]'/>
                </div>
            </div>

            <button
            className='flex justify-center items-center p-2 rounded-md text-white text-xl font-bold bg-blue-500 w-[50px] '>
                Save
            </button>
        </form>
    </div>
  )
}
