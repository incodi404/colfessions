import React from 'react'
import { useSelector } from 'react-redux'

function UserInfo({
    age,
    gender,
    department,
    institution
}) {

  return (
    <div>
        <h3>{`${age}, ${gender}, ${department}`}</h3>
        <p className='text-[10px] opacity-60'>{`From ${institution?.toUpperCase()}`}</p>
    </div>
  )
}

export default UserInfo