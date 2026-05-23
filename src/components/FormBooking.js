'use client';
import { methodPay } from "@/config";
import { useAuth } from "@/context/AuthContext";
import { useHotel } from "@/context/HotelContext";
import { verifyDocument } from "@/helpers/dni";
import { createReservation } from "@/services/reservation.service";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";

export default function FormBooking ({ onClose }) {

    const { user } = useAuth();
    const { profile, rooms, addBook } = useHotel();
    const [ form, setForm ] = useState({
        typeDoc: '',
        nDocumento: '',
        clientId: '',
        name: '',
        lastname: '',
        room: '',
        guest: 0,
        childrens: 0,
        checkin: '',
        checkout: '',
        pay: '',
        payStatus: '',
        payPartial: '',
        msg: ''
    });
    const [ loading, setLoading ] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleVerifyDocument = async () => {
        if (!form.nDocumento) return toast.warning('Alerta', { description: 'Completa el campo de DNI o CEE antes de continuar.' })
        try {
            const data = await verifyDocument(profile?.hotels?.id, form.nDocumento, form.typeDoc);
            if (!data.success) throw new Error(data.error);
                setForm(prev => ({
                    ...prev,
                    clientId: data.data.id,
                    name: data.data.name,
                    lastname: data.data.lastname
                }))
                toast.success('Éxito', { description: 'Cliente encontrado' });
        } catch (error) {
            console.error(error);
            toast.error('Error', { description: error.message })
        }
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const data = await createReservation({hotelId: profile?.hotels?.id, userId: user?.id, form, rooms});
            addBook(data);
            toast.success('Reservado con éxito')
            onClose()
        } catch (error) {
            console.error(error);
            toast.error('Error', { description: error.message })
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="w-full flex items-center justify-between">
                <h3>Nueva Reserva</h3>
                <button className="w h center bg-surface rounded-full" style={{"--w": "40px", "--h": "40px"}} onClick={onClose}><IconX/></button>
            </div>
            <div className="w-full flex flex-col gap-md">
                <div className="w-full flex gap-md">
                    <div className="w-full">
                        <label className="block mb-md text-xs text-on-surface" htmlFor="typeDoc">Tipo de documento</label>
                        <div className="w-full relative">
                            <select className="input rounded-md" name="typeDoc" id="typeDoc" onChange={handleChange}>
                                <option value={''}>Tipo de documento</option>
                                <option value={'CEE'}>Carnet de extranjeria</option>
                                <option value={'DNI'}>DNI</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full">
                        <label className="block mb-md text-xs text-on-surface" htmlFor="nDocumento">{form.typeDoc === 'DNI' ? 'DNI' : 'CEE'} del cliente</label>
                        <div className="w-full relative">
                            <input type="text" className="input rounded-md" name="nDocumento" id="nDocumento" minLength={8} inputMode="numeric" placeholder={`${form.typeDoc === 'DNI' ? 'DNI' : 'CEE'} del cliente`} onChange={handleChange} />
                            {form.nDocumento.length >= 8 && (
                                <button className="absolute w h center" style={{right: '0', top: '0', "--w": "50px", "--h": "50px"}} onClick={handleVerifyDocument}><IconCheck/></button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-full flex items-center gap-md">
                    <div className="w-full">
                        <label className="block mb-md text-xs text-on-surface" htmlFor="name">Nombres</label>
                        <input type="text" className="input rounded-md" name="name" id="name" value={form?.name || ''} placeholder="Ingresa nombres" disabled />
                    </div>
                    <div className="w-full">
                        <label className="block mb-md text-xs text-on-surface" htmlFor="lastname">Apellidos</label>
                        <input type="text" className="input rounded-md" name="lastname" id="lastname" value={form.lastname || ''} placeholder="Ingresa apellidos" disabled />
                    </div>
                </div>
                <div className="w-full">
                    <label className="block mb-md text-xs text-on-surface" htmlFor="room">Habitación</label>
                    <select name="room" id="room" className="input rounded-md" onChange={handleChange}>
                        <option value={''}>Selecciona la habitación</option>
                        {rooms
                        .filter(item => item.status === 'available') 
                        .map((room) => (
                            <option key={room.id} value={room.id}>{room.name}</option>
                        ))}
                    </select>
                </div>
                <div className="w-full flex items-center gap-md">
                    <div className="w-full">
                        <label className="block mb-md text-xs text-on-surface" htmlFor="guest">Número de adultos</label>
                        <input type="text" className="input rounded-md" name="guest" id="guest" placeholder="5" onChange={handleChange} />
                    </div>
                    <div className="w-full">
                        <label className="block mb-md text-xs text-on-surface" htmlFor="childrens">Número de niños</label>
                        <input type="text" className="input rounded-md" name="childrens" id="childrens" placeholder="2" onChange={handleChange} />
                    </div>
                </div>
                <div className="w-full flex items-center gap-md">
                    <div className="w-full">
                        <label className="block mb-md text-xs text-on-surface" htmlFor="checkin">Check In</label>
                        <input type="date" className="input rounded-md" name="checkin" id="checkin" placeholder="Check In" onChange={handleChange} />
                    </div>
                    <div className="w-full">
                        <label className="block mb-md text-xs text-on-surface" htmlFor="checkout">Check Out</label>
                        <input type="date" className="input rounded-md" name="checkout" id="checkout" placeholder="DNI del cliente" onChange={handleChange} />
                    </div>
                </div>
                <div className="w-full">
                    <label className="block mb-md text-xs text-on-surface" htmlFor="pay">Método de pago</label>
                    <select name="pay" id="pay" className="input rounded-md" value={form.pay} onChange={handleChange}>
                        <option value={''}>Método de pago</option>
                        {methodPay.map((pay, i) => (
                            <option key={i} value={pay}>{pay}</option>
                        ))}
                    </select>
                </div>
                <div className="w-full flex items-center gap-md">
                    <div className="w-full">
                        <label className="block mb-md text-xs text-on-surface" htmlFor="payStatus">Pago recibido</label>
                        <select className="input rounded-md" id="payStatus" name="payStatus" value={form.payStatus} onChange={handleChange}>
                            <option value={''}>Selecciona estado de pago</option>
                            <option value={'paid'}>Pago Total</option>
                            <option value={'partial'}>Pago Partes</option>
                            <option value={'pending'}>Pago Pendiente</option>
                        </select>
                    </div>
                    {form.payStatus === 'partial' && (
                        <div className="w-full">
                            <label className="block mb-md text-xs text-on-surface" htmlFor="paypartial">Saldo restante</label>
                            <input type="number" className="input rounded-md" name="paypartial" id="paypartial" placeholder="Saldo restante" onChange={handleChange} />
                        </div>
                    )}
                </div>
                <div className="w-full">
                    <label className="block mb-md text-xs text-on-surface" htmlFor="msg">Notas / Requerimientos</label>
                    <textarea id="msg" name="msg" className="textarea rounded-md" placeholder="alergias, después del ingreso" onChange={handleChange} />
                </div>
                <div className="w-full">
                    <button className="btn btn-block btn-primary h" style={{"--h": "50px"}} onClick={handleSubmit} disabled={loading}>{loading ? 'Reservando...' : 'Reservar'}</button>
                </div>
            </div>
        </>
    )
}