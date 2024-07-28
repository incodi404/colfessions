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
import { BsExclamationCircleFill } from "react-icons/bs";

function ConfirmBox({ open = false, setAlertDialouge, title, setConfirm }) {
  function handleConfirm() {
    setConfirm(true);
    setAlertDialouge(false);
  }
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="w-[80vw] md:w-[30rem]">
        <AlertDialogHeader className="flex justify-center items-center">
          <BsExclamationCircleFill className="text-red-500 text-[50px] mb-5" />
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>Are You Sure?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full flex flex-wrap gap-3">
          <AlertDialogAction onClick={() => setAlertDialouge(false)}>
            Cancel
          </AlertDialogAction>
          <AlertDialogAction onClick={handleConfirm}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmBox;
