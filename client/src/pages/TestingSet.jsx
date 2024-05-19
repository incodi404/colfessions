import axios from 'axios'
import React, { useEffect } from 'react'

function TestingSet() {
    useEffect(()=>{
      async function set() {
        const res = await axios({
          url: 'http://127.0.0.1:7000/api/v1/user/testing-set',
          method: "get",
          withCredentials: true
        })
        console.log(res);
      }

      set()
    }, [])
  return (
    <div>TestingSet</div>
  )
}

export default TestingSet