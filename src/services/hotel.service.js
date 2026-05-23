import { db } from "@/lib/supabase/hotel";

export const getHotelAll = async () => {
    try {
        const { data, error } = await db
            .from('users')
            .select(`
                *,
                hotels (
                    *
                )
            `);
        if (error) throw error;
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const updateHotel = async ({ hotelId, form }) => {

    try {

        let logoUrl = form.logo;

        /*
        ============================
        SUBIR LOGO SI ES FILE
        ============================
        */

        if (form.logo instanceof File) {

            const extension = form.logo.name.split('.').pop();

            const fileName = `${crypto.randomUUID()}_${Date.now()}.${extension}`;

            const filePath = `${hotelId}/logo/${fileName}`;

            /*
            ============================
            UPLOAD
            ============================
            */

            const { error: uploadError } = await db.storage
                .from('profiles')
                .upload(filePath, form.logo, {
                    cacheControl: '3600',
                    upsert: true
                });

            if (uploadError) {
                throw uploadError;
            }

            /*
            ============================
            GET PUBLIC URL
            ============================
            */

            const { data: publicUrlData } = db.storage
                .from('profiles')
                .getPublicUrl(filePath);

            logoUrl = publicUrlData.publicUrl;
        }

        /*
        ============================
        UPDATE HOTEL
        ============================
        */

        const { data, error } = await db
            .from('hotels')
            .update({
                name: form.name,
                business: form.business,
                ruc: form.ruc,
                phone: form.phone,
                email: form.email,
                address: form.location,
                logo: logoUrl
            })
            .eq('id', hotelId)
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