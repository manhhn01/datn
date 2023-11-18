"use client";

import { Button as BaseButton } from "@mui/base/Button";
import { styled } from "@mui/system";

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

export type ButtonVariant = "primary" | "secondary" | "tertiary";

const getBackgroundColor = (variant?: ButtonVariant) => {
  switch (variant) {
    case "primary":
      return blue[500];
    case "secondary":
      return grey[50];
    case "tertiary":
      return "transparent";
    default:
      return blue[500];
  }
};

const getBackgroundHoverColor = (variant?: ButtonVariant) => {
  switch (variant) {
    case "primary":
      return blue[600];
    case "secondary":
      return grey[200];
    case "tertiary":
      return "transparent";
    default:
      return blue[600];
  }
};

const getBackgroundActiveColor = (variant?: ButtonVariant) => {
  switch (variant) {
    case "primary":
      return blue[700];
    case "secondary":
      return grey[300];
    case "tertiary":
      return "transparent";
    default:
      return blue[700];
  }
};

const Button = styled(BaseButton)<{ variant?: ButtonVariant }>(
  ({ theme, variant }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${getBackgroundColor(variant)};
  padding: 8px 16px;
  border-radius: 8px;
  color: ${variant === 'secondary' ? blue[700] : "white"};
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${getBackgroundColor(variant)};

  &:hover {
    background-color: ${getBackgroundHoverColor(variant)};
  }

  &:active {
    background-color: ${getBackgroundActiveColor(variant)};
    box-shadow: none;
  }

  &:disabled {
    background-color: ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[700]};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    cursor: not-allowed;
    box-shadow: none;

    &:hover {
      background-color: ${
        theme.palette.mode === "dark" ? grey[700] : grey[200]
      };
    }
  }
  `,
);

export default Button;
