'use client';

import { useHotel } from "@/context/HotelContext";
import { updateClientService } from "@/services/clients.service";
import { IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function FormEditClient ({ client, onClose }) {
    
    const { profile, updateClient } = useHotel();

    const [originalForm, setOriginalForm] = useState(null);
    const [ form, setForm ] = useState({
        type: '',
        document: '',
        name: '',
        lastname: '',
        phone: '',
        email: '',
        birthday: '',
        gender: ''
    })

    const [ loading, setLoading ] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async () => {

        try {

            setLoading(true);

            const changedFields = {};

            Object.keys(form).forEach((key) => {

                const disabledFields = [
                    'type',
                    'document',
                    'name',
                    'lastname'
                ];

                if (disabledFields.includes(key)) return;

                if (form[key] !== originalForm[key]) {
                    changedFields[key] = form[key];
                }

            });

            if (Object.keys(changedFields).length === 0) return toast.warning('Sin cambios', {description: 'No realizaste ninguna modificación.'});

            const data = await updateClientService({ hotelId: profile?.hotels.id, clientId: client.id, form: changedFields});
            updateClient(data);
            toast.success('Cliente actualizado');
            onClose();

        } catch (error) {
            console.error(error);
            toast.error('Error', {description: error.message});
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (client) {
            const initialData = {
                type: client.dni ? 'DNI' : 'CEE',
                document: client.dni ? client.dni : client.passport,
                name: client.name || '',
                lastname: client.lastname || '',
                phone: client.phone || '',
                email: client.email || '',
                birthday: client.birthdate || '',
                gender: client.gender || ''
            };
            setForm(initialData);
            setOriginalForm(initialData);
        }
    }, [client]);

    return (
        <>
            <div className="w-full flex items-center justify-between">
                <h3>Editar cliente</h3>
                <button className="w h center bg-surface rounded-full" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}} onClick={onClose}><IconX/></button>
            </div>
            
            <div className="w-full flex flex-col gap-md">
                <div className="w-full flex gap-md">
                    <div className="w-full">
                        <label className="block mb-md text-xs text-on-surface" htmlFor="type">Tipo de documento</label>
                        <select className="input rounded-md" name="type" id="type" value={form.type} disabled>
                            <option value={''}>Tipo de documento</option>
                            <option value={'DNI'}>DNI</option>
                            <option value={'CEE'}>Carten de extranjeria</option>
                        </select>
                    </div>
                    <div className="w-full">
                        <label className="block mb-md text-xs text-on-surface" htmlFor="document">Número de documento</label>
                        <div className="relative w-full">
                            <input type="text" className="input rounded-md" name="document" id="document" value={form.document} placeholder="Número de documento" disabled/>
                        </div>
                    </div>
                </div>
                <div className="w-full flex gap-sm">
                    <div className="w-full">
                        <label className="block mb-md text-xs text-on-surface" htmlFor="name">Nombre</label>
                        <input type="text" className="input rounded-md" name="name" id="name" value={form.name} placeholder={'Nombres completos'} disabled/>
                    </div>
                    <div className="w-full">
                        <label className="block mb-md text-xs text-on-surface" htmlFor="lastname">Apellidos</label>
                        <input type="text" className="input rounded-md" name="lastname" id="lastname" value={form.lastname} placeholder={'Apellidos completos'} disabled/>
                    </div>
                </div>
                <div className="w-full flex gap-sm">
                    <div className="w-full">
                        <label className="block mb-md text-xs text-on-surface" htmlFor="phone">Número</label>
                        <input type="text" className="input rounded-md" name="phone" id="phone" value={form.phone} placeholder="Ejm: 51995984231" onChange={handleChange}/>
                    </div>
                    <div className="w-full">
                        <label className="block mb-md text-xs text-on-surface" htmlFor="email">Email</label>
                        <input type="email" className="input rounded-md" name="email" id="email" value={form.email} placeholder="admin@gmail.com" onChange={handleChange}/>
                    </div>
                </div>
                <div className="w-full flex gap-sm">
                    <div className="w-full">
                        <label className="block mb-md text-xs text-on-surface" htmlFor="gender">Género</label>
                        <select className="input rounded-md" name="gender" id="gender" value={form.gender} onChange={handleChange}>
                            <option value={''}>Selecciona el género</option>
                            <option value={'M'}>Masculino</option>
                            <option value={'F'}>Femenino</option>
                        </select>
                    </div>
                    <div className="w-full">
                        <label className="block mb-md text-xs text-on-surface" htmlFor="birthday">Cumpleaños</label>
                        <input type="date" className="input rounded-md" name="birthday" id="birthday" value={form.birthday} onChange={handleChange}/>
                    </div>
                </div>
                <div className="w-full">
                    <button className="btn btn-primary btn-block btn-md rounded-md" onClick={handleSubmit}>{loading ? 'Actualizando...' : 'Actualizar cliente'}</button>
                </div>
            </div>
        </>
    )

}