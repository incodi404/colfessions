import React, { useState } from 'react'
import { RiDeleteBin6Fill } from "react-icons/ri";
import axios from 'axios';
import { SERVER_LINK } from '@/constant';

function DeleteCommentButton({commentId, setDeleteComment}) {
    const [loading, setLoading] = useState(false)

    async function deleteComment() {
        try {
          setLoading(true);
          const res = await axios({
            url: `${SERVER_LINK}/post/delete-comment`,
            data: {
                commentId
            },
            method: "delete",
            withCredentials: true,
          });
          setDeleteComment((prev)=> !prev)
        } catch (error) {
          return <h1>Unable to fetch</h1>;
        } finally {
          setLoading(false);
        }
      }

  return (
    <button><RiDeleteBin6Fill onClick={deleteComment} className='text-[25px] text-red-500' /></button>
  )
}

export default DeleteCommentButton