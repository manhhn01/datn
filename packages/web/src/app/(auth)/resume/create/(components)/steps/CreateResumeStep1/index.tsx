import { Title } from '@/app/(auth)/resume/create/(components)/share/styled';
import { templates } from '@/utils/template';
import { Box } from '@mui/system';
import Image from 'next/image';

export interface CreateResumeStep1Props {
  onSelectTemplate: (index: any) => void;
}

export default function CreateResumeStep1({
  onSelectTemplate,
}: CreateResumeStep1Props) {
  return (
    <Box>
      <Title>Select one template</Title>
      <Box display="flex">
        {templates.map((template, index) => (
          <Box
            key={index}
            width={257}
            height={342}
            onClick={()=>onSelectTemplate(template)}
            sx={{
              cursor: 'pointer',
              position: 'relative',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease-in-out',
              ':hover': {
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
              }
            }}
          >
            <Image
              src={template.previewImage}
              alt="Template preview"
              fill
              style={{
                objectFit: 'cover',
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
