import HeaderSection from "@/app/(public)/(components)/HeaderSection";
import { HowItWorkSection } from "@/app/(public)/(components)/HowItWorkSection";
import ListFeatureJobSection from "@/app/(public)/(components)/ListFeatureJobSection";
import SponsorSection from "@/app/(public)/(components)/SponsorSection";
import EmailSubscriptionSection from "@/app/(public)/(components)/EmailSubscriptionSection";
import React from "react";
import { Box } from "@mui/system";

export default function HomePage() {
  return (
    <Box display="flex" flexDirection="column" alignItems="stretch" gap={5}>
      <HeaderSection />
      <HowItWorkSection />
      <ListFeatureJobSection />
      <SponsorSection />
      <EmailSubscriptionSection />
    </Box>
  );
}
