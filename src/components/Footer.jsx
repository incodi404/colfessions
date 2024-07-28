import React from "react";
import { useSelector } from "react-redux";
import { BsPersonCircle, BsHouseFill, BsSearch, BsBuildingFill } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";

function Footer() {
  const auth = useSelector((state) => state.auth.status);

  if (auth) {
    return (
      <footer className="flex justify-around w-full fixed bottom-0 bg-black py-5">
        <div>
          <NavLink to="/" className={({isActive})=> `text-[25px] ${isActive? "text-sky-400": "text-white"}`}>
            <BsHouseFill className="p-3 bg-slate-800 text-[45px] rounded-full"  />
          </NavLink>
        </div>
        <div>
          <NavLink to={"/institutions"} className={({isActive})=> `text-[25px] ${isActive? "text-sky-400": "text-white"}`}>
            <BsBuildingFill className="p-3 bg-slate-800 text-[45px] rounded-full" />
          </NavLink>
        </div>
        <div>
          <NavLink to={"/my-profile"} className={({isActive})=> `text-[25px] ${isActive? "text-sky-400": "text-white"}`}>
            <BsPersonCircle className="p-3 bg-slate-800 text-[45px] rounded-full" />
          </NavLink>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gray-800 w-full mt-[5rem] flex flex-col justify-center items-center">
      <div className="text-[50px] font-bold uppercase mt-[2rem]">
        Colfessions
      </div>
      <p className="opacity-80 mb-[2rem] mt-[1rem]">© 2024 Rentify. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;
