"use client";

import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
	const searchModal = useSearchModal();
	const params = useSearchParams();
	const { getByValue } = useCountries();

	const locationValue = params?.get("locationValue");
	const startDate = params?.get("startDate");
	const endDate = params?.get("endDate");
	const guestCount = params?.get("guestCount");

	const locationLabel = useMemo(() => {
		if (locationValue) {
			return getByValue(locationValue as string)?.label;
		}

		return "Anywhere";
	}, [getByValue, locationValue]);

	const durationLabel = useMemo(() => {
		if (startDate && endDate) {
			const start = new Date(startDate as string);
			const end = new Date(endDate as string);
			let diff = differenceInDays(end, start);

			if (diff === 0) {
				diff = 1;
			}

			return `${diff} Days`;
		}

		return "Any Week";
	}, [startDate, endDate]);

	const guestLabel = useMemo(() => {
		if (guestCount) {
			return `${guestCount} Guests`;
		}

		return "Add Guests";
	}, [guestCount]);

	//prettier-ignore
	return (
    <div
      onClick={searchModal.onOpen}
      className="
      border-[1px]
      w-full
      md:w-auto
      py-2
      rounded-full
      shadow-md
      transition
      cursor-pointer
    ">
			{/* Main Container ☝*/}
			{/* Sub Container 👇*/}
			<div className="flex flex-row items-center justify-between">
				{/* Buttons*/}
        <div className="
        text-sm
        font-semibold
        px-6">
          {locationLabel}
        </div>
				<div className="hidden md:block text-sm  font-semibold px-6 border-x-[1px] flex-1 text-center">
					{durationLabel}
				</div>
				<div className="flex flex-row items-center gap-3 text-sm pr-2 pl-6 text-gray-600">
          <div className="font-semibold hidden md:block">
            {guestLabel}
          </div>
					<div className="bg-rose-500 text-white text-2xl rounded-full p-2">
						<BiSearch />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Search;
