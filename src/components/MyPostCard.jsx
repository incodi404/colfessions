import React, { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import UserInfo from "./UserInfo";
import { Button } from "./ui/button";
import Like from "./Like";
import DropDown from "./DropDown";
import CommentDrawer from "./CommentDrawer";

function MyPostCard({ post, user }) {
  const [seeMoreButton, setSeeMoreButton] = useState(false);

  console.log(post);

  function seeMore() {
    setSeeMoreButton((prev) => !prev);
  }

  return (
    <CardComponent
      title={
        <div className="flex items-baseline justify-between">
          <UserInfo
            age={user["age"]}
            department={user["department"]}
            gender={user["gender"]}
            institution={user["institution"]}
            date={post["date"]}
          />
          <DropDown post={post}/>
        </div>
      }
    >
      <div className="">
        {post["post"].length > 100 ? (
          <>
            {!seeMoreButton && (
              <div
                onClick={seeMore}
                className="cursor-pointer hover:bg-slate-600"
              >
                {post["post"].split(" ").slice(0, 30).join(" ")}
                <p className="opacity-60 mt-3">See More...</p>
              </div>
            )}
            {seeMoreButton && (
              <div
                onClick={seeMore}
                className="cursor-pointer hover:bg-slate-600"
              >
                {post["post"]}
              </div>
            )}
          </>
        ) : (
          <div>{post["post"]}</div>
        )}
      </div>
      <div className="mt-5 space-x-5">
        <CommentDrawer postId={post?._id}/>
      </div>
      <div className="text-[12px] mt-2 opacity-60 flex space-x-3">
        <p>{post["likes"]} Likes</p>
        <p>•</p> <p>{post["comment"]} Comments</p>
      </div>
    </CardComponent>
  );
}

export default MyPostCard;
