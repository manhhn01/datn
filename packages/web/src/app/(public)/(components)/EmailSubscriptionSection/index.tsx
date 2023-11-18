import {
  EmailSubscriptionWrapper,
  InputWrapper,
  Subtitle,
  Title,
} from "@/app/(public)/(components)/EmailSubscriptionSection/styled";
import Button from "@/components/Button";
import Container from "@/components/Container";
import { Input } from "@/components/Input";

export default function EmailSubscriptionSection() {
  return (
    <Container>
      <EmailSubscriptionWrapper>
        <Title>
          A job hunting experience
          <br />
          like no other
        </Title>
        <Subtitle>
          Why search when you can discover your perfect job? Let the right jobs
          come to you
        </Subtitle>
        <InputWrapper>
          <Input placeholder="Enter your email address" />
          <Button sx={{ borderRadius: "25px", padding: "8px 24px" }}>
            Submit
          </Button>
        </InputWrapper>
      </EmailSubscriptionWrapper>
    </Container>
  );
}
