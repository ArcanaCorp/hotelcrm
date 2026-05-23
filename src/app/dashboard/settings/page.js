'use client';

import { useHotel } from "@/context/HotelContext";
import { updateHotel } from "@/services/hotel.service";
import { IconHeadset, IconInfoCircle, IconLock, IconPhoto } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function page () {

    const { profile } = useHotel();

    const [ form, setForm ] = useState({
        name: '',
        business: '',
        ruc: '',
        phone: '',
        email: '',
        location: '',
        logo: null
    })
    const [ prevImage, setPrevImage ] = useState('')
    const [ loading, setLoading ] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImageChange = (e) => {

        const file = e.target.files?.[0];

        if (!file) return;

        const allowedTypes = [
            "image/png",
            "image/jpeg",
            "image/webp"
        ];

        if (!allowedTypes.includes(file.type)) return toast.warning('Alerta', { description: 'Solo se permiten imágenes PNG, JPG o WEBP' });

        // Guardar archivo
        setForm(prev => ({
            ...prev,
            logo: file
        }));

        // Preview
        const imageUrl = URL.createObjectURL(file);

        setPrevImage(imageUrl);
    }

    const handleUpdate = async () => {
        const noChanges =
            form.name === profile.hotels.name &&
            form.business === profile.hotels.business &&
            form.ruc === profile.hotels.ruc &&
            form.phone === profile.hotels.phone &&
            form.email === profile.hotels.email &&
            form.location === profile.hotels.address &&
            form.logo === profile.hotels.logo;

        if (noChanges) {
            return toast.warning('No hay cambios para actualizar.');
        }
        
        try {
            setLoading(true);
            const data = await updateHotel({hotelId: profile.hotels.id, form})
            console.log(data);
            toast.success('Éxito', { description: 'Se actualizó los datos correctamente.' })
        } catch (error) {
            console.error(error);
            toast.error('Error', { description: error.message })
        } finally {
            setLoading(false)
        }
    }

    const handleNavigate = (destination) => {
        const msg = `Hola *ARCANA*\n\nTengo un error con el *HOTEL CRM* pueden ayudarme a solucionarlo.`
        const urls = {
            'help': `https://wa.me/51966327426/?text=${encodeURI(msg)}`,
            'terms': `https://hotel.andaleya.pe/terms/?utm_source=hotel_crm`,
            'privacy': `https://hotel.andaleya.pe/terms/#privacy?utm_source=hotel_crm`,
        }
        window.open(urls[destination])
    }

    useEffect(() => {
        if (profile) {
            setForm({
                name: profile?.hotels?.name || '',
                business: profile?.hotels?.business || '',
                ruc: profile?.hotels?.ruc || '',
                phone: profile?.hotels?.phone || '',
                email: profile?.hotels?.email || '',
                location: profile?.hotels?.address || '',
                logo: profile?.hotels?.logo || null
            })
        }
    }, [profile])

    return (

        <>
        
            <div className="w-full mb-md flex items-center justify-between">
                <div>
                    <h1 className="text-4xl">Configuración del sistema</h1>
                    <p>Administra la identidad de tu hotel, gestiona y configuraciones avanzadas.</p>
                </div>
            </div>

            <div className="w-full flex gap-md">
                <div className="w-full flex gap-md bg-white rounded-md py-3xl px-xl">
                    <div className="w text-center" style={{"--w": "500px"}}>
                        <label className="w h m-auto center rounded-md border-surface bg-surface pointer" style={{"--w": "212px", "--h": "212px"}} htmlFor="photoHotel">
                            {prevImage || form.logo ? <img src={prevImage || form.logo} className="w-full h-full" /> : <IconPhoto/>}
                        </label>
                        <input type="file" id="photoHotel" name="photoHotel" accept=".png,.jpg,.jpeg,.webp" hidden onChange={handleImageChange} />
                        <p className="text-sm font-medium mt-md">Logotipo del hotel</p>
                        <span className="text-xs text-gray">Recomendado 512x512 en formato png, webp o jpg.</span>
                    </div>
                    <div className="w-full flex flex-col gap-md">
                        <div className="w-full flex gap-md">
                            <div className="w-full">
                                <label className="block text-sm mb-md" htmlFor="name">Nombre Comercial</label>
                                <input type="text" id="name" name="name" className="input rounded-md" value={form.name} placeholder="Nombre Comercial" onChange={handleChange}/>
                            </div>
                            <div className="w-full">
                                <label className="block text-sm mb-md" htmlFor="business">Razón Social</label>
                                <input type="text" id="business" name="business" className="input rounded-md" value={form.business} placeholder="Razón Social" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="w-full">
                            <label className="block text-sm mb-md" htmlFor="ruc">RUC</label>
                            <input type="text" id="ruc" name="ruc" className="input rounded-md" value={form.ruc} placeholder="RUC" onChange={handleChange} />
                        </div>
                        <div className="w-full flex gap-md">
                            <div className="w-full">
                                <label className="block text-sm mb-md" htmlFor="phone">Número telefónico</label>
                                <input type="text" id="phone" name="phone" className="input rounded-md" value={form.phone} placeholder="Número telefónico" onChange={handleChange} />
                            </div>
                            <div className="w-full">
                                <label className="block text-sm mb-md" htmlFor="email">Correo Electrónico</label>
                                <input type="text" id="email" name="email" className="input rounded-md" value={form.email} placeholder="Correo Electrónico" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="w-full">
                            <label className="block text-sm mb-md" htmlFor="location">Dirección</label>
                            <input type="text" id="location" name="location" className="input rounded-md" value={form.location} placeholder="Ingresa tu dirección" onChange={handleChange} />
                        </div>
                        <div className="w-full">
                            <button className="btn btn-primary btn-block btn-md" disabled={loading} onClick={handleUpdate}>{loading ? 'Actualizando...' : 'Actualizar datos'}</button>
                        </div>
                    </div>
                </div>
                <div className="w bg-white p-md" style={{"--w": "300px", "--mnw": "300px"}}>
                    <ul className="w-full flex flex-col gap-sm">
                        <li className="w-full h bg-surface rounded-md flex items-center gap-sm px-md text-sm pointer" style={{"--h": "50px"}} onClick={() => handleNavigate('help')}><IconHeadset/> Soporte técnico</li>
                        <li className="w-full h bg-surface rounded-md flex items-center gap-sm px-md text-sm pointer" style={{"--h": "50px"}} onClick={() => handleNavigate('terms')}><IconInfoCircle/> Términos y condiciones</li>
                        <li className="w-full h bg-surface rounded-md flex items-center gap-sm px-md text-sm pointer" style={{"--h": "50px"}} onClick={() => handleNavigate('privacy')}><IconLock/> Política de privacidad</li>
                    </ul>
                </div>
            </div>

        </>

    )
}