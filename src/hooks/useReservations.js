import { getReservationsByHotel } from "@/services/reservation.service";
import { useState } from "react"

export const useReservations = () => {

    const [ bookings, setBookings ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const getReservations = async (hotelId) => {
        if (!hotelId) return;
        try {
            setLoading(true);
            const data = await getReservationsByHotel(hotelId);
            setBookings(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const addBook = (book) => setBookings(prev => [book, ...prev]);

    const updateBooking = ({ reservationId, status, payment_status }) => {
        setBookings(prev =>
            prev.map(booking => {
                if (booking.id !== reservationId) return booking;
                return {
                    ...booking,
                    ...(status && {
                        status
                    }),
                    ...(payment_status && {
                        payment_status
                    })
                };
            })
        );
    };

    return {
        bookings,
        loading,
        getReservations,
        addBook,
        updateBooking
    }

}