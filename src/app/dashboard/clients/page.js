'use client';

import FormEditClient from "@/components/FormEditClient";
import FormNewClient from "@/components/FormNewClient";
import RowClients from "@/components/RowClients";
import { useHotel } from "@/context/HotelContext";
import { useState } from "react";

export default function page () {

    const { clients } = useHotel();
    const [ view, setView ] = useState({
        view: '',
        data: null
    })

    const handleClose = () => setView({ view: '', data: null })
    const handleEdit = (data) => setView({view: 'edit', data})

    return (
        <>
            <div className="w-full mb-md flex items-center justify-between">
                <div>
                    <h1 className="text-4xl">Gestión de Clientes</h1>
                    <p>Visualiza y gestiona la base de datos de tus huéspedes y sus preferencias.</p>
                </div>
                <button className="btn btn-primary btn-md" onClick={() => setView(prev => ({ ...prev, view: 'new' }))}>Nuevo cliente</button>
            </div>
            <div className="w-full flex gap-md">
                <div className="w-full bg-white rounded-md border-surface">
                    <div className="w-full grid grid-5 bg-surface h" style={{"--h": "60px"}}>
                        <div className="w-full h-full flex items-center justify-center text-sm">
                            <span>Huéspedes</span>
                        </div>
                        <div className="w-full h-full flex items-center justify-center text-sm">
                            <span>DNI / PASAPORTE</span>
                        </div>
                        <div className="w-full h-full flex items-center justify-center text-sm">
                            <span>CONTACTO</span>
                        </div>
                        <div className="w-full h-full flex items-center justify-center text-sm">
                            <span>EMAIL</span>
                        </div>
                        <div className="w-full h-full flex items-center justify-center text-sm">
                            <span>MAS</span>
                        </div>
                    </div>
                    <div className="w-full flex flex-col">
                        {clients.length > 0 ? (
                            clients.map((client) => (
                                <RowClients key={client.id} row={client} onEdit={handleEdit} />
                            ))
                        ) : (
                            <div className="w-full h center" style={{"--h": "60px"}}>
                                <span className="text-xs">No hay datos de clientes aún.</span>
                            </div>
                        )}
                    </div>
                </div>
                {view.view && (
                    <div className="w p-md bg-white rounded-md border-surface" style={{"--w": "450px", "--mnw": "450px"}}>
                        {view.view === 'new' && ( <FormNewClient onClose={handleClose} /> )}
                        {view.view === 'edit' && ( <FormEditClient client={view.data} onClose={handleClose} /> )}
                    </div>
                )}
            </div>
        </>
    )
}