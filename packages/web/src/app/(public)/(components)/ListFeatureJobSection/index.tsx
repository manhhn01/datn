import {
  GridContainer,
  GridItem,
} from "@/app/(public)/(components)/ListFeatureJobSection/styled";
import { SubTitle, Title } from "@/app/(public)/(components)/share/styled";
import Button from "@/components/Button";
import Chip from "@/components/Chip";
import Container from "@/components/Container";
import JobCard from "@/components/JobCard";
import { Box } from "@mui/system";
import React from "react";

export default function ListFeatureJobSection() {
  return (
    <Container>
      <Chip
        sx={{
          display: "block",
          mx: "auto",
          width: "fit-content",
          mb: 2,
        }}
      >
        Feature jobs
      </Chip>

      <Title>
        Various Career Opportunities <br /> Waiting For You
      </Title>

      <GridContainer>
        <GridItem>
          <JobCard />
        </GridItem>
        <GridItem>
          <JobCard />
        </GridItem>
        <GridItem>
          <JobCard />
        </GridItem>
        <GridItem>
          <JobCard />
        </GridItem>
        <GridItem>
          <JobCard />
        </GridItem>
        <GridItem>
          <JobCard />
        </GridItem>
      </GridContainer>
      <Box textAlign="center">
        <Button
          variant="secondary"
          sx={{
            border: "1px solid #007FFF",
            backgroundColor: "transparent",
            borderRadius: "25px",
            fontSize: "16px",
            padding: "8px 30px",
            fontWeight: 400,
          }}
        >
          See all jobs
        </Button>
      </Box>
    </Container>
  );
}
