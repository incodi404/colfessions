import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  if (!authStatus) {
    return (
      <header
        className="w-full flex justify-between px-10 py-5"
        style={{ postion: "fixed" }}
      >
        <div>
          <h2 className="font-bold uppercase text-[20px]"><Link to={"/"}>Colfessions</Link></h2>
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
    </header>
  );
}

export default Header;
