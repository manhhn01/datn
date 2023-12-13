import { CompanySize, UserType } from "@prisma/client";

export class RegisterDto {
  first_name?: string;

  last_name?: string;

  email?: string;

  password: string;

  phone: string;

  type: UserType;

  avatar?: string;

  company_name?: string;

  company_size?: CompanySize;

  industry_id?: number;
}
