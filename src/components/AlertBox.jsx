import React, { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BsExclamationCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function AlertBox({ open=false,success=true,path,pathMessage, setAlertDialouge, title, description }) {

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="w-[80vw] md:w-[30rem]">
        <AlertDialogHeader className="flex justify-center items-center">
          {
            success? <BsFillCheckCircleFill className="text-green-500 text-[50px] mb-5"/> : <BsExclamationCircleFill className="text-red-500 text-[50px] mb-5"/>
          }
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full">
          {
            path? <Link className="w-full" to={path}><AlertDialogAction className="w-full">{pathMessage}</AlertDialogAction></Link> : <AlertDialogAction onClick={() => setAlertDialouge(false)}>Okay</AlertDialogAction>
          }
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertBox;
