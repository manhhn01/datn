'use client';

import { FormWrapper } from '@/app/(guest)/share/styled';
import {
  FormControl,
  FormError,
  FormLabel,
  StyledInput,
  SubTitle,
  Title,
} from '@/app/(guest)/share/styled';
import Button from '@/components/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/system';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import axios from 'axios';
import { useRegister } from '@/hooks/api/register';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { phoneRegex } from '@/utils/regex';

interface IRegisterFormValues {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const registerSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phone: yup
    .string()
    .required('Phone is required')
    .matches(phoneRegex, 'Phone number is not valid'),
  email: yup.string().required('Email is required').email('Email is invalid'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password'), ''], 'Confirm password not match your password'),
});

export default function RegisterPage() {
  const router = useRouter()
  const { mutate: register } = useRegister();
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting, errors, isValidating },
  } = useForm<IRegisterFormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(registerSchema),
    mode: 'onTouched',
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const onSubmit = (data: IRegisterFormValues) => {
    return new Promise((resolve) => {
      register(
        {
          firstName: data.firstName,
          lastName: data.lastName,
          password: data.password,
          email: data.email,
          phone: data.phone,
          type: 'CANDIDATE',
        },
        {
          onSuccess: () => {
            toast.success('Register successfully! Please login to continue');
            router.push('/login')
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
      justifyContent="center"
    >
      <FormWrapper>
        <Title>
          Welcome to Jobify
        </Title>
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
            <FormLabel>First Name</FormLabel>
            <Controller
              name="firstName"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <StyledInput
                  placeholder="Please type your first name"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  error={!!error}
                />
              )}
            />
            {errors.firstName && (
              <FormError>{errors.firstName.message}</FormError>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Controller
              name="lastName"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <StyledInput
                  placeholder="Please type your last name"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  error={!!error}
                />
              )}
            />
            {errors.lastName && (
              <FormError>{errors.lastName.message}</FormError>
            )}
          </FormControl>
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
            <FormLabel>Phone</FormLabel>
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <StyledInput
                  placeholder="Please type your phone"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  error={!!error}
                />
              )}
            />
            {errors.phone && <FormError>{errors.phone.message}</FormError>}
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
            <FormLabel>Confirm Password</FormLabel>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <StyledInput
                  type="password"
                  placeholder="Please re-type your password"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  error={!!error}
                />
              )}
            />
            {errors.confirmPassword && (
              <FormError>{errors.confirmPassword.message}</FormError>
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
              Register
            </Button>
          </FormControl>
        </Box>
        <Box display="flex">
          <SubTitle>Already have an account?</SubTitle>
          <Link href="/login">
            <SubTitle
              sx={{
                color: '#007FFF',
                ml: 1,
              }}
            >
              Login
            </SubTitle>
          </Link>
        </Box>
      </FormWrapper>
    </Box>
  );
}
