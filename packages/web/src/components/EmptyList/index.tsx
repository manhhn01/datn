import { Box } from '@mui/system';
import Image from 'next/image';

export default function EmptyList() {
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      py={14}
      flexDirection="column"
      gap={1}
      sx={{
        opacity: 0.3,
      }}
    >
      <Image
        src="/images/empty-list.png"
        width={100}
        height={100}
        alt="Empty"
        style={{
          objectFit: 'cover',
        }}
      />
      <Box component="p">No items found</Box>
    </Box>
  );
}
