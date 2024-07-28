import React, { forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const TextArea = forwardRef(function TextArea({
    label,
    placeholder,
    ...props
},ref) {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">{label}</Label>
      <Textarea
        className="h-[20rem]"
        placeholder={placeholder}
        id="message"
        {...props}
        ref={ref}
      />
    </div>
  );
});

export default TextArea;
