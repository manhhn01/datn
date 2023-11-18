import {
  CompanyLogo,
  Title,
} from "@/app/(public)/(components)/SponsorSection/styled";
import Container from "@/components/Container";
import { Box } from "@mui/system";

export default function SponsorSection() {
  return (
    <Container>
      <Title>More than 2,000 companies sponsorship with us</Title>
      <Box display="flex" justifyContent="space-around">
        <CompanyLogo src="/images/facebook_logo.png" />
        <CompanyLogo src="/images/google_logo.jpeg" />
        <CompanyLogo src="/images/tiktok_logo.png" />
        <CompanyLogo src="/images/x_logo.png" />
        <CompanyLogo src="/images/notion_logo.png" />
        <CompanyLogo src="/images/mix_panel_logo.png" />
      </Box>
    </Container>
  );
}
