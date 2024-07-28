import React, { useEffect } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { AUTH_LINK, SERVER_LINK } from "@/constant";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/store/authSlice";

function Logout({ ...props }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function userLogout() {
    const res = await axios({
      url: `${AUTH_LINK}/auth/logout`,
      method: "get",
      withCredentials: true,
    });
    dispatch(logout());
    navigate("/");
  }

  return (
    <Button onClick={userLogout} {...props}>
      Log Out
    </Button>
  );
}

export default Logout;
