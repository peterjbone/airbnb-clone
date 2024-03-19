import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const ReservationPage = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		//prettier-ignore
		return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    )
	}

	const reservations = await getReservations({
		authorId: currentUser.id
	});

	if (reservations.length === 0) {
		//prettier-ignore
		return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subtitle="Looks like you have no reservations on your properties."
        />
      </ClientOnly>
    )
	}

	//prettier-ignore
	return (
		<ClientOnly>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser} />
		</ClientOnly>
	);
};

export default ReservationPage;
