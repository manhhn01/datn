import { Box, BoxProps, MUIStyledCommonProps } from '@mui/system';

export interface PaperProps extends BoxProps {
  children: React.ReactNode;
}

export default function Paper({ children, ...props }: PaperProps) {
  return (
    <Box  
      boxShadow="10px 10px 30px 0px rgba(0,0,0,0.15)"
      borderRadius="10px"
      bgcolor="white"
      padding="20px"
      {...props}>
      {children}
    </Box>
  );
}
