"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
	label: string;
	icon: IconType;
	selected?: boolean;
}

//prettier-ignore
const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  icon: Icon, //"Icon" is an alias in order to use it as a component
  selected
}) => {
	const router = useRouter();
	const params = useSearchParams();

	/**
	 * This function obtains the current query and updates it to the
	 * category that the user has chosen.
	 * @warning If the current query is the same as the selected 
   * category, the category will be removed from the query.
	 */
	const handleClick = useCallback(() => {
		let currentQuery = {};

		if (params) {
			currentQuery = qs.parse(params.toString());
		}

		const updatedQuery: any = {
			...currentQuery,
			category: label
		};

		if (params?.get("category") === label) {
			delete updatedQuery.category;
		}

		const url = qs.stringifyUrl(
			{
				url: "/",
				query: updatedQuery
			},
			{ skipNull: true }
		);

		router.push(url);
  }, [label, params, router]);

	return (
		<div
			onClick={handleClick}
			className={` 
      flex
      flex-col
      items-center
      justify-center
      gap-2
      p-3
      border-b-2
      hover:text-neutral-800
      transition
      cursor-pointer
      ${selected ? "border-b-neutral-800" : "border-transparent"}
      ${selected ? "text-neutral-800" : "text-neutral-500"}
     `}>
			<Icon size={30} />
			<div className="font-medium text-sm">{label}</div>
		</div>
	);
};

export default CategoryBox;
