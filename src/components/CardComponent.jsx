import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

function CardComponent({
    title,
    description,
    children,
    ...props
}) {
  return (
    <Card className={`w-[80vw] sm:w-[30rem] mb-5`} {...props}>
      <CardHeader className='space-y-0'>
        <CardTitle className='text-[17px] tracking-wide'>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}

export default CardComponent;
