import CardComponent from '@/components/CardComponent'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SERVER_LINK } from "@/constant";
import UserInfo from '@/components/UserInfo';

function Dashboard() {

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetch() {
      try {
        const res = await axios({
          url: `${SERVER_LINK}/get/newsfeed`,
          method: "get",
          withCredentials: true,
        });
        setData(res.data.data)
        console.log(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, []);

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex flex-col gap-5 justify-center'>
      <Link to={"/post-create"} className='w-full text-center border-[1px] py-4 rounded-full hover:bg-sky-950'>What are you thinking about?</Link>
      {
        data.map((post)=>(
          <CardComponent
          title={
            <UserInfo 
            age={post?.post_user?.age}
            institution={post?.post_user?.institution}
            gender={post?.post_user?.gender}
            department={post?.post_user?.department}
            />
          }
          >
            <p>{post?.posts?.post}</p>
          </CardComponent>
        ))
      }
    </div>
  )
}

export default Dashboard