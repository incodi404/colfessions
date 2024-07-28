import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteData, setData } from "@/store/updateSlice";
import ConfirmBox from "./ConfirmBox";
import { SERVER_LINK } from "@/constant";
import axios from "axios";
import AlertBox from "./AlertBox";

function DropDown({ post }) {
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);
  const [del, setDel] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  dispatch(deleteData());

  function handleUpdate() {
    dispatch(setData({ updateData: post }));
    console.log(post);
  }

  function handleDelete() {
    setDel(true);
    console.log(post);
  }

  //console.log(post);

  async function deletePost(postId) {
    //console.log(postId);
    try {
      setLoading(true);
      const res = await axios({
        url: `${SERVER_LINK}/post/delete-post`,
        data: {slug: postId},
        method: "delete",
        withCredentials: true,
      });
      setSuccessAlert(true);
    } catch (error) {
      setErrorAlert(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (confirm) {
      deletePost(post?._id);
    }
  }, [confirm]);

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      {successAlert && (
        <AlertBox
          open={successAlert}
          setAlertDialouge={setSuccessAlert}
          title={"Successfully Deleted"}
        />
      )}
      {errorAlert && (
        <AlertBox
          open={errorAlert}
          setAlertDialouge={setErrorAlert}
          title={errorAlert}
          success={false}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <BsThreeDotsVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link to={"/update"} className="w-full" onClick={handleUpdate}>
                Update
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link onClick={handleDelete} className="w-full">
                {loading === true ? "Loading..." : "Delete"}
              </Link>
              {del && (
                <ConfirmBox
                  open={del}
                  setAlertDialouge={setDel}
                  title={"Delete"}
                  description={"Delete"}
                  setConfirm={setConfirm}
                />
              )}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default DropDown;
