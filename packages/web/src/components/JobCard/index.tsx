import React from 'react';
import { Box } from '@mui/system';
import {
  CompanyLogo,
  CompanyName,
  Description,
  JobCardWrapper,
  Role,
  Salary,
  Tags,
  Time,
} from '@/components/JobCard/styled';
import Chip from '@/components/Chip';
import Button from '@/components/Button';
import { DEFAULT_AVATAR, getImageUrl } from '@/utils/assest';
import { formatDistanceToNow } from 'date-fns';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import ButtonText from '@/components/ButtonText';
import { useRouter } from 'next/navigation';
import { useBookmarkJob } from '@/hooks/api/bookmarkJob';
import toast from 'react-hot-toast';
import { useListBookmark } from '@/hooks/api/listBookmark';
import { blue } from '@/utils/color';
import { useAuthInfo } from '@/hooks/api/me';

export interface JobCardProps {
  job: any;
}

export default function JobCard({ job }: JobCardProps) {
  const router = useRouter();
  const { data: authInfo } = useAuthInfo();
  const { data: listBookmark, refetch: refetchListBookmark } =
    useListBookmark();
  const { mutate: addBookmark } = useBookmarkJob();

  return (
    <JobCardWrapper>
      <Box mb={3}>
        <Box display="flex" mb={3}>
          <CompanyLogo
            src={getImageUrl(job?.employer?.logo, DEFAULT_AVATAR)}
            width={60}
            height={60}
            alt="Company logo"
          />
          <Box
            ml={2}
            display="flex"
            justifyContent="space-around"
            flexDirection="column"
          >
            <CompanyName>{job?.employer?.company_name}</CompanyName>
            {job?.created_at && (
              <Time>{formatDistanceToNow(new Date(job?.created_at))}</Time>
            )}
          </Box>
        </Box>

        <Role>{job?.title}</Role>
        <Description>{job?.description}</Description>

        <Tags>
          <Chip variant="secondary">Full time</Chip>
        </Tags>
      </Box>
      <Box display="flex" justifyContent="center" flexDirection="column" pb={2}>
        <Box display="flex" alignItems="baseline" mb={2}>
          <Salary>
            ${job.salary_min} - ${job.salary_max}
          </Salary>
          <p>/monthly</p>
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            onClick={() => router.push(`/jobs/${job.id}`)}
            sx={{ borderRadius: '25px', flex: 1 }}
          >
            View
          </Button>
          {listBookmark?.find(
            (bookmark: any) => bookmark?.job?.id === job?.id,
          ) ? (
            <ButtonText
              sx={{ borderRadius: '25px' }}
              onClick={() => {
                if (!authInfo) {
                  router.replace('/login');
                }
                addBookmark(
                  { id: job.id },
                  {
                    onSuccess: () => {
                      toast.success('Remove saved job successfully');
                    },
                    onSettled: () => {
                      refetchListBookmark();
                    },
                  },
                );
              }}
            >
              <HeartIconSolid
                color={blue[400]}
                width={26}
                height={26}
                style={{ marginTop: 3 }}
              />
            </ButtonText>
          ) : (
            <ButtonText
              sx={{ borderRadius: '25px' }}
              onClick={() => {
                if (!authInfo) {
                  router.replace('/login');
                }
                addBookmark(
                  { id: job.id },
                  {
                    onSuccess: () => {
                      toast.success('Save job successfully');
                    },
                    onSettled: () => {
                      refetchListBookmark();
                    },
                  },
                );
              }}
            >
              <HeartIcon width={26} height={26} style={{ marginTop: 3 }} />
            </ButtonText>
          )}
        </Box>
      </Box>
    </JobCardWrapper>
  );
}
