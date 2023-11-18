import { ChipContainer } from "@/components/Chip/styled";
import { MUIStyledCommonProps } from "@mui/system";
import React from "react";

export interface ChipProps extends MUIStyledCommonProps {
  children: React.ReactNode;
  variant?: string;
}
export default function Chip({ children, ...props }: ChipProps) {
  return <ChipContainer {...props}>{children}</ChipContainer>;
}
