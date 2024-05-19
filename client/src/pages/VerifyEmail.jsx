import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { SERVER_LINK } from "@/constant";
import { Link } from "react-router-dom";

function VerifyEmail() {
  const { verificationToken } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true)

  if (verificationToken) {
    useEffect(() => {
      async function verify() {
        try {
          const res = await axios.get(
            `${SERVER_LINK}/user/verify-email/${verificationToken}`
          );
          if (res.status === 200) {
            setTitle(res.data.message);
            setIsOpen(true);
          }
        } catch (error) {
            console.log(error);
            setTitle("Verification failed")
            setIsOpen(true)
        } finally {
            setLoading(false)
        }
      }

      verify()
    }, []);
  }

  else {
    useEffect(()=>{
        setTitle("Verification Token Not Found")
        setIsOpen(true)
    },[])
  }

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button><Link to={"/login"}>Log In</Link></Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default VerifyEmail;
