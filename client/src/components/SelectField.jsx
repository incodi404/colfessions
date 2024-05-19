import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectField = React.forwardRef(function SelectField(
  { label, placeholder, valueArray, ...props },
  ref
) {

  return (
      <Select onChange={{...props}} ref={ref} >
        <SelectTrigger className="w-full" onChange={{...props}} ref={ref}>
          <SelectValue placeholder={placeholder} onChange={{...props}} ref={ref} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {valueArray.map((value, index) => (
              <SelectItem value={value} key={index} ref={ref} >
                {value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
  );
});

export default SelectField;
