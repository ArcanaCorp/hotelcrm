'use client';

import CardBooking from "@/components/CardBooking";
import FormBooking from "@/components/FormBooking";
import RowBooking from "@/components/RowBooking";
import { useHotel } from "@/context/HotelContext";
import { useMemo, useState } from "react";

export default function page () {

    const { bookings } = useHotel();
    const [ view, setView ] = useState('');
    const [ details, setDetails ] = useState(null);

    const [filters, setFilters] = useState({
        checkin: '',
        checkout: '',
        status: ''
    });

    const handleCloseView = () => setView('');
    const handleDetails = (d) => {
        setDetails(d)
        setView('details')
    }

    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    // filtrado
    const filteredBookings = useMemo(() => {

        return bookings.filter((booking) => {

            const bookingCheckin = booking.check_in;
            const bookingCheckout = booking.check_out;

            // filtro checkin
            if (filters.checkin && bookingCheckin < filters.checkin) return false;

            // filtro checkout
            if (filters.checkout && bookingCheckout > filters.checkout) return false;

            // filtro estado
            if (filters.status && booking.status !== filters.status) return false;

            return true;

        });

    }, [bookings, filters]);

    return (
        <>
            
            <div className="w-full mb-md flex items-center justify-between">
                <div>
                    <h1 className="text-4xl">Gestión de reservas</h1>
                    <p>Aquí tienes el resumen de hoy.</p>
                </div>
                <button className="btn btn-primary btn-md" onClick={() => setView('booking')}>Nueva Reserva</button>
            </div>

            <div className="w-full flex gap-md">
                <div className="w-full flex flex-col gap-md">
                    <div className="bg-white border-surface rounded-md p-md flex items-center gap-md">
                        <div className="w-full">
                            <label className="block text-xs text-on-surface mb-md">Fecha de ingreso</label>
                            <input type="date" className="input rounded-md" value={filters.checkin} onChange={(e) => handleFilterChange('checkin', e.target.value)} />
                        </div>
                        <div className="w-full">
                            <label className="block text-xs text-on-surface mb-md">Fecha de salida</label>
                            <input type="date" className="input rounded-md" value={filters.checkout} onChange={(e) => handleFilterChange('checkout', e.target.value)} />
                        </div>
                        <div className="w-full">
                            <label className="block text-xs text-on-surface mb-md">Fecha de ingreso</label>
                            <select  className="input rounded-md" value={filters.status} onChange={(e) => handleFilterChange('status', e.target.value)}>
                                <option value={''}>Todos los estados</option>
                                <option value={'cancel'}>Cancelados</option>
                                <option value={'pending'}>Pendiente</option>
                                <option value={'confirmed'}>Confirmado</option>
                                <option value={'checkin'}>Check-in</option>
                                <option value={'checkout'}>Check-out</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <button className="btn btn-primary btn-md" onClick={() => setFilters({checkin: '', checkout: '', status: ''})}>Limpiar</button>
                        </div>
                    </div>
                    <div className="bg-white border-surface rounded-md">
                        <div className="w-full h bg-surface grid grid-6" style={{"--h": "50px"}}>
                            <div className="w-full h-full center text-xs">
                                <span className="uppercase">CÓDIGO</span>
                            </div>
                            <div className="w-full h-full center text-xs">
                                <span className="uppercase">Cliente</span>
                            </div>
                            <div className="w-full h-full center text-xs">
                                <span className="uppercase">Habitación</span>
                            </div>
                            <div className="w-full h-full center text-xs">
                                <span className="uppercase">Total</span>
                            </div>
                            <div className="w-full h-full center text-xs">
                                <span className="uppercase">Check-in</span>
                            </div>
                            <div className="w-full h-full center text-xs">
                                <span className="uppercase">Check-out</span>
                            </div>
                        </div>
                        <div className="w-full">
                            {filteredBookings.length > 0 ? (
                                filteredBookings.map((b) => (
                                    <RowBooking key={b.id} row={b} onSelected={handleDetails} />
                                ))
                            ) : (
                                <div><span>No hay reservas en este momento</span></div>
                            )}
                        </div>
                    </div>
                </div>
                {view && (
                    <div className="w bg-white p-md rounded-md border-surface" style={{"--mxw": "450px"}}>
                        {view === 'booking' ? (
                            <FormBooking onClose={handleCloseView}/>
                        ) : (
                            <CardBooking book={details} onClose={handleCloseView} />
                        )}
                    </div>
                )}
            </div>

        </>
    )
}