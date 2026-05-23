import { getPaymentsByHotel } from "@/services/payments.service";
import { useState } from "react"

export const usePayments = () => {

    const [ payments, setPayments ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const getPayments = async (hotelId) => {
        if (!hotelId) return;
        try {
            setLoading(true);
            const data = await getPaymentsByHotel(hotelId);
            setPayments(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return {
        payments,
        loading,
        getPayments
    }

}