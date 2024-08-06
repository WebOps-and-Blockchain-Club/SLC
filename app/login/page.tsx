import React from 'react'

const Page = () => {
  return (
    <div className="flex flex-col items-center bg-yellow-500  text-white justify-center min-h-screen py-2">
      <form className="flex flex-col items-center gap-4 w-full max-w-sm p-6 bg-black rounded-lg shadow-md">
        <span className="w-full flex flex-col gap-2">
          <label htmlFor="email" className="text-white">Email</label>
          <input 
            type="email" 
            className="rounded-lg px-3 py-2 w-full border text-black border-gray-300 outline-none focus:border-blue-500" 
            name="email" 
            id="email" 
          />
        </span>
        <span className="w-full flex flex-col gap-2">
          <label htmlFor="password" className="text-white">Password</label>
          <input 
            type="password" 
            className="rounded-lg px-3 py-2 w-full border text-black border-gray-300 outline-none focus:border-blue-500" 
            name="password" 
            id="password" 
          />
        </span>
        <input 
          className="bg-blue-500 text-black py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600" 
          type="submit" 
          value="Log in" 
        />
      </form>
    </div>
  )
}

export default Page
