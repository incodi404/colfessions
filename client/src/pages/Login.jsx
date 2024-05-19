import * as React from "react";

import InputField from "@/components/InputField";
import CardComponent from "@/components/CardComponent";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { SERVER_LINK } from "@/constant";
import AlertBox from "@/components/AlertBox";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "@/store/authSlice";

function Login() {
  const { register, handleSubmit } = useForm();
  const [response, setResponse] = React.useState(false);
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();
  const [alertDialouge, setAlertDialouge] = React.useState(false);
  const dispatch = useDispatch();

  const userLogin = async (data) => {
    try {
      console.log(data);
      const res = await axios({
        url: `${SERVER_LINK}/user/login`,
        data: data,
        method: "post",
        withCredentials: true,
      });
      if (res.status === 200) {
        setResponse(true);
      }
    } catch (error) {
      //console.log(error.response.data.message);
      setError(error.response.data.message || "Login Failed");
      setAlertDialouge(true);
    }
  };

  if (response) {
    dispatch(login({ status: true }));
    navigate("/");
  }

  return (
    <>
      {error && (
        <AlertBox
          open={alertDialouge}
          setAlertDialouge={setAlertDialouge}
          title={"Something Is Wrong"}
          description={error}
        />
      )}
      <CardComponent
        title={"Log In To Your Account"}
        description={"Share Your Thoughts Anonmously"}
      >
        <form onSubmit={handleSubmit(userLogin)}>
          <div className="space-y-5 flex flex-col justify-center w-full">
            <InputField label={"Email"} type={"email"} {...register("email")} />
            <InputField
              label={"Password"}
              type={"password"}
              {...register("password")}
            />
            <Button>
              <button type="submit">Log In</button>
            </Button>
          </div>
        </form>
        <div className="flex justify-center mt-5 opacity-70 text-[14px]">
          <p>
            Don't have an account?{" "}
            <Link to={"/signin"} className="underline">
              Create An Account
            </Link>
          </p>
        </div>
      </CardComponent>
    </>
  );
}

export default Login;
