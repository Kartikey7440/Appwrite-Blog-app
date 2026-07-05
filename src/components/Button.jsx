import React from 'react'

function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
  // Map traditional colors to premium gradient themes
  let themeClasses = "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-[0_0_15px_rgba(220,38,38,0.15)] hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]";
  
  if (bgColor === "bg-green-500") {
    themeClasses = "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]";
  } else if (bgColor === "bg-red-500") {
    themeClasses = "bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 shadow-[0_0_15px_rgba(225,29,72,0.15)] hover:shadow-[0_0_20px_rgba(225,29,72,0.3)]";
  } else if (bgColor !== "bg-blue-600") {
    themeClasses = bgColor;
  }

  return (
    <button
        type={type}
        className={`px-5 py-2.5 rounded-lg text-sm font-bold cursor-pointer select-none active:scale-[0.98] transition-all duration-200 border border-white/5 ${textColor} ${themeClasses} ${className}`}
        {...props}
    >
        {children}
    </button>
  )
}

export default Button
