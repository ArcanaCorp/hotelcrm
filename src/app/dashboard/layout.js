'use client';
import { useAuth } from "@/context/AuthContext";
import { useHotel } from "@/context/HotelContext";
import Navbar from "@/layout/Navbar";
import { useEffect } from "react";

export default function DashboardLayout ({ children }) {

    const { user } = useAuth();
    const { getAllData } = useHotel();

    useEffect(() => {
        if (!user?.id) return;
        getAllData();
    }, [user])

    return (
        <div className="w-screen h-screen grid" style={{"gridTemplateColumns": "300px 1fr"}}>
            <Navbar/>
            <main className="w h-screen p-xl" style={{"--w": "calc(100dvw - 300px)", "overflowY": "auto"}}>{children}</main>
        </div>
    )
}