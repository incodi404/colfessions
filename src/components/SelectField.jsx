import React from "react";
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
  { label, placeholder, valueArray, value, onChange },
  ref
) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full" ref={ref}>
        <SelectValue placeholder={placeholder}>{value}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {valueArray.map((value, index) => (
            <SelectItem value={value} key={index}>
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});

export default SelectField;
