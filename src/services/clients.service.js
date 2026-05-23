import { db } from "@/lib/supabase/hotel";

export const getClientsAll = async (id) => {
    try {
        const { data, error } = await db
            .from('clients')
            .select('*')
            .eq('hotel_id', id)
            .eq('is_delete', false)
        if (error) throw error;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const createClient = async (hotelId, form) => {
    
    try {

        const { data: newClient, error: clientError } = await db
            .from('clients')
            .insert({
                hotel_id: hotelId,
                dni: form.type === 'DNI' ? form.document : null,
                passport: form.type === 'CEE' ? form.document : null,
                name: form.name,
                lastname: form.lastName || form.lastname,
                phone: form.phone || null,
                email: form.email || null,
                birthdate: form.birthday || null,
                country: form.type === 'DNI' ? 'PERU' : 'EXTRANJERIA',
                address: form.address,
                region: form.region,
                district: form.district,
                province: form.province,
                gender: form.gender || null,
            })
            .select()
            .single();

        if (clientError) {
            throw clientError;
        }

        return newClient;

    } catch (error) {
        console.error(error);
        return null;
    }

}

export const updateClientService = async ({ hotelId, clientId, form }) => {

    try {

        const { data, error } = await db
            .from('clients')
            .update(form)
            .eq('id', clientId)
            .eq('hotel_id', hotelId)
            .select()
            .single();

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {

        console.error(error);

        throw error;

    }

}

export const deleteClient = async ({ hotelId, clientId }) => {
    try {

        const { error: updateErrorRooms } = await db
            .from('clients')
            .update({
                is_delete: true
            })
            .eq('id', clientId)
            .eq('hotel_id', hotelId);

        if (updateErrorRooms) {
            throw updateErrorRooms;
        }

        return true;

    } catch (error) {
        console.error(error);
        throw error;
    }

}