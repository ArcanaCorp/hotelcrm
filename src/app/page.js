'use client';

import { createClientAuth } from "@/lib/supabase/client";
import { IconEye, IconEyeClosed, IconMail } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Page () {

    const supabase = createClientAuth();
    const router = useRouter();

    const [ form, setForm ] = useState({
        email: '',
        password: '',
        viewPwd: false,
        loading: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async () => {
        const { email, password } = form;
        if (!form.email || !form.password) return toast.warning('Alerta', { description: 'Completa los campos antes de continuar.' })
        
        try {
            setForm(prev => ({...prev, loading: true}));
            const { error } = await supabase.auth.signInWithPassword({email, password});
            if (error) throw new Error(error);
            router.push('/dashboard');
        } catch (error) {
            console.error(error);
            toast.error('Error', { description: error.message })
        } finally {
            setForm(prev => ({...prev, loading: false}));
        }
    }

    return (
        <div className="w-screen h-screen grid grid-2">
            <div className="w-full h-full">
                <div className="w m-auto flex flex-col gap-lg justify-center h-full" style={{"--w": "60%"}}>
                    <h1 className="text-4xl font-semibold">Gestiona tu hotel desde cualquier lugar</h1>
                    <p className="text-xs text-muted">Bienvenido al ecosistema de gestión premium para la hotelería andina.</p>
                    <div className="w-full flex flex-col gap-md bg-white p-md rounded-md shadow-md">
                        <div className="w-full">
                            <label htmlFor="email" className="block text-sm text-gray mb-md">Correo electrónico</label>
                            <div className="relative">
                                <input type="email" name="email" id="email" className="input rounded-md" inputMode="email" value={form.email} placeholder="admin@gmail.com" onChange={handleChange} autoComplete="off" disabled={form.loading} />
                                <span className="absolute w h center" style={{"--w": "50px", "--h": "50px", top: 0, right: 0}}><IconMail/></span>
                            </div>
                        </div>
                        <div className="w-full">
                            <label htmlFor="pass" className="block text-sm text-gray mb-md">Contraseña</label>
                            <div className="relative">
                                <input type={form.viewPwd ? 'text' : 'password'} name="password" id="pass" className="input rounded-md" value={form.password} placeholder="Ingresa tu contraseña" onChange={handleChange} autoComplete="off" disabled={form.loading} />
                                <span className="absolute w h center" style={{"--w": "50px", "--h": "50px", top: 0, right: 0}} onClick={() => setForm(prev => ({...prev, viewPwd: !form.viewPwd}))}>{form.viewPwd ? <IconEyeClosed/> : <IconEye/>}</span>
                            </div>
                        </div>
                        <div className="w-full">
                            <button className="btn btn-block btn-primary rounded-md btn-lg" onClick={handleSubmit} disabled={form.loading}>{form.loading ? 'Ingresando...' : 'Ingresar'}</button>
                        </div>
                        <div className="w-full">
                            <p className="text-center text-xs text-primary font-medium">POWERED BY ARCANA CORP</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-full">
                <img src="./bg.avif" alt="Bienvenido al HOTEL CRM - Ándale Ya! - ARCANA" />
            </div>
        </div>
    )
}