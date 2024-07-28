import AlertBox from "@/components/AlertBox";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";
import { Button } from "@/components/ui/button";
import React, {useState} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { SERVER_LINK } from "@/constant";
import { useNavigate } from "react-router-dom";

function UserInfo() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [successAlert, setSuccessAlert] =useState(false)
  const [errorAlert, setErrorAlert] =useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  async function userInfosend(data) {
    //console.log(data);
    try {
      setLoading(true)
      const res = await axios({
        url: `${SERVER_LINK}/user/user-info`,
        data: data,
        method: "post",
        withCredentials: true,
      });
      navigate("/")
    } catch (error) {
      setErrorAlert(error.response.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const gender = watch("gender");

  return (
    <>
    {
      successAlert && <AlertBox open={successAlert} path={"/"} pathMessage={"Home"} setAlertDialouge={setSuccessAlert} title={"Successfully Saved"} />
    }
    {
      errorAlert && <AlertBox open={errorAlert} setAlertDialouge={setErrorAlert} title={errorAlert} />
    }
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10 text-center">Enter Your Information</h1>
      <form
        onSubmit={handleSubmit(userInfosend)}
        className="w-[80vw] md:w-[30rem] mt-5 space-y-5"
      >
        <InputField
          label="Institution"
          placeholder="Full Name. E.g, Indian Institute of Technology Kharagpur"
          {...register("institution", {
            required: {
              value: true,
              message: "This field is required",
            },
            minLength: {
              value: 5,
              message: "Please do not use abbreviation",
            },
            pattern: {
              value: /^[A-Za-z ]*$/,
              message: "Should not contain any special character or number",
            },
          })}
        />
        {errors?.institution && (
          <p className="mt-2 mb-2 text-red-600">
            {errors?.institution?.message}
          </p>
        )}
        <InputField
          label="Department"
          placeholder="E.g, Computer science"
          {...register("department", {
            required: {
              value: true,
              message: "This field is required",
            },
            pattern: {
              value: /^[A-Za-z ]*$/,
              message: "Should not contain any special character or number",
            },
          })}
        />
        {errors?.department && (
          <p className="mt-2 mb-2 text-red-600">
            {errors?.department?.message}
          </p>
        )}
        <InputField
          label="Age"
          type="number"
          {...register("age", {
            min: {
              value: 18,
              message: "Age should be more than 18",
            },
            required: {
              value: true,
              message: "This field is required",
            },
            max: {
              value: 40,
              message: "You are not elligible",
            }
          })}
        />
        {errors?.age && (
          <p className="mt-2 mb-2 text-red-600">{errors?.age?.message}</p>
        )}
        <SelectField
          label="Gender"
          placeholder="Gender"
          valueArray={["Male", "Female"]}
          {...register("gender", {
            required: {
              value: true,
              message: "This field is required",
            },
          })}
          value={gender}
          onChange={(value) => setValue("gender", value)}
        />
        {errors?.gender && (
          <p className="mt-2 mb-2 text-red-600">{errors?.gender?.message}</p>
        )}
        <Button type="submit">{loading? "Loading..." : "Update"}</Button>
      </form>
    </>
  );
}

export default UserInfo;
