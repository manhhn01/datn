import {
  ColTitle,
  Grid,
  GridItem,
  NavItem,
  SocialItem,
} from "@/components/FooterSection/style";
import Container from "@/components/Container";
import { Box } from "@mui/system";
import Image from "next/image";

export default function FooterSection() {
  return (
    <Box borderTop="1px solid #e5e5e5" mt={20}>
      <Container
        sx={{
          py: 6,
        }}
      >
        <Grid>
          <GridItem
            width="30%"
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
            gap="10px"
          >
            <Box>
              <ColTitle>Jobify</ColTitle>
              <p>
                Jobify is a platform where you can find your dream job and get
                hired by the top companies in the world.
              </p>
            </Box>
            <Box>
              <ColTitle>Follow us</ColTitle>
              <Box display="flex">
                <SocialItem href="#">
                  <Image src="/icons/facebook.svg" alt="Facebook" fill />
                </SocialItem>
                <SocialItem href="#">
                  <Image src="/icons/instagram.svg" alt="Facebook" fill />
                </SocialItem>
                <SocialItem href="#">
                  <Image src="/icons/youtube.svg" alt="Facebook" fill />
                </SocialItem>
                <SocialItem href="#">
                  <Image src="/icons/linkedin.svg" alt="Facebook" fill />
                </SocialItem>
              </Box>
            </Box>
          </GridItem>
          <GridItem>
            <ColTitle>How it work</ColTitle>
            <NavItem href="#">Career</NavItem>
            <NavItem href="#">Contact us</NavItem>
            <NavItem href="#">Privacy policy</NavItem>
            <NavItem href="#">Terms and conditions</NavItem>
            <NavItem href="#">About us</NavItem>
          </GridItem>
          <GridItem>
            <ColTitle>Partner</ColTitle>
            <NavItem href="#">TopCV</NavItem>
            <NavItem href="#">JobStreet</NavItem>
            <NavItem href="#">HappyJob</NavItem>
          </GridItem>
          <GridItem>
            <ColTitle>Build a career</ColTitle>
            <NavItem href="#">Best job</NavItem>
            <NavItem href="#">High salary job</NavItem>
            <NavItem href="#">Fulltime job</NavItem>
            <NavItem href="#">Partime job</NavItem>
            <NavItem href="#">Internship job</NavItem>
            <NavItem href="#">Freelance job</NavItem>
            <NavItem href="#">Remote job</NavItem>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
