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

function Signin() {
  const { register, handleSubmit } = useForm();
  const [response, setResponse] = React.useState(false);
  const [error, setError] = React.useState(false)
  const navigate = useNavigate()
  const [alertDialouge, setAlertDialouge] = React.useState(false)

  const signin = async (data) => {
    try {
      // console.log(data);
      const res = await axios.post(
        `${SERVER_LINK}/user/email-verification`,
        data
      );
      if (res.status === 200) {
        setResponse(res.data.message);
        setAlertDialouge(true)
      }
    } catch (error) {
      //console.log(error.response.data.message);
      setError(error.response.data.message)
      setAlertDialouge(true)
    }
  };

  return (
    <>
    {response && <AlertBox open={alertDialouge} setAlertDialouge={setAlertDialouge} title={"Verification Email"} description={response} />}
    {error && <AlertBox open={alertDialouge} setAlertDialouge={setAlertDialouge} title={"Something Is Wrong"} description={error} />}
      <CardComponent
        title={"Create An Account"}
        description={"Share Your Thoughts Anonmously"}
      >
        <form onSubmit={handleSubmit(signin)}>
          <div className="space-y-5 flex flex-col justify-center">
            <InputField
              label={"Name"}
              type={"text"}
              {...register("fullname")}
            />
            <InputField
              label={"Username"}
              type={"text"}
              {...register("username")}
            />
            <InputField label={"Email"} type={"email"} {...register("email")} />
            <InputField
              label={"Password"}
              type={"password"}
              {...register("password")}
            />
            <InputField
              label={"Institution"}
              type={"text"}
              {...register("institution")}
            />
            <InputField
              label={"Department"}
              type={"text"}
              {...register("department")}
            />
            <InputField label={"Age"} type={"number"} {...register("age")} />
            <InputField
              label={"Gender"}
              type={"text"}
              {...register("gender")}
            />
            <Button>
              <button type="submit">Create</button>
            </Button>
          </div>
        </form>
        <div className="flex justify-center mt-5 opacity-70 text-[14px]">
          <p>Already Have An Account? <Link to={"/login"} className="underline">Log In</Link></p>
        </div>
      </CardComponent>
    </>
  );
}

export default Signin;
