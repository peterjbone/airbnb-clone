"use client";

import { BiSearch } from "react-icons/bi";

const Search = () => {
	return (
		<div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-md transition cursor-pointer">
			{/* Main Container ☝*/}
			{/* Sub Container 👇*/}
			<div className="flex flex-row items-center justify-between">
				{/* Buttons*/}
				<div className="text-sm font-semibold px-6">Anywhere</div>
				<div className="hidden md:block text-sm  font-semibold px-6 border-x-[1px] flex-1 text-center">
					Any week
				</div>
				<div className="flex flex-row items-center gap-3 text-sm pr-2 pl-6 text-gray-600">
					<div className="font-semibold hidden md:block">Add Guests</div>
					<div className="bg-rose-500 text-white text-2xl rounded-full p-2">
						<BiSearch />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Search;
