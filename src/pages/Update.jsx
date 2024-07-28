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

function Update() {
  const { register, handleSubmit } = useForm();

  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state)=> state.auth.userData)
  const updateData = useSelector((state)=> state.update.updateData)

  async function createPost(data) {

    data = {...data, slug: updateData?._id}

    //console.log(data);
    try {
      setLoading(true);
      const res = await axios({
        url: `${SERVER_LINK}/post/update-post`,
        data: data,
        method: "put",
        withCredentials: true,
      });
      setSuccessAlert(true);
    } catch (error) {
      setErrorAlert(error.response.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  //console.log(updateData);

  return (
    <div>
      {successAlert && (
        <AlertBox
          open={successAlert}
          path={"/"}
          pathMessage={"Home"}
          setAlertDialouge={setSuccessAlert}
          title={"Successfully Updated"}
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
              {...register("post", {
                required: true
              })}
              defaultValue={updateData?.post}
            >
            </TextArea>
            <Button type="submit">Post</Button>
          </form>
        </div>
      </CardComponent>
    </div>
  );
}

export default Update;
