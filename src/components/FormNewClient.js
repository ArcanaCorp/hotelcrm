import { useHotel } from "@/context/HotelContext";
import { verifyDocument } from "@/helpers/dni";
import { createClient } from "@/services/clients.service";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";

export default function FormNewClient ({ onClose }) {

    const { profile, addClient } = useHotel();

    const [ form, setForm ] = useState({
        type: '',
        document: '',
        name: '',
        lastname: '',
        phone: '',
        email: '',
        birthday: '',
        region: '',
        province: '',
        district: '',
        address: '',
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

    const handleVerifyDocument = async () => {
        if (!form.document) return toast.warning('Alerta', { description: 'Completa el campo de DNI o CEE antes de continuar.' })
        try {
            const data = await verifyDocument(form.document, form.type);
            if (data.status === 400) throw new Error(data.error);
                console.log(data);
                setForm(prev => ({
                    ...prev,
                    type: form.type,
                    document: data.data.numero,
                    name: data.data.nombres,
                    lastname: `${data.data.apellido_paterno} ${data.data.apellido_materno}`,
                    region: data.data.departamento || "",
                    province: data.data.provincia || "",
                    district: data.data.distrito || "",
                    address: data.data.direccion_completa || "",
                }))
                toast.success('Éxito', { description: 'Cliente encontrado' });
        } catch (error) {
            console.error(error);
            toast.error('Error', { description: error.message })
        }
    }

    const handleSubmit = async () => {
        if (!form.type || !form.document || !form.name || !form.lastname) return;
        try {
            setLoading(true);
            const data = await createClient(profile?.hotels.id, form);
            addClient(data);
            toast.success('Se añadio un nuevo cliente.')
        } catch (error) {
            console.error(error);
            toast.error('Error', { description: error.message })
        } finally {
            setLoading(false);
        }
    } 

    return (
        <>
            <div className="w-full flex items-center justify-between">
                <h3>Nuevo cliente</h3>
                <button className="w h center bg-surface rounded-full" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}} onClick={onClose}><IconX/></button>
            </div>
            <div className="w-full flex flex-col gap-md">
                <div className="w-full flex gap-md">
                    <div className="w-full">
                        <label className="block mb-md text-xs text-on-surface" htmlFor="type">Tipo de documento</label>
                        <select className="input rounded-md" name="type" id="type" onChange={handleChange}>
                            <option value={''}>Tipo de documento</option>
                            <option value={'DNI'}>DNI</option>
                            <option value={'CEE'}>Carten de extranjeria</option>
                        </select>
                    </div>
                    <div className="w-full">
                        <label className="block mb-md text-xs text-on-surface" htmlFor="document">Número de documento</label>
                        <div className="relative w-full">
                            <input type="text" className="input rounded-md" name="document" id="document" placeholder="Número de documento" onChange={handleChange}/>
                            {form.document.length >= 8 && (
                                <button className="absolute w h center" style={{right: '0', top: '0', "--w": "50px", "--mnw": "50px", "--h": "50px"}} onClick={handleVerifyDocument}><IconCheck/></button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-full flex gap-sm">
                    <div className="w-full">
                        <label className="block mb-md text-xs text-on-surface" htmlFor="name">Nombre</label>
                        <input type="text" className="input rounded-md" name="name" id="name" placeholder={form.name || 'Nombres completos'} disabled/>
                    </div>
                    <div className="w-full">
                        <label className="block mb-md text-xs text-on-surface" htmlFor="lastname">Apellidos</label>
                        <input type="text" className="input rounded-md" name="lastname" id="lastname" placeholder={form.lastname || 'Apellidos completos'} disabled/>
                    </div>
                </div>
                <div className="w-full flex gap-sm">
                    <div className="w-full">
                        <label className="block mb-md text-xs text-on-surface" htmlFor="phone">Número</label>
                        <input type="text" className="input rounded-md" name="phone" id="phone" placeholder="Ejm: 51995984231" onChange={handleChange}/>
                    </div>
                    <div className="w-full">
                        <label className="block mb-md text-xs text-on-surface" htmlFor="email">Email</label>
                        <input type="email" className="input rounded-md" name="email" id="email" placeholder="admin@gmail.com" onChange={handleChange}/>
                    </div>
                </div>
                <div className="w-full flex gap-sm">
                    <div className="w-full">
                        <label className="block mb-md text-xs text-on-surface" htmlFor="gender">Género</label>
                        <select className="input rounded-md" name="gender" id="gender" onChange={handleChange}>
                            <option value={''}>Selecciona el género</option>
                            <option value={'M'}>Masculino</option>
                            <option value={'F'}>Femenino</option>
                        </select>
                    </div>
                    <div className="w-full">
                        <label className="block mb-md text-xs text-on-surface" htmlFor="birthday">Cumpleaños</label>
                        <input type="date" className="input rounded-md" name="birthday" id="birthday" onChange={handleChange}/>
                    </div>
                </div>
                <div className="w-full">
                    <button className="btn btn-primary btn-block btn-md rounded-md" onClick={handleSubmit}>{loading ? 'Creando...' : 'Crear cliente'}</button>
                </div>
            </div>
        </>
    )
}