'use client';

import {
  FormControl,
  FormLabel,
  FormWrapper,
  StyledInput,
  SubTitle,
  Title,
} from '@/app/(guest)/share/styled';
import { FormError } from '@/app/(guest)/share/styled';
import Button from '@/components/Button';
import { useLogin } from '@/hooks/api/login';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/system';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthInfo } from '@/hooks/api/me';

interface ILoginFormValues {
  email: string;
  password: string;
}

const loginSchema = yup.object({
  email: yup.string().required('Email is required').email('Email is invalid'),
  password: yup.string().required('Password is required'),
});

export default function LoginPage() {
  const router = useRouter();
  const { mutate: login } = useLogin();
  const { refetch: refetchAuthInfo } = useAuthInfo();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid, isSubmitting, errors },
  } = useForm<ILoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
    mode: 'onTouched',
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const onSubmit = (data: ILoginFormValues) => {
    return new Promise((resolve) => {
      login(
        {
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: () => {
            toast.success('Login successfully')
            refetchAuthInfo();
            router.push('/')
            resolve(null);
          },
          onError: (error) => {
            if (error instanceof axios.AxiosError) {
              toast.error(error.response?.data.message);
              resolve(null);
            } else {
              toast.error('Unknown Error');
              resolve(null);
            }
          },
        },
      );
    });
  };

  return (
    <Box
      width="100%"
      height="100%"
      padding="20px"
      display="flex"
      margin="auto 0"
      justifyContent="center"
    >
      <FormWrapper>
        <Title>Welcome back!</Title>
        <SubTitle>
          Let's build an outstanding profile and get ideal career opportunities
        </SubTitle>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          flexDirection="column"
          width="100%"
        >
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <StyledInput
                  placeholder="Please type your email"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  error={!!error}
                />
              )}
            />
            {errors.email && <FormError>{errors.email.message}</FormError>}
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <StyledInput
                  type="password"
                  placeholder="Please type your password"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  error={!!error}
                />
              )}
            />
            {errors.password && (
              <FormError>{errors.password.message}</FormError>
            )}
          </FormControl>
          <FormControl>
            <Button
              disabled={!isReady || !isValid || isSubmitting}
              type="submit"
              variant="primary"
              sx={{
                width: '100%',
                transitionDuration: isReady ? '0.3s' : '0s',
              }}
            >
              Login
            </Button>
          </FormControl>
        </Box>
        <Box display="flex">
          <SubTitle>Don't have an account? </SubTitle>
          <Link href="/register">
            <SubTitle
              sx={{
                color: '#007FFF',
                ml: 1,
              }}
            >
              Register
            </SubTitle>
          </Link>
        </Box>
      </FormWrapper>
    </Box>
  );
}
