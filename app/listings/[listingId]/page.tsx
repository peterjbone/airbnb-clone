import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface IParams {
	listingId?: string;
}

// This is a server components (dont use hooks)
const ListingPage = async ({ params }: { params: IParams }) => {
	//console.log(params);

	const listing = await getListingById(params);
	const reservations = await getReservations(params);
	const currentUser = await getCurrentUser();

	if (!listing) {
		return (
			<ClientOnly>
				<EmptyState />
			</ClientOnly>
		);
	}

	//prettier-ignore
	return ( 
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
   );
};

export default ListingPage;
