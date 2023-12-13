import { usePathname, useRouter } from 'next/navigation';
import { sentenceCase } from 'change-case';
import { HomeIcon } from '@heroicons/react/24/solid';
import { Box } from '@mui/system';

export default function Breadcrumb({ customTitle }: { customTitle?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  return pathname.split('/').map((item, index) => {
    if (item === '' || index !== 1) {
      return null;
    }

    return (
      <Box key={index} display="flex" color="#666" gap={1} mb={2}>
        <HomeIcon
          width={16}
          height={16}
          style={{
            cursor: 'pointer',
          }}
          onClick={() => {
            router.push('/');
          }}
        />
        <span>/</span>
        <span>{customTitle || sentenceCase(item)}</span>
      </Box>
    );
  });
}
