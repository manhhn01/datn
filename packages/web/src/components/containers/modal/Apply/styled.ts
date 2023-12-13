import { blue } from '@/utils/color';
import { styled } from '@mui/system';
import Select from 'react-select';

export const StyledSelect = styled(Select)`
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0,0,0, 0.05);

  &:hover {
    border-color: ${blue[400]};
  }
`

export const FormLabel = styled('label')`
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
  color: #666;
`;
