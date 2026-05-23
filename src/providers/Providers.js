import { AuthProvider } from "@/context/AuthContext";
import { HotelProvider } from "@/context/HotelContext";

export default function Providers ({ children }) {
    return (
        <AuthProvider>
            <HotelProvider>
                {children}
            </HotelProvider>
        </AuthProvider>
    )
}