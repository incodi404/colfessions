import CardComponent from "@/components/CardComponent";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Logout from "@/components/Logout";
import { Skeleton } from "@/components/ui/skeleton";
import { SERVER_LINK } from "@/constant";
import axios from "axios";
import MyPostCard from "@/components/MyPostCard";


function MyProfile() {
  const userData = useSelector((state) => state.auth.userData);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  if (!userData) {
    navigate("/");
  }

  useEffect(() => {
    async function myPosts() {
      try {
        setLoading(true);
        const res = await axios({
          url: `${SERVER_LINK}/user/my-post`,
          method: "get",
          withCredentials: true,
        });
        //console.log(res.data.data);
        setPosts(res.data.data);
      } catch (error) {
        return <h1>Unable to fetch</h1>;
      } finally {
        setLoading(false);
      }
    }

    myPosts()

  }, []);

  //console.log(posts);

  if (loading) {
    return (
      <div className="w-[80vw] md:w-[30rem] mb-[1rem]">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[full] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[full]" />
            <Skeleton className="h-4 w-[full]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[80vw] md:w-[30rem] text-left">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10 text-center">My Profile</h1>
      <CardComponent title={`Welcome Back`} className="mt-5 text-center">
        <div className="text-left text-[14px] space-y-3">
          <section className="space-y-1">
            <p className="opacity-50">Institution</p>
            <p>{userData?.institution?.toUpperCase()}</p>
          </section>
          <section className="space-y-1">
            <p className="opacity-60">Age</p>
            <p>{userData?.age}</p>
          </section>
          <section className="space-y-1">
            <p className="opacity-60">Department</p>
            <p>{userData?.department?.toUpperCase()}</p>
          </section>
          <section className="space-y-1">
            <p className="opacity-60">Gender</p>
            <p>{userData?.gender?.toUpperCase()}</p>
          </section>
          <section className="space-y-1">
            <p className="opacity-60">Email</p>
            <p className="hidden sm:flex">{userData?.email}</p>
            <p className="flex sm:hidden">
              {userData?.email.slice(0, 9) + "..."}
            </p>
          </section>
          <div className="flex w-full flex-row justify-between gap-2">
            <Link to={"/user-info"} className="w-full">
              <Button className="w-full hover:bg-sky-600 hover:text-white">
                Update
              </Button>
            </Link>
            <Logout className="w-full bg-sky-600 text-white hover:text-black" />
          </div>
        </div>
      </CardComponent>
      <div className="w-full">
        <h2 className="text-center text-[25px] mt-5 mb-5 uppercase font-extrabold">
          My Posts
        </h2>
        <div className="w-full">
          <div className="w-full mb-[4rem]">
            {posts.map((post, index) => (
              <MyPostCard post={post} user={userData} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
