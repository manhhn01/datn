'use client';

import { Title } from '@/app/(public)/jobs/[id]/styled';
import Button from '@/components/Button';
import ButtonText from '@/components/ButtonText';
import Container from '@/components/Container';
import Paper from '@/components/Paper/page';
import { useDetailJob } from '@/hooks/api/detailJob';
import { blue, grey } from '@/utils/color';
import { HeartIcon } from '@heroicons/react/24/outline';
import {
  CurrencyDollarIcon,
  MapPinIcon,
  HeartIcon as HeartIconSolid,
} from '@heroicons/react/24/solid';
import { Box } from '@mui/system';
import Image from 'next/image';
import { sentenceCase } from 'change-case';
import Modal from '@/components/Modal';
import ApplyModal from '@/components/containers/modal/Apply';
import Breadcrumb from '@/components/Breadcrumb';
import { useAuthInfo } from '@/hooks/api/me';
import { useListBookmark } from '@/hooks/api/listBookmark';
import { useBookmarkJob } from '@/hooks/api/bookmarkJob';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function JobDetailPage({ params }: any) {
  const router = useRouter();
  const { data: detailJob } = useDetailJob(params.id);
  const { data: authInfo } = useAuthInfo();
  const { data: listBookmark, refetch: refetchListBookmark } =
    useListBookmark();
  const { mutate: addBookmark } = useBookmarkJob();

  return (
    <Container pt="150px">
      <Breadcrumb />
      <Paper mb={2}>
        <Title>{detailJob?.title}</Title>
        <Box display="flex" mb={3}>
          <Box width="50%" display="flex" alignItems="center" gap={3}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor={blue[400]}
              borderRadius="50%"
              width={36}
              height={36}
            >
              <CurrencyDollarIcon width={22} height={22} color="white" />
            </Box>
            <Box>
              <Box component="p" fontSize="18px" fontWeight={600}>
                Salary
              </Box>
              {detailJob && (
                <p>
                  {detailJob?.salary_min} - {detailJob?.salary_max}
                </p>
              )}
            </Box>
          </Box>
          <Box width="50%" display="flex" alignItems="center" gap={3}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor={blue[400]}
              borderRadius="50%"
              width={36}
              height={36}
            >
              <MapPinIcon width={22} height={22} color="white" />
            </Box>
            <Box>
              <Box component="p" fontSize="18px" fontWeight={600}>
                Location
              </Box>
              <p>{detailJob?.location}</p>
            </Box>
          </Box>
        </Box>
        <Box display="flex" width="100%" alignItems="center">
          <Modal
            trigger={
              <Button sx={{ flex: 1 }} onClick={(e: any) => e.preventDefault}>
                Apply now
              </Button>
            }
          >
            {detailJob && <ApplyModal job={detailJob} />}
          </Modal>
          {listBookmark?.find(
            (bookmark: any) => bookmark?.job?.id === detailJob?.id,
          ) ? (
            <ButtonText
              sx={{ borderRadius: '25px', ml: 2 }}
              onClick={() => {
                if (!authInfo) {
                  router.replace('/login');
                }
                addBookmark(
                  { id: detailJob.id },
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
              sx={{ borderRadius: '25px', ml: 2 }}
              onClick={() => {
                if (!authInfo) {
                  router.replace('/login');
                }
                addBookmark(
                  { id: detailJob.id },
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
      </Paper>
      <Box display="flex" gap={2}>
        <Paper flex={1}>
          <Title
            sx={{
              fontSize: 20,
            }}
          >
            Job description
          </Title>
          <Box>{detailJob?.description}</Box>
        </Paper>
        <Paper width={350}>
          <Title
            sx={{
              fontSize: 20,
            }}
          >
            About the company
          </Title>
          <Box mb={2}>
            <Box display="flex" alignItems="center">
              <Box
                width={100}
                height={100}
                position="relative"
                borderRadius="8px"
                boxShadow="0px 2px 4px rgba(0,0,0, 0.1)"
                mr={2}
              >
                <Image
                  src={detailJob?.employer.logo}
                  alt="Employer logo"
                  style={{ objectFit: 'contain' }}
                  fill
                />
              </Box>
              <Box component="p" fontWeight={600} fontSize={16}>
                {detailJob?.employer.company_name}
              </Box>
            </Box>
          </Box>
          <Box component="p" mb={1}>
            <Box component="span" color={grey[600]}>
              Company size:{' '}
            </Box>
            {sentenceCase(detailJob?.employer.company_size || '')}
          </Box>
          <Box component="p" mb={1}>
            <Box component="span" color={grey[600]}>
              Location:{' '}
            </Box>
            {detailJob?.employer.location}
          </Box>
          <Box component="p" mb={1}>
            <Box component="span" color={grey[600]}>
              Website:{' '}
            </Box>
            <a href={detailJob?.employer.website} style={{ color: 'blue' }}>
              {detailJob?.employer.website}
            </a>
          </Box>
          <Box component="p" mb={1}>
            <Box component="span" color={grey[600]}>
              Description:{' '}
            </Box>
            {detailJob?.employer.description}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
