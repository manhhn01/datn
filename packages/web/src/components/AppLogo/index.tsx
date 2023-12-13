import { Box, BoxProps } from '@mui/system';
import Image from 'next/image';
import Link from 'next/link';

export default function AppLogo(props: BoxProps) {
  return (
    <Link href="/">
      <Box position="relative" height="100%" width="100%" {...props}>
        <Image src="/logo.svg" alt="Jobify" fill objectFit="cover" />
      </Box>
    </Link>
  );
}
