'use client';

import {
  GeocoderAutocompleteWrapper,
  SearchButton,
  SearchInputWrapper,
  StyledInput,
  VerticalDivider,
} from '@/app/(public)/(components)/SearchInput/styled';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import { useRouter } from 'next/navigation';

export default function SearchInput({ initValue }: any) {
  const router = useRouter();
  const [keywordValue, setKeywordValue] = useState(initValue?.keyword || '');
  const [locationValue, setLocationValue] = useState(initValue?.location || '');

  useEffect(() => {
    setKeywordValue(initValue?.keyword || '');
    setLocationValue(initValue?.location || '');
  }, [initValue]);

  const handleInputChange = (event: any) => {
    setKeywordValue(event.target.value);
  };

  const handleSearch = () => {
    const searchParams = new URLSearchParams({
      keyword: keywordValue,
      location: locationValue,
    });

    router.push('/jobs?' + searchParams.toString());
  };

  return (
    <SearchInputWrapper>
      <Box display="flex" alignItems="center" px={3} flex={1}>
        <MagnifyingGlassIcon width={16} height={16} />
        <StyledInput
          value={keywordValue}
          onChange={handleInputChange}
          placeholder="Job title, keywords, companies, ..."
        />
      </Box>
      <VerticalDivider />
      <Box display="flex" alignItems="center" flex={1}>
        <MapPinIcon width={16} height={16} />
        <GeoapifyContext apiKey={process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}>
          <GeocoderAutocompleteWrapper>
            <GeoapifyGeocoderAutocomplete
              value={locationValue}
              placeholder="City, state or country"
              lang="en"
            />
          </GeocoderAutocompleteWrapper>
        </GeoapifyContext>
      </Box>
      <SearchButton onClick={handleSearch}>Search</SearchButton>
    </SearchInputWrapper>
  );
}
