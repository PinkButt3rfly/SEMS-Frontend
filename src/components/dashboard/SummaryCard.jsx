import React from 'react'

const SummaryCard = ({icon, text, number, color}) => {
  return (
    <div className="rounded-md flex bg-white">
        <div className={`text-2xl flex justify-center items-center ${color} text-white px-4 rounded-md`}>
            {icon}
        </div>
        <div className="pl-4 py-1">
            <p className="text-md font-lightbold">{text}</p>
            <p className="text-lg font-semibold">{number}</p>
        </div>
    </div>
  )
}

export default SummaryCard
