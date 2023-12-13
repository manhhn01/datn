import { Title } from '@/app/(auth)/resume/create/(components)/share/styled';
import Button from '@/components/Button';
import { Box } from '@mui/system';
import { text, image, barcodes } from '@pdfme/schemas';
import { Form } from '@pdfme/ui';
import { useEffect, useMemo, useRef, useState } from 'react';
import { generate } from '@pdfme/generator';
import toast from 'react-hot-toast';
import { useUploadResume } from '@/hooks/api/uploadResume';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/Input';
import { StyledInput } from '@/app/(auth)/resume/create/(components)/steps/CreateResumeStep2/styled';

export interface CreateResumeStep2Props {
  template: any;
}

export default function CreateResumeStep2({
  template,
}: CreateResumeStep2Props) {
  const router = useRouter();
  const { mutate } = useUploadResume();
  const formContainer = useRef(null);
  const form = useRef<Form | null>(null);

  const [title, setTitle] = useState('');

  useEffect(() => {
    if (formContainer.current === null) return;

    const plugins = { text, image, qrcode: barcodes.qrcode };
    const inputs = [
      {
        name: 'Your name',
        phone: 'Type Something...',
        email: 'Type Something...',
        website: 'Type Something...',
        education: 'Type Something...',
        skill: 'Type Something...',
        summary: 'Type Something...',
        experience: 'Type Something...',
      },
    ];

    form.current = new Form({
      domContainer: formContainer.current,
      template,
      plugins,
      inputs,
    });
  }, [template]);

  const getPdfBuffer = async () => {
    if(!title) {
      toast.error('Please fill the resume title');
      return;
    }

    const inputs = form?.current?.getInputs();

    if (!inputs) {
      toast.error('Please fill the form first');
      return;
    }

    for (let input of inputs) {
      if (Object.values(input).some((value) => !value)) {
        toast.error('Please fill the form first');
        return;
      }
    }

    if (Object.values(inputs).some((input) => !input)) {
      toast.error('Please fill the form');
      return;
    }

    const plugins = { text, image, qrcode: barcodes.qrcode };
    const pdf = await generate({ template, plugins, inputs });

    return pdf.buffer;
  };

  const handleDownload = async () => {
    const buffer = await getPdfBuffer();
    if (!buffer) return;

    const blob = new Blob([buffer], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', 'resume.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleSave = async () => {
    const buffer = await getPdfBuffer();

    if (!buffer) return;

    const blob = new Blob([buffer], { type: 'application/pdf' });

    const form = new FormData();
    form.append('title', title);
    form.append('resume', blob, 'resume.pdf');
    form.append('template', JSON.stringify(template));

    mutate(form, {
      onSuccess: () => {
        toast.success('Resume saved');
        setTimeout(() => {
          router.push('/profile?tab=resumes');
        }, 500);
      },
    });
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Title>Fill the resume</Title>
        <Box display="flex" gap={2}>
          <Button onClick={handleDownload}>Download</Button>
          <Button onClick={handleSave}>Save</Button>
        </Box>
      </Box>
      <Box>
        <StyledInput
          placeholder="Resume title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Box>
      <Box ref={formContainer}></Box>
    </Box>
  );
}
