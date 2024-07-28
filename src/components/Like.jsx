import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Button } from "./ui/button";
import axios from "axios";
import { SERVER_LINK } from "@/constant";

function Like({ isLiked, postId, setLikes }) {
  const [like, setLike] = useState(false);

  useEffect(() => {
    if (isLiked) {
      setLike(true);
    }
  }, []);

  async function liked(postId) {
    const res = await axios({
      url: `${SERVER_LINK}/post/like/${postId}`,
      method: "get",
      withCredentials: true,
    });
    setLikes((prev)=> prev+1)
  }

  async function disliked(postId) {
    const res = await axios({
      url: `${SERVER_LINK}/post/dislike/${postId}`,
      method: "get",
      withCredentials: true,
    });
    setLikes((prev)=> prev-1)
  }

  function likePost() {
    setLike((prev) => {
      if (prev) {
        disliked(postId);
        return !prev;
      } else {
        liked(postId);
        return !prev;
      }
    });
  }


  return (
    <Button
      onClick={likePost}
      className="px-1 h-auto text-[25px] bg-transparent text-white hover:bg-transparent"
    >
      {like ? (
        <FaHeart className="text-sky-500" />
      ) : (
        <FaRegHeart className="opacity-50" />
      )}
    </Button>
  );
}

export default Like;
