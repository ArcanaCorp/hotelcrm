'use client';
import { useClient } from "@/hooks/useClient";
import { useFeatures } from "@/hooks/useFeatures";
import { usePayments } from "@/hooks/usePayments";
import { useProfile } from "@/hooks/useProfile";
import { useReservations } from "@/hooks/useReservations";
import { useRooms } from "@/hooks/useRooms";
import { createContext, useContext } from "react";

const HotelContext = createContext();

export function HotelProvider ({ children }) {

    const features = useFeatures();
    const profile = useProfile();
    const bookings = useReservations();
    const rooms = useRooms();
    const clients = useClient();
    const payments = usePayments();

    const getAll = async () => {
        const profileData  = await profile.getProfile();
        if (!profileData?.hotels?.id) return;
        const hotelId = profileData.hotels.id;
        await Promise.all([
            features.getFeatures(),
            bookings.getReservations(hotelId),
            rooms.getRooms(hotelId),
            clients.getClients(hotelId),
            payments.getPayments(hotelId)
        ])
    }

    const contextValue = {

        getAllData: getAll,

        features: features.features,
        loadFeatures: features.loading,

        profile: profile.profile,
        loadProfile: profile.loading,

        bookings: bookings.bookings,
        loadBooks: bookings.loading,
        addBook: bookings.addBook,

        rooms: rooms.rooms,
        loadRooms: rooms.loading,
        addRoom: rooms.addRoom,
        updateRoom: rooms.updateRoom,
        removeRoom: rooms.removeRoom,

        clients: clients.clients,
        loadClients: clients.loading,
        addClient: clients.addClient,
        updateClient: clients.updateClient,
        removeClient: clients.removeClient,

        payments: payments.payments,
        loadPayments: payments.loading,

    }

    return (
        <HotelContext.Provider value={contextValue}>{children}</HotelContext.Provider>
    )

}

export const useHotel = () => {

    const context = useContext(HotelContext);

    if (!context) {
        throw new Error(
            'useHotel debe usarse dentro de HotelProvider'
        );
    }

    return context;

}