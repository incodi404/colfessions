import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import CardComponent from "@/components/CardComponent";
import UserInfo from "@/components/UserInfo";
import { useSelector } from "react-redux";
import TextArea from "@/components/TextArea";
import { Button } from "@/components/ui/button";
import { SERVER_LINK } from "@/constant";
import axios from "axios";
import AlertBox from "@/components/AlertBox";

function Post() {
  const { register, handleSubmit } = useForm();

  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state)=> state.auth.userData)

  //console.log(user);

  async function createPost(data) {
    //console.log(data);
    try {
      setLoading(true);
      const res = await axios({
        url: `${SERVER_LINK}/post/create-post`,
        data: data,
        method: "post",
        withCredentials: true,
      });
      setSuccessAlert(true);
    } catch (error) {
      setErrorAlert(error.response.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {successAlert && (
        <AlertBox
          open={successAlert}
          path={"/"}
          pathMessage={"Home"}
          setAlertDialouge={setSuccessAlert}
          title={"Successfully Posted"}
        />
      )}
      {errorAlert && (
        <AlertBox
          open={errorAlert}
          setAlertDialouge={setErrorAlert}
          title={errorAlert}
        />
      )}
      <CardComponent
        title={
          <UserInfo
            age={user?.age}
            institution={user?.institution}
            gender={user?.gender}
            department={user?.department}
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
              {...register("inputPost", {
                required: true
              })}
            />
            <Button type="submit">Post</Button>
          </form>
        </div>
      </CardComponent>
    </div>
  );
}

export default Post;
