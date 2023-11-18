import {
  HeaderSubTitle,
  HeaderTitle,
} from "@/app/(public)/(components)/HeaderSection/styled";
import SearchInput from "@/app/(public)/(components)/SearchInput";
import { Box } from "@mui/system";
import Image from "next/image";

export default function HeaderSection() {
  return (
    <Box
      position="relative"
      display="flex"
      sx={{
        alignItems: "center",
        justifyContent: "center",
      }}
      width="100%"
      height={700}
    >
      <Box
        position="absolute"
        zIndex={99}
        sx={{
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.8)",
        }}
      />
      <Image src="/banner.jpeg" alt="Header banner" objectFit="cover" fill />
      <Box zIndex={100}>
        <HeaderSubTitle>No. 1 Job searching platform</HeaderSubTitle>
        <HeaderTitle>
          Where{" "}
          <span
            style={{
              color: "#3399FF",
            }}
          >
            Ambitions
          </span>{" "}
          Meet{" "}
          <span
            style={{
              color: "#3399FF",
            }}
          >
            Opportunities
          </span>
        </HeaderTitle>
        <SearchInput />
      </Box>
    </Box>
  );
}
