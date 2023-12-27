'use client';

import Button from '@/components/Button';
import { Input } from '@/components/Input';
import { GeoapifyGeocoderAutocomplete } from '@geoapify/react-geocoder-autocomplete';
import { Box, styled } from '@mui/system';

export const SearchInputWrapper = styled(Box)`
  width: 100%;
  background-color: #fff;
  border-radius: 40px;
  display: flex;
`;

export const VerticalDivider = styled(Box)`
  width: 1px;
  margin: 12px 16px;
  background-color: #e0e0e0;
`;

export const StyledInput = styled(Input)`
  height: 54px;
  width: 100%;
  input {
    width: 100%;
    height: 100%;
    border: 1px solid transparent;
    box-shadow: none;

    &:hover,
    &:focus {
      border: 1px solid transparent;
    }
  }
`;

export const SearchButton = styled(Button)`
  margin: 10px;
  height: 46px;
  border-radius: 30px;
  padding: 0 24px;
`;

export const GeocoderAutocompleteWrapper = styled(Box)`
  width: 100%;

  .geoapify-autocomplete-input {
    border: none;
  }
`;
