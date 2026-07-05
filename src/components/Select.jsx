import React, { useId } from 'react'


function Select({
    options = [],
    label,
    className = "",
    ...props
},ref) {
    const id = useId()
  return (
    <div className="w-full text-left">
      {label && (
        <label htmlFor={id} className="inline-block mb-1.5 pl-1 text-sm font-semibold text-zinc-300">
          {label}
        </label>
      )}

      <select 
      {...props}
      id={id}
      ref={ref}
      className={`px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 duration-200 w-full text-sm cursor-pointer ${className}`}
      >
        {options?.map((option)=>(
            <option key={option} value={option} className="bg-zinc-950 text-white">
                {option}
            </option>
        ))}

      </select>
    </div>
  )
}

export default React.forwardRef(Select)
