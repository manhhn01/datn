'use client';

import UploadAvatar from '@/app/(auth)/profile/(components)/UploadAvatar';
import { FormControl, FormLabel } from '@/app/(auth)/profile/styled';
import Container from '@/components/Container';
import { Description } from '@/components/JobCard/styled';
import Paper from '@/components/Paper/page';
import Switch from '@/components/Switch';
import { useAuthInfo } from '@/hooks/api/me';
import { useUpdateProfile } from '@/hooks/api/updateProfile';
import { Box } from '@mui/system';
import { useEffect, useMemo } from 'react';
import BasicInformationTab from '@/components/containers/tab/BasicInfomation';
import { Tabs } from '@mui/base';
import { Tab, TabPanel, TabsList } from '@/components/Tabs';
import ResumesTab from '@/components/containers/tab/Resume';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';

export enum TabItem {
  Information,
  Resumes,
}

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: authInfo, refetch: refetchAuthInfo } = useAuthInfo();
  const { mutate: update } = useUpdateProfile();

  const handleIsLookingForJobChange = (event: any) => {
    update(
      {
        looking_for_job: event.target.checked,
      },
      {
        onSettled: () => {
          refetchAuthInfo();
        },
      },
    );
  };

  const selectTab = useMemo(() => {
    const tab = searchParams.get('tab');
    if (tab === 'resumes') {
      return TabItem.Resumes;
    }

    return TabItem.Information;
  }, [searchParams]);

  const handleTabChange = (event: any, newValue: any) => {
    if (newValue === TabItem.Information) {
      router.replace('/profile?tab=information');
    } else {
      router.replace('/profile?tab=resumes');
    }
  };

  return (
    <Container>
      <Breadcrumb customTitle='Profile'/>
      <Tabs value={selectTab} onChange={handleTabChange}>
        <TabsList>
          <Tab value={TabItem.Information}>Information</Tab>
          <Tab value={TabItem.Resumes}>Resumes</Tab>
        </TabsList>

        <TabPanel value={TabItem.Information}>
          <Box width="100%" display="flex" gap={3}>
            <Paper
              sx={{
                flex: 1,
              }}
            >
              <BasicInformationTab />
            </Paper>
            <Paper
              sx={{
                alignSelf: 'stretch',
                width: '450px',
              }}
            >
              <Box
                sx={{
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <UploadAvatar />
                <FormControl
                  display="flex"
                  alignItems="flex-start"
                  sx={{
                    mb: 0,
                  }}
                >
                  <Switch
                    sx={{
                      flexShrink: 0,
                    }}
                    checked={authInfo?.result?.candidate.looking_for_job}
                    onChange={handleIsLookingForJobChange}
                  />
                  <Box pt={1.5}>
                    <FormLabel
                      sx={{
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#333',
                      }}
                    >
                      Enable looking for job{' '}
                    </FormLabel>
                  </Box>
                </FormControl>
                <Description>
                  Turning on job search helps your profile stand out and get
                  more attention in employer search lists.
                </Description>
              </Box>
            </Paper>
          </Box>
        </TabPanel>

        <TabPanel value={TabItem.Resumes}>
          <ResumesTab />
        </TabPanel>
      </Tabs>
    </Container>
  );
}
