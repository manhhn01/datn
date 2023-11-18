import React from "react";
import { Box } from "@mui/system";
import {
  CompanyLogo,
  CompanyName,
  Description,
  JobCardWrapper,
  Role,
  Salary,
  Tags,
  Time,
} from "@/components/JobCard/styled";
import Image from "next/image";
import Chip from "@/components/Chip";
import Button from "@/components/Button";

export interface JobCardProps {}

export default function JobCard({}: JobCardProps) {
  return (
    <JobCardWrapper>
      <Box mb={3}>
        <Box display="flex" mb={3}>
          <CompanyLogo
            src="https://fastly.picsum.photos/id/448/200/300.jpg?hmac=9a1pqR60H2xWN80jPWfmdVkRII-wEQZceiSHpJSZnE4"
            width={60}
            height={60}
            alt="Company logo"
          />
          <Box
            ml={2}
            display="flex"
            justifyContent="space-around"
            flexDirection="column"
          >
            <CompanyName>Tiktok</CompanyName>
            <Time>2 days ago</Time>
          </Box>
        </Box>

        <Role>Product Manager</Role>
        <Description>
          To be responsible for the product planning and design of the company's
          very long text very long text very long text very long text very long
          text
        </Description>

        <Tags>
          <Chip variant="secondary">Full time</Chip>
          <Chip variant="secondary">Part time</Chip>
          <Chip variant="secondary">Full time</Chip>
          <Chip variant="secondary">Full time</Chip>
        </Tags>
      </Box>
      <Box display="flex" justifyContent="center" flexDirection="column" pb={2}>
        <Box display="flex" alignItems="baseline" mb={2}>
          <Salary>$1000 - 2000</Salary>
          <p>/monthly</p>
        </Box>
        <Button sx={{ borderRadius: "25px", width: "100%" }}>Apply</Button>
      </Box>
    </JobCardWrapper>
  );
}
