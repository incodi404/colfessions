import FollowButton from "@/components/FollowButton";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_LINK } from "@/constant";

function Institution() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    async function institutionList() {
      try {
        setLoading(true);
        const res = await axios({
          url: `${SERVER_LINK}/get/institution-list`,
          method: "get",
          withCredentials: true,
        });
        //console.log(res.data.data);
        setList(res.data.data);
      } catch (error) {
        return <h1>Unable to fetch</h1>;
      } finally {
        setLoading(false);
      }
    }

    institutionList();
  }, []);

  //console.log(list);

  if(loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="w-[80vw] md:w-[30rem] text-left">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10 text-center">
        Institutions
      </h1>
      <div className="w-full space-y-5">
        {list.map((i) => (
          <section className="flex justify-between items-center">
            <section className="space-y-1">
              <p>{i?._id.toUpperCase()}</p>
              <p className="text-[12px] font-semibold text-slate-500">
                {i?.followers > 1
                  ? `${i?.followers} Followers`
                  : `${i?.followers} Follower`}
              </p>
            </section>
            <FollowButton
              institution={i["_id"]}
              isAlreadyFollowed={i['isFollower']}
              className="rounded-full px-[2rem] bg-[#1077fd] text-white text-[15px] hover:bg-[#165fbe]"
            />
          </section>
        ))}
      </div>
    </div>
  );
}

export default Institution;
