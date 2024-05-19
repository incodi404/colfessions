import AlertBox from "@/components/AlertBox";
import CardComponent from "@/components/CardComponent";
import TextArea from "@/components/TextArea";
import UserInfo from "@/components/UserInfo";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { SERVER_LINK } from "@/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PostCreate() {
  const auth = useSelector((state) => state.auth.status);
  const data = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState("");
  const [alertDialouge, setAlertDialouge] = useState(false);
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  //console.log(auth);
  //console.log(data);

  useEffect(() => {
    if (auth === false) {
      navigate("/login");
    }
  }, [auth]);

  async function createPost(data) {
    try {
      setLoading(true)
      const response = await axios({
        url: `${SERVER_LINK}/post/create-post`,
        data: data,
        method: "post",
        withCredentials: true,
      });
      setRes(response?.data?.message)
      setAlertDialouge(true)
    } catch (error) {
      setRes(error?.response?.data?.message || "Something is wrong");
      setAlertDialouge(true)
    } finally {
      setLoading(false)
    }
  }

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {res && (
        <AlertBox
          open={alertDialouge}
          setAlertDialouge={setAlertDialouge}
          title={res}
        />
      )}
      <CardComponent
        title={
          <UserInfo
            age={data?.age}
            institution={data?.institution}
            gender={data?.gender}
            department={data?.department}
          />
        }
      >
        <div>
          <form
            onSubmit={handleSubmit(createPost)}
            className="space-y-5 flex flex-col justify-center"
          >
            <TextArea
              placeholder="Write Your Unsaid Words..."
              {...register("inputPost")}
            />
            <Button type="submit">Post</Button>
          </form>
        </div>
      </CardComponent>
    </div>
  );
}

export default PostCreate;
