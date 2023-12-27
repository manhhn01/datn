'use client';

import UserInfo from '@/components/AppBar/(components)/UserInfo';
import { StyleLink } from '@/components/AppBar/styled';
import AppLogo from '@/components/AppLogo';
import { Box } from '@mui/system';
import { usePathname, useRouter } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';

export default function AppBar() {
  const pathname = usePathname();
  const [scrollY, setScrollY] = useState(0);

  const isHomePage = pathname === '/';

  useLayoutEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    setScrollY(window.scrollY);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={8}
      py={2}
      height={90}
      width="100%"
      zIndex={999}
      top={0}
      left={0}
      position="fixed"
      className={scrollY > 0 ? 'scrolled' : ''}
      sx={{
        transition: 'all 0.3s ease-in-out',
      }}
      style={{
        backgroundColor: scrollY > 0 ? '#fff' : 'transparent',
      }}
    >
      <Box width={160} height="100%">
        <AppLogo />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={3}
        sx={{
          color: isHomePage ? 'white' : 'black',
        }}
      >
        <StyleLink href="/">Home</StyleLink>
        <StyleLink href="/jobs">Find jobs</StyleLink>
        <StyleLink href="/resume/create">Build Resume</StyleLink>
        <StyleLink href="/about">About</StyleLink>
      </Box>
      <UserInfo />
    </Box>
  );
}
