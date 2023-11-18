'use client'

import Stepper from "@/app/(public)/(components)/HowItWorkSection/Stepper";
import {
  SubTitle,
  Title,
} from "@/app/(public)/(components)/share/styled";
import Chip from "@/components/Chip";
import Container from "@/components/Container";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

export function HowItWorkSection() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev === 3) {
          return 0;
        }

        return prev + 1;
      });
    }, 4500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Container>
      <Chip
        sx={{
          mx: "auto",
          display: "block",
          width: "fit-content",
          mb: 2,
        }}
      >
        How it work
      </Chip>
      <Title>Making Your Job Search Easy</Title>
      <SubTitle>
        Quick Apply shows you recommended jobs base on your interest <br/>and allow
        you to apply to 25+ jobs in a seconds
      </SubTitle>

      <Box display="flex" mt={5} gap={2}>
        <Stepper
          sx={{ flex: 1 }}
          step={1}
          active={activeStep === 0}
          title="Login or Register"
          subtitle="Login with email and signup with email"
        />
        <Stepper
          sx={{ flex: 1 }}
          step={2}
          active={activeStep === 1}
          title="Get Recommendation"
          subtitle="Using our state of the art Job Matching Algorithm, we can recommend your jobs base on location, interest and CV"
        />
        <Stepper
          sx={{ flex: 1 }}
          step={3}
          active={activeStep === 2}
          title="Apply"
          subtitle="Easily apply multiple jobs with one click!"
        />
        <Stepper
          sx={{ flex: 1 }}
          step={4}
          title="Job Alert"
          active={activeStep === 3}
          subtitle="Keep track of your job application status with email and notification"
        />
      </Box>
    </Container>
  );
}
