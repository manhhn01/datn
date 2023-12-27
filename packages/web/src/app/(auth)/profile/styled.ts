'use client'

import { Input } from "@/components/Input";
import { blue } from "@/utils/color";
import { Box, styled } from "@mui/system";
import Select from 'react-select';

export const Title = styled('h3')`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #0072e5;
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

export const FormError = styled('div')`
  color: red;
  font-size: 14px;
  margin-top: 2px;
`;

export const StyledSelect = styled(Select)`
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0,0,0, 0.05);

  &:hover {
    border-color: ${blue[400]};
  }
`

export const Description = styled('p')`
  font-size: 12px;
  color: #666;
  margin-bottom: 20px;
`;
