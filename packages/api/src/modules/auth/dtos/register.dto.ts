import { UserType } from "@prisma/client";

export class RegisterDto {
  first_name: string;

  last_name: string;

  email: string;

  password: string;

  type: UserType;

  avatar?: string;
}
