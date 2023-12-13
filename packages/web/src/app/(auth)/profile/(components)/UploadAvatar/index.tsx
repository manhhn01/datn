import ButtonText from '@/components/ButtonText';
import { useAuthInfo } from '@/hooks/api/me';
import { useUploadAvatar } from '@/hooks/api/uploadAvatar';
import { DEFAULT_AVATAR, getImageUrl } from '@/utils/assest';
import { blue } from '@/utils/color';
import { Box } from '@mui/system';
import Image from 'next/image';
import { useRef } from 'react';

export default function UploadAvatar() {
  const { data: authInfo, refetch: refetchAuthInfo } = useAuthInfo();
  const { mutate: uploadAvatar, isPending: isUploadingAvatar } =
    useUploadAvatar();

  const uploadInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    uploadInputRef.current?.click();
  };

  const handleFileChange = () => {
    const file = uploadInputRef.current?.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);

      uploadAvatar(formData, {
        onSuccess: () => {
          refetchAuthInfo();
        },
        onSettled: () => {
          uploadInputRef.current!.value = '';
        },
      });
    }
  };

  return (
    <Box mb={6} display="flex" flexDirection="column" alignItems="center">
      <Box
        width="200px"
        height="200px"
        borderRadius="8px"
        boxShadow="0px 2px 4px rgba(0,0,0, 0.05)"
        overflow="hidden"
        position="relative"
        mb={1}
      >
        <Image
          src={getImageUrl(authInfo?.result.avatar, DEFAULT_AVATAR)}
          alt="avatar"
          fill
          objectFit="cover"
        />
      </Box>
      <ButtonText
        sx={{
          color: blue[500],
        }}
        disabled={isUploadingAvatar}
        onClick={handleUploadClick}
      >
        Upload
      </ButtonText>
      <input
        ref={uploadInputRef}
        onChange={handleFileChange}
        type="file"
        accept="image/*"
        hidden
      />
    </Box>
  );
}
