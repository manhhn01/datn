'use client';

import { Input } from '@/components/Input';
import { Box, styled } from '@mui/system';


export const FormError = styled('div')`
  color: red;
  font-size: 14px;
  margin-top: 2px;
`;

export const FormWrapper = styled(Box)`
  margin: auto 0;
  padding: 0 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${({ theme }) => theme.breakpoints.up('md')} {
    width: 50%;
    min-width: 400px;
  }
`;

export const Title = styled('h3')`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #0072e5;
`;

export const SubTitle = styled('h4')`
  font-size: 16px;
  margin-bottom: 20px;
  color: #666;
  font-weight: normal;
`;

export const FormControl = styled(Box)`
  width: 100%;
  margin-bottom: 20px;
`;

export const FormLabel = styled('label')`
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
  color: #666;
`;

export const StyledInput = styled(Input)<{ error?: boolean }>`
  width: 100%;

  input {
    width: 100%;
    ${({ error }) => error && 'border-color: red; !important'}
  }

  input:focus, input:hover {
    ${({ error }) => error && 'border-color: red; !important'}
  }
`;
