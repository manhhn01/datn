'use client';

import {
  GridContainer,
  GridItem,
} from '@/app/(public)/(components)/ListFeatureJobSection/styled';
import SearchInput from '@/app/(public)/(components)/SearchInput';
import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/Button';
import Container from '@/components/Container';
import EmptyList from '@/components/EmptyList';
import JobCard from '@/components/JobCard';
import { useListJob } from '@/hooks/api/listJob';
import { blue } from '@/utils/color';
import { Box } from '@mui/system';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

export default function JobPage() {
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();

  const keyword = useMemo(() => {
    return searchParams.get('keyword');
  }, [searchParams]);

  const location = useMemo(() => {
    return searchParams.get('location');
  }, [searchParams]);

  const { data: jobs } = useListJob({
    params: {
      take: page * 8,
      keyword: keyword,
      location: location,
    },
  });

  return (
    <>
      <Box
        sx={{
          background:
            "url('/blue-background.jpg') center center/cover no-repeat",
        }}
        mt="150px"
        py={9}
      >
        <Container>
          <SearchInput
            initValue={{
              keyword,
              location,
            }}
          />
        </Container>
      </Box>
      <Container>
        <Box mt={2}>
          <Breadcrumb customTitle='List job'/>
        </Box>
        <Box
          component="h2"
          color={blue[600]}
          fontSize={26}
          mb={3}
          textAlign="center"
        >
          {!!keyword || !!location ? 'SEARCH RESULT' : 'ALL JOBS'}
        </Box>
        {jobs?.length > 0 ? (
          <GridContainer>
            {jobs?.map((job: any) => (
              <GridItem key={job.id}>
                <JobCard job={job} />
              </GridItem>
            ))}
          </GridContainer>
        ) : (
          <EmptyList />
        )}
        {jobs?.length >= page * 8 && (
          <Box mt={2} display="flex" justifyContent="center">
            <Button
              variant="secondary"
              onClick={() => {
                setPage(page + 1);
              }}
              sx={{
                border: '1px solid #007FFF',
                backgroundColor: 'transparent',
                borderRadius: '25px',
                fontSize: '16px',
                padding: '8px 30px',
                fontWeight: 400,
              }}
            >
              Load more
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
}
