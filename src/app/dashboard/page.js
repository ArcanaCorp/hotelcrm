'use client';

import CardKPI from "@/components/CardKPI";
import RowBooking from "@/components/RowBooking";
import { useHotel } from "@/context/HotelContext";
import { getGreeting } from "@/helpers/greeting";
import { generateKPIS } from "@/helpers/kpis";

export default function page () {

    const { profile, bookings, rooms, clients, payments } = useHotel();

    console.log(payments);
    
    const kpis = generateKPIS({rooms: rooms, reservations: bookings, clients: clients, payments: payments});

    return (
        <>
            <div className="w-full mb-md">
                <h1 className="text-4xl">¡{getGreeting()}, <b>{profile?.name}</b>!</h1>
                <p>Aquí tienes el resumen de hoy.</p>
            </div>
            <div className="w-full grid grid-4 gap-md mb-md">
                {kpis.map((kps, i) => (
                    <CardKPI key={i} kpi={kps} />
                ))}
            </div>
            <div className="w-full bg-white rounded-md border-surface">
                <div className="w-full p-md">
                    <h4 className="text-primary font-semibold text-lg">Últimas reservas</h4>
                    <p className="text-xs text-on-surface-variant">Resumen de ingresos recientes al sistema.</p>
                </div>
                <div className="w-full grid grid-6 h" style={{"--h": "50px"}}>
                    <div className="w-full center text-sm uppercase font-semibold bg-background text-center">Código</div>
                    <div className="w-full center text-sm uppercase font-semibold bg-background text-center">Huésped</div>
                    <div className="w-full center text-sm uppercase font-semibold bg-background text-center">Habitación</div>
                    <div className="w-full center text-sm uppercase font-semibold bg-background text-center">Fechas</div>
                    <div className="w-full center text-sm uppercase font-semibold bg-background text-center">Total</div>
                    <div className="w-full center text-sm uppercase font-semibold bg-background text-center">Estado</div>
                </div>
                <div className="w-full">
                    {bookings.length > 0 ? (
                        bookings
                            .slice(0, 10)
                            .map((book) => (
                                <RowBooking
                                    key={book.id}
                                    row={book}
                                    onSelected={() => {}}
                                    source={'dashboard'}
                                />
                            ))
                    ) : (
                        <div className="w-full p-xl text-center">
                            <p className="text-sm text-on-surface-variant">
                                No hay registros recientes.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}