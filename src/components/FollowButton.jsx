import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { SERVER_LINK } from "@/constant";

function FollowButton({ institution, isAlreadyFollowed, ...props }) {
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(()=>{
    if(isAlreadyFollowed) {
      setIsFollowed(true)
    }
  },[])

  function follow() {
    setIsFollowed((prev) => {
      if (prev === false) {
        try {
          axios({
            url: `${SERVER_LINK}/institution/follow`,
            method: "post",
            data: {
              institution,
            },
            withCredentials: true,
          }).then((data) => {
            if (!data) {
              console.log("ERROR");
            }
          });
          return !prev;
        } catch (error) {
          console.log(error);
          return prev;
        }
      } else {
        try {
          axios({
            url: `${SERVER_LINK}/institution/unfollow`,
            method: "delete",
            data: {
              institution,
            },
            withCredentials: true,
          }).then((data) => {
            if (!data) {
              console.log("ERROR");
            }
          });
          return !prev;
        } catch (error) {
          console.log(error);
          return prev;
        }
      }
    });
  }

  return (
    <Button onClick={follow} {...props}>
      {isFollowed === false ? "Follow" : "Unfollow"}
    </Button>
  );
}

export default FollowButton;
