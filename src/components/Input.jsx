import React, {useId} from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
  return (
    <div className="w-full text-left">
        {label && (
          <label
            className="inline-block mb-1.5 pl-1 text-sm font-semibold text-zinc-300"
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <input 
            type={type}
            className={`px-4 py-2.5 rounded-lg bg-[#131316] border border-zinc-800 text-white outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 placeholder-zinc-500 duration-200 w-full text-sm ${className}`}
            ref={ref}
            {...props}
            id={id}
        />
    </div>
  )
}) 

export default Input
