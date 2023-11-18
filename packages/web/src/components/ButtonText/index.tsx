import { StyledButtonText } from "@/components/ButtonText/stylex";
import { ButtonProps } from "@mui/base";
import { MUIStyledCommonProps } from "@mui/system";

export interface ButtonTextProps extends ButtonProps, MUIStyledCommonProps {
  children: React.ReactNode;
}

export default function ButtonText({children, ...props}: ButtonTextProps){
  return <StyledButtonText {...props}>
    {children}
  </StyledButtonText>;
}
