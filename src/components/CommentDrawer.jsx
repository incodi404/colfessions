import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FaRegComment } from "react-icons/fa";
import InputField from "./InputField";
import { useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { SERVER_LINK } from "@/constant";
import UserInfo from "./UserInfo";
import DeleteCommentButton from "./DeleteCommentButton";

function CommentDrawer({ postId }) {
  const { register, handleSubmit } = useForm();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentMade, setCommentMade] = useState(false);
  const [deleteComment, setDeleteComment] = useState(false);

  async function allComments(postId) {
    try {
      setLoading(true);
      const res = await axios({
        url: `${SERVER_LINK}/get/all-comments/${postId}`,
        method: "get",
        withCredentials: true,
      });
      setComments(res.data.data);
    } catch (error) {
      return <h1>Unable to fetch</h1>;
    } finally {
      setLoading(false);
    }
  }

  async function myComments(postId) {
    try {
      setLoading(true);
      const res = await axios({
        url: `${SERVER_LINK}/get/my-comments/${postId}`,
        method: "get",
        withCredentials: true,
      });
      //console.log(res.data.data);
      setComments(res.data.data);
    } catch (error) {
      return <h1>Unable to fetch</h1>;
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    myComments(postId)
  }, [deleteComment])

  useEffect(() => {
    allComments(postId);
  }, [setCommentMade, commentMade]);

  async function makeComment(data) {
    data = { ...data, slug: postId };
    try {
      setLoading(true);
      const res = await axios({
        url: `${SERVER_LINK}/post/create-comment`,
        data: data,
        method: "post",
        withCredentials: true,
      });
      console.log(res);
      setCommentMade((prev) => !prev);
    } catch (error) {
      return <h1>Unable to fetch</h1>;
    } finally {
      setLoading(false);
    }
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="px-1 h-auto opacity-50 text-[25px] bg-transparent text-white hover:bg-transparent">
          <FaRegComment />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <div className="p-4 pb-0">
            <Tabs className="w-full mb-5" defaultValue="all">
              <TabsList className="grid w-full grid-cols-2 mb-5">
                <TabsTrigger value="all" onClick={() => allComments(postId)}>
                  All Comments
                </TabsTrigger>
                <TabsTrigger value="my" onClick={() => myComments(postId)}>
                  My Comments
                </TabsTrigger>
              </TabsList>
              <ScrollArea className="h-[55vh] flex flex-col space-y-4">
                <TabsContent className="w-full space-y-4" value="all">
                  {comments.length < 1 ? (
                    <div className="w-full text-center text-[18px] font-bold text-slate-400">
                      There is no comments
                    </div>
                  ) : (
                    <div className="hidden"></div>
                  )}
                  {comments.map((c, index) => (
                    <section key={index} className="text-left space-y-2 bg-slate-800 p-4 rounded-xl">
                      <UserInfo
                        gender={c?.user?.gender?.toUpperCase()}
                        age={c?.user?.age}
                        department={c?.user?.department?.toUpperCase()}
                        institution={c?.user?.institution?.toUpperCase()}
                        date={c?.date}
                        className="font-semibold"
                      />
                      <p className="opacity-70">{c?.comment}</p>
                    </section>
                  ))}
                </TabsContent>
                <TabsContent className="w-full space-y-4" value="my">
                  {comments.length < 1 ? (
                    <div className="w-full text-center text-[18px] font-bold text-slate-400">
                      You haven't commented yet. <br />
                      Make a comment now.
                    </div>
                  ) : (
                    <div className="hidden"></div>
                  )}
                  {comments.map((c, index) => (
                    <section key={index} className="text-left space-y-2 bg-slate-800 p-4 rounded-xl">
                      <div className="flex w-full items-center justify-between gap-5">
                        <UserInfo
                          gender={c?.user?.gender?.toUpperCase()}
                          age={c?.user?.age}
                          department={c?.user?.department?.toUpperCase()}
                          institution={c?.user?.institution?.toUpperCase()}
                          date={c?.date}
                          className="font-semibold"
                        />
                        <DeleteCommentButton commentId={c?._id} setDeleteComment={setDeleteComment} />
                      </div>
                      <p className="opacity-70">{c?.comment}</p>
                    </section>
                  ))}
                </TabsContent>
              </ScrollArea>
            </Tabs>
            <div className="mt-3 h-[120px]">
              <form onSubmit={handleSubmit(makeComment)}>
                <InputField
                  label=""
                  placeholder="Make a comment"
                  {...register("comment", {
                    required: {
                      value: true,
                    },
                  })}
                />
                <Button
                  onClick={() => setCountMakeComment((prev) => prev + 1)}
                  type="submit"
                  className="w-full mt-5"
                >
                  Comment
                </Button>
              </form>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default CommentDrawer;
