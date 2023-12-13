'use client';

import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base';
import { styled } from '@mui/system';

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#99CCF3',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E6',
  700: '#0059B3',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

export const MenuItem = styled(BaseMenuItem)`
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &.${menuItemClasses.focusVisible} {
    outline: 3px solid ${blue[200]};
    background-color: ${grey[100]};
    color: ${grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${grey[400]};
  }

  &:hover:not(.${menuItemClasses.disabled}) {
    background-color: ${blue[50]};
    color: ${blue[900]};
  }
`;
