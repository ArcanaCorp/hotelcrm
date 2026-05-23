import { useAuth } from "@/context/AuthContext";
import { getHotelAll } from "@/services/hotel.service";
import { useState } from "react"

export const useProfile = () => {
    
    const { user } = useAuth();

    const [ profile, setProfile ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    const getProfile = async () => {
        if (!user?.id) return null;
        try {
            setLoading(true);
            const data = await getHotelAll(user.id);
            setProfile(data[0]);
            return data[0];
        } catch (error) {
            console.error(error);
            return null;
        } finally {
            setLoading(false)
        }
    }

    return {
        profile,
        loading,
        getProfile,
    }

}