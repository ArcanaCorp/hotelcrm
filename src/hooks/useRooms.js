import { getRoomsByHotel } from "@/services/rooms.service";
import { useState } from "react"

export const useRooms = () => {

    const [ rooms, setRooms ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const getRooms = async (hotelId) => {
        if (!hotelId) return;
        try {
            setLoading(true)
            const data = await getRoomsByHotel(hotelId);
            setRooms(data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const addRoom = (room) => setRooms(prev => [room, ...prev])
    const updateRoom = (updateRoom) => setRooms(prev => prev.map(room => room.id === updateRoom.id ? { ...room, ...updateRoom } : room ) );
    const removeRoom = (roomId) => setRooms(rooms.filter(item => item.id !== roomId));

    return {
        rooms,
        loading,
        getRooms,
        addRoom,
        updateRoom,
        removeRoom
    }

}