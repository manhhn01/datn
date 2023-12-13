'use client';

import Button from '@/components/Button';
import ButtonText from '@/components/ButtonText';
import { Listbox } from '@/components/ListBox';
import { MenuItem } from '@/components/MenuItem';
import { useLogout } from '@/hooks/api/logout';
import { useAuthInfo } from '@/hooks/api/me';
import { DEFAULT_AVATAR, getImageUrl } from '@/utils/assest';
import { blue } from '@/utils/color';
import { Dropdown, Menu, MenuButton } from '@mui/base';
import { Box } from '@mui/system';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function UserInfo() {
  const router = useRouter();
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  const { data: authInfo, refetch: refetchAuthInfo } = useAuthInfo();
  const { mutate: logout } = useLogout();

  const handleLogin = () => {
    router.push('/login');
  };
  const handleRegister = () => {
    router.push('/register');
  };
  const handleProfileClick = () => {
    router.push('/profile');
  };
  const handleBookmarkClick = () => {
    router.push('/bookmark');
  };
  const handleLogoutClick = () => {
    logout(undefined, {
      onSuccess() {
        toast.success('Logout successfully');
        refetchAuthInfo();
      },
      onError() {
        toast.error('Logout failed');
      },
    });
  };

  return authInfo ? (
    <Box width="160px">
      <Dropdown>
        <MenuButton
          slots={{
            root: Box,
          }}
        >
          <Box
            height="42px"
            width="42px"
            ml="auto"
            position="relative"
            borderRadius="50%"
            overflow="hidden"
            border="1px solid #fff"
          >
            <Image
              src={getImageUrl(authInfo.result.avatar, DEFAULT_AVATAR)}
              alt="Avatar"
              fill
              objectFit="cover"
            />
          </Box>
        </MenuButton>
        <Menu
          style={{
            zIndex: 999,
          }}
          slots={{
            listbox: Listbox,
          }}
        >
          <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
          <MenuItem onClick={handleBookmarkClick}>Bookmark</MenuItem>
          <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
        </Menu>
      </Dropdown>
    </Box>
  ) : (
    <Box
      minWidth="160px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={3}
    >
      <ButtonText
        sx={{
          color: isHomePage ? 'white' : blue[500],
          fontWeight: 500,
          px: 1,
        }}
        onClick={handleLogin}
      >
        Log In
      </ButtonText>
      <Button
        sx={{
          borderRadius: 20,
          fontWeight: 500,
          px: 2.75,
        }}
        onClick={handleRegister}
      >
        Register
      </Button>
    </Box>
  );
}
