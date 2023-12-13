'use client';

import FooterSection from '@/components/FooterSection';
import MainLayout from '@/components/containers/layout/MainLayout';
import { useAuthInfo } from '@/hooks/api/me';
import { Box } from '@mui/system';
import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';

export interface PublicLayoutProps {
  children: React.ReactNode;
}
export default function AuthLayout({ children }: PublicLayoutProps) {
  const router = useRouter();
  const { data: authInfo, isLoading } = useAuthInfo();

  useLayoutEffect(() => {
    if (!isLoading && !authInfo) {
      router.replace('/login');
    }
  }, [authInfo, isLoading, router]);

  return (
    authInfo && (
      <MainLayout>
        <Box pt="150px" pb="40px">
          {children}
        </Box>
        <FooterSection />
      </MainLayout>
    )
  );
}
