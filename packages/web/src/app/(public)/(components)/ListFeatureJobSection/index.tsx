'use client';

import {
  GridContainer,
  GridItem,
} from '@/app/(public)/(components)/ListFeatureJobSection/styled';
import { SubTitle, Title } from '@/app/(public)/(components)/share/styled';
import Button from '@/components/Button';
import Chip from '@/components/Chip';
import Container from '@/components/Container';
import JobCard from '@/components/JobCard';
import { useListBookmark } from '@/hooks/api/listBookmark';
import { useListJob } from '@/hooks/api/listJob';
import { Box } from '@mui/system';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function ListFeatureJobSection() {
  const router = useRouter();
  const { data: jobs } = useListJob({
    params: {
      take: 8,
    },
  });

  return (
    <Container>
      <Chip
        sx={{
          display: 'block',
          mx: 'auto',
          width: 'fit-content',
          mb: 2,
        }}
      >
        Feature jobs
      </Chip>

      <Title>
        Various Career Opportunities <br /> Waiting For You
      </Title>

      <GridContainer>
        {jobs?.map((job: any) => (
          <GridItem key={job.id}>
            <JobCard job={job} />
          </GridItem>
        ))}
      </GridContainer>
      <Box textAlign="center" onClick={() => router.push('/jobs')}>
        <Button
          variant="secondary"
          sx={{
            border: '1px solid #007FFF',
            backgroundColor: 'transparent',
            borderRadius: '25px',
            fontSize: '16px',
            padding: '8px 30px',
            fontWeight: 400,
          }}
        >
          See all jobs
        </Button>
      </Box>
    </Container>
  );
}
