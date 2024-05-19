import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { SERVER_LINK } from "./constant";
import axios from "axios";
import { login, logout } from "./store/authSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import Logout from "./components/Logout";
import PostCreate from "./pages/Authorized/PostCreate";
import Institutions from "./pages/Authorized/Institutions";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    axios({
      url: `${SERVER_LINK}/user/get-user`,
      method: "get",
      withCredentials: true
    })
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData: userData.data.data }));
        }
      })
      .catch((error) => {
        dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });
  }, [authStatus]);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          {(authStatus === true)? <Route path="" element={<Dashboard/>}/> : <Route path="" element={<Landing/>}/>}
          <Route path="signin" element={<Signin/>} />
          <Route path="login" element={<Login/>} />
          <Route path="logout" element={<Logout/>} />
          <Route path="email-verification/:verificationToken" element={<VerifyEmail/>} />
          <Route path="post-create" element={<PostCreate/>} />
          <Route path="institutions" element={<Institutions/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
