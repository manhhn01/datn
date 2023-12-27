import {
  FormControl,
  FormError,
  FormLabel,
  StyledInput,
  StyledSelect,
} from '@/app/(auth)/profile/styled';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@/components/Button';
import { phoneRegex } from '@/utils/regex';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useUpdateProfile } from '@/hooks/api/updateProfile';
import { Box } from '@mui/system';
import { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useListSkill } from '@/hooks/api/listSkill';
import { useAuthInfo } from '@/hooks/api/me';
import { Title } from '@/components/containers/tab/BasicInfomation/styled';

interface IUpdateInfoFormValues {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address?: string;
  skill: { value: string }[];
}

const updateBasicInfoSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phone: yup
    .string()
    .required('Phone is required')
    .matches(phoneRegex, 'Phone number is not valid'),
  email: yup.string().required('Email is required').email('Email is invalid'),
  address: yup.string(),
  skill: yup
    .array()
    .of(
      yup.object({
        value: yup.string().required(),
      }),
    )
    .required('Skill is required'),
});

export default function BasicInformationTab() {
  const { data: authInfo, refetch: refetchAuthInfo } = useAuthInfo();
  const { data: skills } = useListSkill();
  const { mutate: update } = useUpdateProfile();

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { isValid, isSubmitting, errors, isValidating },
  } = useForm<IUpdateInfoFormValues>({
    resolver: yupResolver(updateBasicInfoSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address: '',
      skill: [],
    },
    mode: 'onTouched',
  });

  const skillOptions = useMemo(() => {
    if (!skills) return [];
    return skills.map((skill: any) => ({
      value: skill.id,
      label: skill.name,
    }));
  }, [skills]);

  useEffect(() => {
    if (authInfo?.result) {
      reset({
        firstName: authInfo.result.first_name,
        lastName: authInfo.result.last_name,
        phone: authInfo.result.candidate.phone,
        email: authInfo.result.email,
        address: authInfo.result.candidate.address,
        skill: authInfo.result.candidate.skills.map((skill: any) => ({
          value: skill.id,
          label: skill.skill.name,
        })),
      });
    }
  }, [authInfo, reset]);

  const onSubmit = (values: IUpdateInfoFormValues) => {
    return new Promise((resolve) => {
      update(
        {
          first_name: values.firstName,
          last_name: values.lastName,
          phone: values.phone,
          email: values.email,
          address: values.address,
          skill: values.skill.map((skill) => Number(skill.value)),
        },
        {
          onSuccess: () => {
            toast.success('Update profile successfully');
          },
          onError: (err) => {
            if (err instanceof axios.AxiosError) {
              toast.error(err.response?.data.message);
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
    <>
      <Title>Basic information</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          {errors.lastName && <FormError>{errors.lastName.message}</FormError>}
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
          <FormLabel>Address</FormLabel>
          <Controller
            name="address"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <StyledInput
                placeholder="Please type your address"
                onChange={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                error={!!error}
              />
            )}
          />
          {errors.address && <FormError>{errors.address.message}</FormError>}
        </FormControl>
        <FormControl>
          <FormLabel>Skill</FormLabel>
          <Controller
            name="skill"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <StyledSelect
                id="skillSelect"
                isMulti
                name="skill"
                options={skillOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Please type your skill"
                onChange={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
              />
            )}
          />
          {errors.skill && <FormError>{errors.skill.message}</FormError>}
        </FormControl>
        <Button type="submit" disabeld={isSubmitting}>
          Save
        </Button>
      </form>
    </>
  );
}
