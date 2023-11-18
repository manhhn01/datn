import { StyledContainer } from "@/components/Container/styled";
import { BoxProps, MUIStyledCommonProps } from "@mui/system";
import React, { ReactNode } from "react";

export interface ContainerProps extends BoxProps, MUIStyledCommonProps {
  children: ReactNode;
}

export default function Container({ children, ...props }: ContainerProps) {
  return <StyledContainer {...props}>{children}</StyledContainer>;
}
