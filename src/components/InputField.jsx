import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const InputField = React.forwardRef(function InputField(
  { label, placeholder, type, ...props },
  ref
) {

  const [showPassword, setShowPassword] = useState(false)

  if (type === "password") {
    return (
      <div className="grid w-full items-center gap-1.5">
        <div className="flex justify-between">
          <Label htmlFor={label}>{label}</Label>
          <Label className='opacity-70 cursor-pointer' onClick={()=> setShowPassword((prev)=> !prev)}>Show Password</Label>
        </div>
        <Input
          type={(showPassword===true)? "text" : "password"}
          id={label}
          placeholder={label}
          {...props}
          ref={ref}
        />
      </div>
    );
  }

  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={label}>{label}</Label>
      <Input type={type} className='w-full' id={label} placeholder={placeholder || label} {...props} ref={ref} />
    </div>
  );
});

export default InputField;
