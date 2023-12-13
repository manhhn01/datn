'use client';

import CreateResumeStep1 from '@/app/(auth)/resume/create/(components)/steps/CreateResumeStep1';
import CreateResumeStep2 from '@/app/(auth)/resume/create/(components)/steps/CreateResumeStep2';
import Breadcrumb from '@/components/Breadcrumb';
import Container from '@/components/Container';
import Paper from '@/components/Paper/page';
import { useMemo, useState } from 'react';

export default function CreateResume() {
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const handleSelectTemplate = (template: any) => {
    setSelectedTemplate(template);
    setStep(2);
  };

  const stepComponent = useMemo(() => {
    switch (step) {
      case 1:
        return <CreateResumeStep1 onSelectTemplate={handleSelectTemplate} />;
      case 2:
        return <CreateResumeStep2 template={selectedTemplate} />;
      default:
        return null;
    }
  }, [selectedTemplate, step]);

  return (
    <Container>
      <Breadcrumb customTitle='Create resume'/>
      <Paper>{stepComponent}</Paper>
    </Container>
  );
}
