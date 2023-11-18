"use client";

import { styled } from "@mui/system";

export const Step = styled("p")<{ active?: boolean }>`
  font-size: 1.6rem;
  margin-bottom: 8px;
  font-weight: 600;
  color: ${({ active }) => (active ? "#3399FF" : "#1b1b1c")};
  transition: color 0.5s ease;
`;

export const Title = styled("p")<{ active?: boolean }>`
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 12px;
  color: ${({ active }) => (active ? "#3399FF" : "#1b1b1c")};
  transition: color 0.5s ease;
`;

export const SubTitle = styled("p")`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #767883;
  font-weight: 400;
`;
