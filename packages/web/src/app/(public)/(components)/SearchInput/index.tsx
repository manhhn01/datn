import {
  SearchButton,
  SearchInputWrapper,
  StyledInput,
  VerticalDivider,
} from "@/app/(public)/(components)/SearchInput/styled";
import React from "react";
import { Box } from "@mui/system";
import { MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function SearchInput() {
  return (
    <SearchInputWrapper>
      <Box display="flex" alignItems="center" px={3} flex={1}>
        <MagnifyingGlassIcon width={16} height={16} />
        <StyledInput placeholder="Job title, keywords, companies, ..." />
      </Box>
      <VerticalDivider />
      <Box display="flex" alignItems="center" flex={1}>
        <MapPinIcon width={16} height={16} />
        <StyledInput placeholder="City, state, zip, remote, ..." />
      </Box>
      <SearchButton>
        Search
      </SearchButton>
    </SearchInputWrapper>
  );
}
