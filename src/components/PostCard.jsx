import React, { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import UserInfo from "./UserInfo";
import Like from "./Like";
import CommentDrawer from "./CommentDrawer";

function PostCard({ post }) {
  const [seeMoreButton, setSeeMoreButton] = useState(false);
  const [likes, setLikes] = useState(0)

  function seeMore() {
    setSeeMoreButton((prev) => !prev);
  }

  useEffect(()=>{
    setLikes(Number(post["likes"]))
  },[])

  return (
    <CardComponent
      title={
        <UserInfo
          age={post["post_user"]["age"]}
          department={post["post_user"]["department"]}
          gender={post["post_user"]["gender"]}
          institution={post["post_user"]["institution"]}
          date={post["posts"]["date"]}
        />
      }
    >
      <div className="">
        {post["posts"]["post"].length > 100 ? (
          <>
            {!seeMoreButton && (
              <div
                onClick={seeMore}
                className="cursor-pointer hover:bg-slate-600"
              >
                {post["posts"]["post"].split(" ").slice(0, 30).join(" ")}
                <p className="opacity-60 mt-3">See More...</p>
              </div>
            )}
            {seeMoreButton && (
              <div onClick={seeMore} className="cursor-pointer hover:bg-slate-600">
                {post["posts"]["post"]}
              </div>
            )}
          </>
        ) : (
          <div>{post["posts"]["post"]}</div>
        )}
      </div>
      <div className="mt-5 space-x-5">
        <Like isLiked={post['isLiked']} postId={post['posts']['_id']} likes={likes} setLikes={setLikes}/>
        <CommentDrawer postId={post?.postId}/>
      </div>
      <div className="text-[12px] mt-2 opacity-60 flex space-x-3">
        <p>{likes} Likes</p>
        <p>•</p> <p>{post["comments"]} Comments</p>
      </div>
    </CardComponent>
  );
}

export default PostCard;
