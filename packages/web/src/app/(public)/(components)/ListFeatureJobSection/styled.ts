'use client';

import { Box, styled } from "@mui/system";

export const GridContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

export const GridItem = styled(Box)`
  width: 25%;
  height: 480px;
  padding: 0 10px;
  margin-bottom: 12px;
`;
