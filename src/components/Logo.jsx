import React from 'react'

function Logo({width = '40px'}) {
  return (
    <div className="flex items-center gap-3 font-bold tracking-tight text-white select-none">
      <img
        src="/logo.png"
        alt="Appwrite Blog Logo"
        className="h-10 w-auto object-contain drop-shadow-[0_0_10px_rgba(220,38,38,0.25)]"
      />
      <span className="text-xl font-extrabold bg-gradient-to-r from-white via-zinc-100 to-red-500 bg-clip-text text-transparent whitespace-nowrap">
        Appwrite Blog app
      </span>
    </div>
  )
}

export default Logo
