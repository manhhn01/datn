"use client";

import { styled } from "@mui/system";

const getVariantColor = (variant?: string) => {
  switch (variant) {
    case "primary":
      return "#3399ff";
    case "secondary":
      return "#8e8e91";
    default:
      return "#3399ff";
  }
};

const getVariantBackgroundColor = (variant?: string) => {
  switch (variant) {
    case "primary":
      return "#ebf5ff";
    case "secondary":
      return "white";
    default:
      return "#ebf5ff";
  }
};

export const ChipContainer = styled("div")<{ variant?: string }>`
  display: inline-flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ variant }) => getVariantColor(variant)};
  background-color: ${({ variant }) => getVariantBackgroundColor(variant)};
  color: ${({ variant }) => getVariantColor(variant)};
  border-radius: 20px;
  font-weight: 500;
`;
