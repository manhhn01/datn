import {
  Step,
  SubTitle,
  Title,
} from "@/app/(public)/(components)/HowItWorkSection/Stepper/styled";
import { Box, MUIStyledCommonProps } from "@mui/system";
import React from "react";

export interface StepperProps extends MUIStyledCommonProps {
  step: number;
  title: string;
  subtitle?: string;
  active?: boolean;
}

export default function Stepper({
  step,
  title,
  subtitle,
  active = false,
  sx,
  ...props
}: StepperProps) {
  return (
    <Box
      borderTop={`5px solid ${active ? "#3399FF" : "#e5e7eb"}`}
      pt={2}
      sx={{
        transition: "border-color 0.5s ease",
        ...sx,
      }}
      {...props}
    >
      <Step active={active}>{step < 10 ? `0${step}` : step}</Step>
      <Title active={active}>{title}</Title>
      <SubTitle>{subtitle}</SubTitle>
    </Box>
  );
}
