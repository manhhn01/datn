'use client';

import { Box, styled } from '@mui/system';

export const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;

  ${({ theme }) => theme.breakpoints.up('md')} {
    height: 100vh;
  }
`;

export const LeftSectionContainer = styled(Box)`
  width: 600px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;

  ${({ theme }) => theme.breakpoints.up('md')} {
    width: 75%;
    min-width: 600px;
  }
`;

export const RightSectionContainer = styled(Box)`
  display: none;
  width: 100%;
  height: 100%;
  position: relative;

  ${({ theme }) => theme.breakpoints.up('md')} {
    display: block;
    flex: 1;
  }
`;
