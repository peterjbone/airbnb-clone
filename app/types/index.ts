import { Listing, User } from "@prisma/client";

//prettier-ignore
export type SafeListing = Omit<
  Listing,
  "createdAt"
  > & {
  createdAt: string;
}

//prettier-ignore
export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
}
