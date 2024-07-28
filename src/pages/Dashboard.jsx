import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_LINK } from "@/constant";
import PostCard from "@/components/PostCard";
import { useInfiniteScroll } from "@/infiniteScroll";
import { Skeleton } from "@/components/ui/skeleton";

function Dashboard() {
  const auth = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  //console.log(auth);

  if (!auth) {
    navigate("/");
  }

  const { loadPage } = useInfiniteScroll();

  useEffect(() => {
    async function newsFeed(page) {
      try {
        setLoading(true);
        const res = await axios({
          url: `${SERVER_LINK}/get/newsfeed/${page}`,
          method: "get",
          withCredentials: true,
        });
        setTotalPages(res.data.data.totalPages);
        setPosts((prev) => [...prev, ...res.data.data.data]);
      } catch (error) {
        return <h1>Unable to fetch</h1>;
      } finally {
        setLoading(false);
      }
    }

    if (loadPage <= totalPages) {
      newsFeed(loadPage);
    }
  }, [loadPage]);

  return (
    <div className="w-[80vw] md:w-[30rem] flex space-y-5 flex-col justify-center items-center">
      <Link className="w-[80vw] md:w-[30rem]" to={"/create-post"}>
        <Button className="w-full">Post</Button>
      </Link>
      {posts.length === 0 ? (
        <div className="w-[100vw] h-[80vh] flex items-center justify-center flex-col gap-5">
          <p className="text-[25px] font-bold opacity-70">Please follow some institutions to see posts</p>
          <Link to={"/institutions"}><Button className="bg-[#1077fd] text-white rounded-full hover:bg-[#165fbe]">Follow</Button></Link>
        </div>
      ) : (
        <div className="hidden"></div>
      )}
      <div className="w-full mb-[4rem]">
        {posts.map((post, index) => (
          <PostCard post={post} key={index} />
        ))}
      </div>
      {posts.length === 0 ? (
        <div className="hidden"></div>
      ) : (
        <div className="w-full mb-[1rem]">
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[full] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[full]" />
              <Skeleton className="h-4 w-[full]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
