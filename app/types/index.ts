import { Listing, Reservation, User } from "@prisma/client";

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

//prettier-ignore
export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
}
