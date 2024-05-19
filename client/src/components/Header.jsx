import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { Button } from "./ui/button";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  console.log(authStatus); // should log the status

  if (!authStatus) {
    return (
      <header
        className="w-full flex justify-between px-10 py-5"
        style={{ postion: "fixed" }}
      >
        <div>
          <h2 className="font-bold uppercase text-[20px]"><Link to={"/"}>Colfessions</Link></h2>
        </div>
        <div className="flex gap-4 items-center text-[15px] opacity-80">
          <Link to="/">HOME</Link>
          <Link to="/about">ABOUT</Link>
        </div>
        <div className="flex gap-4 items-center text-[15px] font-bold">
          <Link to="/signin">
            <button className="bg-[#1D9BF0] px-3 py-[7px] rounded">
              Create An Account
            </button>
          </Link>
          <Link to="/login">
            <button className="border-[1px] border-slate-[#1D9BF0] hover:bg-sky-950 px-3 py-[7px] rounded">
              LOG IN
            </button>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header
      className="w-full flex justify-between px-10 py-5"
      style={{ postion: "fixed" }}
    >
      <div>
        <h2 className="font-bold uppercase text-[20px]"><Link to={"/"}>Colfessions</Link></h2>
      </div>
      <div className="flex gap-4 items-center text-[15px] font-bold">
        <Logout />
      </div>
    </header>
  );
}

export default Header;
