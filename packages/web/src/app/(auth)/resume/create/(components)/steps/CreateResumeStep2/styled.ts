'use client';

import { Input } from '@/components/Input';
import { styled } from '@mui/system';

export const StyledInput = styled(Input)<{ error?: boolean }>`
  width: 100%;
  margin-bottom: 20px;

  input {
    width: 100%;
    ${({ error }) => error && 'border-color: red; !important'}
  }

  input:focus,
  input:hover {
    ${({ error }) => error && 'border-color: red; !important'}
  }
`;
