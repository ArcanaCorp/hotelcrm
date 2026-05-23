'use client';

import CardRoom from "@/components/CardRoom";
import FormEditRoom from "@/components/FormEditRoom";
import FormNewRoom from "@/components/FormNewRoom";
import { useHotel } from "@/context/HotelContext";
import { getRoomStats } from "@/helpers/kpis";
import { useState } from "react";

export default function page () {

    const { rooms } = useHotel();
    const [ view, setView ] = useState({
        type: '',
        data: null
    })

    const stats = getRoomStats(rooms);

    const handleClose = () => setView({type: '', data: null})
    const handleEdit = (data) => setView({type: 'edit', data})

    return (
        <>
            <div className="w-full mb-md flex items-center justify-between">
                <div>
                    <h1 className="text-4xl">Gestión de Habitaciones</h1>
                    <p>Aquí tienes el resumen de hoy.</p>
                </div>
                <button className="btn btn-primary btn-md" onClick={() => setView(prev => ({...prev, type: 'created'}))}>Nueva Habitación</button>
            </div>

            <div className="w-full flex gap-md my-2xl">
                {stats.map((stat, i) => (
                    <div key={i} className="w-full flex flex-col gap-md p-md rounded-md bg-white border-surface">
                        <span className="w h center bg-surface rounded-md" style={{"--w": "40px", "--h": "40px"}}>{stat.icon}</span>
                        <h3 className="text-4xl font-bold">{stat.value}{stat.unit}</h3>
                        <p className="text-xs text-muted">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="w-full flex gap-md">
                <div className={`w-full grid gap-md ${view.type ? 'grid-2' : 'grid-4'}`}>
                    {rooms.length > 0 ? (
                        rooms.map((room) => (
                            <CardRoom key={room.id} room={room} onEdit={handleEdit}/>
                        ))
                    ) : (
                        <div className="w-full"><span>No hay habitaciones</span></div>
                    )}
                </div>
                {view.type && (
                    <div className="w p-md bg-white rounded-md border-surface" style={{"--w": "450px", "--mnw": "450px"}}>
                        {view.type === 'created' && ( <FormNewRoom onClose={handleClose} /> )}
                        {view.type === 'edit' && ( <FormEditRoom room={view.data} onClose={handleClose} /> )}
                    </div>
                )}
            </div>
        </>
    )
}