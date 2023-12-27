"use client";

import { Box, styled } from "@mui/system";

export const Grid = styled(Box)`
  display: flex;
  flex-wrap: wrap;
`;

export const GridItem = styled(Box)`
  flex-grow: 1;
  padding: 0 10px;
  margin-bottom: 12px;
`;

export const ColTitle = styled(Box)`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
`;

export const NavItem = styled("a")`
  font-size: 16px;
  font-weight: 400;
  color: #000;
  text-decoration: none;
  margin-bottom: 8px;
  display: block;
`;

export const SocialItem = styled("a")`
  display: block;
  position: relative;
  width: 28px;
  height: 28px;
  margin-right: 16px;
`;
