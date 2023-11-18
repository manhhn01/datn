"use client";

import { Box, styled } from "@mui/system";
import Image from "next/image";

export const JobCardWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 22px;
  border: 1px solid #f3f3f3;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
`;

export const CompanyLogo = styled(Image)`
  border-radius: 8px;
  overflow: hidden;
  object-fit: cover;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const CompanyName = styled("h4")`
  font-weight: bold;
  font-size: 22px;
  line-height: 24px;
  color: #111;
`;

export const Time = styled("p")`
  font-size: 16px;
  line-height: 20px;
  color: #666;
`;

export const Role = styled("p")`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: #111;
  margin-bottom: 16px;
`;

export const Description = styled("p")`
  font-size: 16px;
  line-height: 20px;
  color: #666;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Tags = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
  gap: 4px;

  & > * {
    margin-bottom: 4px;
  }
`;

export const Salary = styled("p")`
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
  color: #111;
`;
