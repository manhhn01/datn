import { Box, BoxProps } from "@mui/system";
import Image from "next/image";

export default function AppLogo(props: BoxProps) {
  return (
    <Box position="relative" height="100%" width="100%" {...props}>
      <Image src="/next.svg" alt="Jobify" fill />
    </Box>
  );
}
