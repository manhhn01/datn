import { styled } from "@mui/system";
import Link from "next/link";

export const StyleLink = styled(Link)`
  font-weight: 500;

  .scrolled & {
    color: black;
  }
`
