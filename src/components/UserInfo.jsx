import React from 'react'

function UserInfo({
    age,
    gender,
    department,
    institution,
    date,
    ...props
}) {

  return (
    <div className='space-y-1' {...props}>
        <h3>{`${age}, ${gender?.toUpperCase()}, ${department?.toUpperCase()} From ${institution?.toUpperCase()}`}</h3>
        {date && <p className='text-[12px] opacity-60'>{`${date}`}</p>}
    </div>
  )
}

export default UserInfo