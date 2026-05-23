import { db } from "@/lib/supabase/hotel";

export const getPaymentsByHotel = async (hotelId) => {
    try {
        const { data, error } = await db
            .from('payments')
            .select(`
                *,
                reservations (
                    *
                )
            `)
            .eq('hotel_id', hotelId)
            .order('created_at', { ascending: false });
        if (error) {
            throw error;
        }
        return data || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}