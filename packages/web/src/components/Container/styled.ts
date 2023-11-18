"use client";

import { Box, styled } from "@mui/system";

export const StyledContainer = styled(Box)`
  max-width: 1380px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;

  ${({ theme }) => theme.breakpoints.down("md")} {
    max-width: 960px;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    max-width: 600px;
  }

  ${({ theme }) => theme.breakpoints.down("xs")} {
    max-width: 400px;
  }
`;
