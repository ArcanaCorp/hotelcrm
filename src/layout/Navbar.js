'use client';

import Link from "next/link";
import { navs } from "./config";
import { usePathname, useRouter } from "next/navigation";
import { IconLogout } from "@tabler/icons-react";
import { createClientAuth } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useHotel } from "@/context/HotelContext";

export default function Navbar () {

    const { profile } = useHotel();
    const pathname = usePathname();
    const supabase = createClientAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            router.push('/')
        } catch (error) {
            console.error(error);
            toast.error('Error', { description: error.message })
        } finally {
            toast.success('Éxito', { description: 'Se cerró la sesión' })
        }
    }

    return (
        <nav className="w h-screen bg-white p-md flex flex-col justify-between" style={{"--w": "300px"}}>
            <div className="w-full flex gap-md items-center mb-md">
                <div className="w h bg-surface rounded-md" style={{"--w": "50px", "--h": "50px"}}>
                    <img src={profile?.hotels.logo || `https://ui-avatars.com/api/?name=${profile?.hotels.name}`} />
                </div>
                <p>
                    <span className="block text-lg font-medium">{profile?.hotels.name || 'Hotel'}</span>
                    <span className="block text-xs">SAAS DE GESTION</span>
                </p>
            </div>
            <ul className="flex flex-col gap-md h-full">
                {navs.map((item, i) => (
                    <Link key={i} href={item.url} className={`w-full flex items-center gap-md py-md px-sm text-sm rounded-md ${pathname === item.url ? 'bg-surface font-semibold text-primary' : ''}`}>{item.ico} {item.txt}</Link>
                ))}
            </ul>
            <div className="w-full">
                <div className="w-full flex items-center justify-between gap-md">
                    <div className="flex gap-md">
                        <div className="w h bg-surface rounded-md" style={{"--w": "50px", "--h": "50px"}}>
                            <img src={`https://ui-avatars.com/api/?name=${profile?.name || 'Usuario'}`} />
                        </div>
                        <p>
                            <span className="block font-medium">{profile?.name || 'Hotel'}</span>
                            <span className="block text-muted text-xs">Cuenta General</span>
                        </p>
                    </div>
                    <button className="w h center bg-surface rounded-md" style={{"--w": "50px", "--h": "50px"}} onClick={handleLogout}><IconLogout/></button>
                </div>
            </div>
        </nav>
    )
}