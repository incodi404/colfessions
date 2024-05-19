import { SERVER_LINK } from "@/constant";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import FollowButton from "@/components/FollowButton";

function Institutions() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetch() {
      try {
        const res = await axios({
          url: `${SERVER_LINK}/get/institution-list`,
          method: "get",
          withCredentials: true,
        });
        console.log('I am running bro!');
        setList(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, []);

  const memoList = useMemo(()=> {
    return list.map((e)=> e['_id'])
  }, [list])

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-3">
        <h2 className="text-center text-[20px] uppercase">Institutions</h2>
        {
            memoList.map((e, index)=>(
                <div className="flex justify-between gap-4 items-center">
                    <p key={index}>{e}</p>
                    <FollowButton className="h-[2rem] rounded-full w-[5rem]" institution={e} />
                </div>
            ))
        }
    </div>
  )
}

export default Institutions;
