import { db } from "@/lib/supabase/hotel";
import { createClient } from "@/services/clients.service";

export const verifyDocument = async (hotelId, numero, tipo) => {
    if (!numero || !tipo) return;
    try {
        const { data: existingClient } = await db
            .from('clients')
            .select('*')
            .or(`dni.eq.${numero}, passport.eq.${numero}`)
            .maybeSingle();
        
        if (existingClient) {
            const data = {
                id: existingClient.id,
                numero: numero,
                name: existingClient.name,
                lastname: existingClient.lastname,
            }
            return {success: true, data }
        }

        const response = await fetch(`/api/document?tipo=${tipo}&numero=${numero}`);
        const data = await response.json();

        if (!data.success) return data;

        const form = {
            type: tipo,
            document: numero,
            name: data.data.nombres,
            lastname: `${data.data.apellido_paterno} ${data.data.apellido_materno}`,
            phone: null,
            email: null,
            birthday: null,
            address: data.data.direccion_completa || '',
            region: data.data.departamento || '',
            district: data.data.distrito || '',
            province: data.data.provincia || '',
            gender: null
        }

        const save = await createClient(hotelId, form)
        
        if (!save) return { success: false, message: "Error guardando cliente"};

        return {
            success: true,
            data: {
                id: save.id,
                numero: numero,
                name: save.name,
                lastname: save.lastname
            }
        }

    } catch (error) {
        console.error(error);
        return { success: false, error: error, message: error.message }
    }
}