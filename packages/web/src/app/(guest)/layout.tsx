import {
    Container,
  LeftSectionContainer,
  RightSectionContainer,
} from "@/app/(guest)/styled";
import { LayoutProps } from "@/types/common";
import { Box } from "@mui/system";
import Image from "next/image";

export default function GuestLayout({ children }: LayoutProps): JSX.Element {
  return (
    <Container>
      <LeftSectionContainer>{children}</LeftSectionContainer>
      <RightSectionContainer>
        <Image src="/guest-background.jpg" alt="Background" fill objectFit="cover" />
      </RightSectionContainer>
    </Container>
  );
}
