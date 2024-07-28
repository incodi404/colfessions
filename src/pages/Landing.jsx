import { Button } from "@/components/ui/button";
import React from "react";
import { AUTH_LINK } from "@/constant";
import { FcGoogle } from "react-icons/fc";
import dip from "../assets/dip.jpg";
import nila from "../assets/nila.jpg";
import mrinu from "../assets/mrinu.jpg";
import hriddhi from "../assets/hriddhi.jpg";
import jay from "../assets/jay.jpeg";
import shuvam from "../assets/shuvam.jpeg";

function Landing() {
  function signin() {
    window.location.href = `${AUTH_LINK}/auth/google`;
  }

  function span(text) {
    return <span className="text-[#358cff] font-bold">{text}</span>;
  }

  return (
    <div className="w-full">
      <div className="w-[200rem] h-[10rem] bg-[#358dff50] blur-[100px] rotate-[-160deg] top-[4rem] right-[-1rem] absolute z-[-100]"></div>
      <div className="w-full flex items-center flex-col h-[80vh] gap-5 justify-center text-center">
        <h1 className="text-[2.5rem] lg:text-[4vw] font-semibold">
          Share Your Unsaid Words {span("Anonymously")}
        </h1>
        <Button
          onClick={signin}
          className="px-[8px] py-[30px] text-[15px] lg:px-[20px] lg:py-[30px] lg:text-[18px] font-semibold"
        >
          <FcGoogle className="mr-3 text-[25px]" /> Continue with Google
        </Button>
      </div>
      <div className="w-full mt-10 space-y-[15rem]">
        <div className="w-full text-center px-10">
          <h2 className="text-center text-[2rem] md:text-[3vw] mt-5 mb-5 font-extrabold">
            Your {span("Identity")} Will Remain {span("Hidden")} Forever
          </h2>
          <p className="text-[17px] md:text-[25px] font-semibold text-slate-400 px">
            The platform is developed in such a way that every users' identity
            will remain hidden forever. Even, no one can ever able to
            distiguinsh any user individually.
          </p>
        </div>
        <div className="w-full">
          <h2 className="text-center text-[2rem] md:text-[3vw] mt-5 mb-5 font-extrabold">
            What You Can {span("Do")}
          </h2>
          <div className="w-full flex justify-center items-center gap-[5rem] flex-wrap mt-[2rem]">
            <section className="w-[20rem] border-[1px] p-5 rounded-lg h-[18rem] bg-slate-800">
              <h3 className="text-[30px] font-semibold">
                Post Your {span("Thoughts")}
              </h3>
              <ul className="space-y-2 mt-5 text-[16px]">
                <li>{span("Post")} whenever you want</li>
                <li>{span("Update")} Your Post If Something Needs To Change</li>
                <li>{span("Delete")} Your Post If You're not comfortable</li>
              </ul>
            </section>
            <section className="w-[20rem] border-[1px] p-5 rounded-lg h-[18rem]">
              <h3 className="text-[30px] font-semibold">
                {span("Comments")} On Others' Posts
              </h3>
              <ul className="space-y-2 mt-5 text-[16px]">
                <li>Make {span("Comment")} Where You Want To</li>
                <li>{span("Update")} Your Comment</li>
                <li>{span("Delete")} Your Comment If You're not comfortable</li>
              </ul>
            </section>
            <section className="w-[20rem] border-[1px] p-5 rounded-lg h-[18rem] bg-slate-800">
              <h3 className="text-[30px] font-semibold">
                Give {span("Like")} If You Like Any Post
              </h3>
              <ul className="space-y-2 mt-5 text-[16px]">
                <li>{span("Like")} A Post If It Makes You Feel Good</li>
                <li>
                  {span("Withdraw")} Your Like If Your Decision Of Liking Was
                  Wrong
                </li>
              </ul>
            </section>
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-center text-[2rem] md:text-[3vw] mt-5 mb-5 font-extrabold">
            The {span("Developers")}
          </h2>
          <div className="w-full flex flex-wrap justify-center items-center gap-5">
            <section className="text-center flex flex-col justify-center items-center">
              <img src={dip} alt="" className="w-[10rem] h-[10rem] object-cover rounded-full"/>
              <p className="mt-5 font-semibold">Dipankar Chowdhury</p>
              <p className="opacity-70 font-bold">Full Stack Developer • Team Lead</p>
            </section>
            <section className="text-center flex flex-col justify-center items-center">
              <img src={nila} alt="" className="w-[10rem] h-[10rem] object-cover rounded-full"/>
              <p className="mt-5 font-semibold">Nilanjan Sarkar</p>
              <p className="opacity-70 font-bold">UI/UX Developer</p>
            </section>
            <section className="text-center flex flex-col justify-center items-center">
              <img src={mrinu} alt="" className="w-[10rem] h-[10rem] object-cover rounded-full"/>
              <p className="mt-5 font-semibold">Mrinmoy Saha</p>
              <p className="opacity-70 font-bold">Backend Developer</p>
            </section>
            <section className="text-center flex flex-col justify-center items-center">
              <img src={jay} alt="" className="w-[10rem] h-[10rem] object-cover rounded-full"/>
              <p className="mt-5 font-semibold">Jaydeb Das</p>
              <p className="opacity-70 font-bold">Frontend Developer</p>
            </section>
            <section className="text-center flex flex-col justify-center items-center">
              <img src={shuvam} alt="" className="w-[10rem] h-[10rem] object-cover rounded-full"/>
              <p className="mt-5 font-semibold">Shuvam Sarkar</p>
              <p className="opacity-70 font-bold">Backend Developer</p>
            </section>
            <section className="text-center flex flex-col justify-center items-center">
              <img src={hriddhi} alt="" className="w-[10rem] h-[10rem] object-cover rounded-full"/>
              <p className="mt-5 font-semibold">Dipankar Chowdhury</p>
              <p className="opacity-70 font-bold">DevOps Engineer</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
