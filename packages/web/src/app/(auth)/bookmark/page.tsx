'use client';

import { GridItem, Title } from '@/app/(auth)/bookmark/styled';
import { GridContainer } from '@/app/(public)/(components)/ListFeatureJobSection/styled';
import Container from '@/components/Container';
import JobCard from '@/components/JobCard';
import Paper from '@/components/Paper/page';
import { useListBookmark } from '@/hooks/api/listBookmark';
import { useMemo, useState } from 'react';

export default function CreateResume() {
  const { data } = useListBookmark();

  return (
    <Container>
      <Paper>
        <Title
          sx={{
            mb: 3,
          }}
        >
          Your bookmarked jobs
        </Title>

        <GridContainer>
          {data?.map(({ job }: any) => (
            <GridItem key={job.id}>
              <JobCard job={job} />
            </GridItem>
          ))}
        </GridContainer>
      </Paper>
    </Container>
  );
}
