import Button from '@/components/Button';
import {
  FormLabel,
  StyledSelect,
} from '@/components/containers/modal/Apply/styled';
import { blue } from '@/utils/color';
import { Box } from '@mui/system';
import { useState } from 'react';

export interface ApplyModalProps {
  job: any;
}

export default function ApplyModal({ job }: ApplyModalProps) {
  const [selectedResume, setSelectedResume] = useState<any>(null);
  const [coverLetter, setCoverLetter] = useState<any>(null);

  const handleSubmit = () => {
    console.log('submit');
  };

  return (
    <Box>
      <Box component="p" fontSize={20} mb={2}>
        Apply for{' '}
        <Box component="span" color={blue[400]}>
          {job.title}
        </Box>
      </Box>
      <Box>
        <FormLabel>Select your resume</FormLabel>
        <StyledSelect
          id="resumeSelect"
          name="resumeSelect"
          value={selectedResume}
          onChange={(value: any) => setSelectedResume(value)}
          options={[]}
          placeholder="Select your resume"
        />
      </Box>
      <Box>
        <FormLabel>Write your cover letter</FormLabel>
        <textarea
          placeholder="Write your cover letter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          style={{ width: '100%', height: '100px' }}
        />
      </Box>
      <Button
        onClick={handleSubmit}
        sx={{
          width: '100%',
        }}
      >
        Submit
      </Button>
    </Box>
  );
}
