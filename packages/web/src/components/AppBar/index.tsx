import AppLogo from "@/components/AppLogo";
import Button from "@/components/Button";
import ButtonText from "@/components/ButtonText";
import { Box } from "@mui/system";
import Link from "next/link";

export default function AppBar() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={8}
      py={2}
      height={90}
      width="100%"
      zIndex={999}
      top={0}
      left={0}
      position="fixed"
    >
      <Box width={160} height="100%">
        <AppLogo />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={3}
        sx={{
          color: "white",
        }}
      >
        <Link href="/">Home</Link>
        <Link href="/jobs">Find jobs</Link>
        <Link href="/companies">Companies</Link>
        <Link href="/about">About</Link>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="centerj" gap={3}>
        <ButtonText
          sx={{
            color: "white",
            fontWeight: 500,
            px: 1,
          }}
        >
          Log In
        </ButtonText>
        <Button
          sx={{
            borderRadius: 20,
            fontWeight: 500,
            px: 2.75,
          }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
}
