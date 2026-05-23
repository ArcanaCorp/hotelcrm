import { db } from "@/lib/supabase/hotel";

export const getRoomsByHotel = async (hotelId) => {

    try {

        const { data, error } = await db
            .from('rooms')
            .select(`
                *,

                room_images (
                    id,
                    url,
                    is_cover
                ),

                room_feature_assignments (
                    feature_id,

                    room_features (
                        id,
                        name,
                        slug,
                        category
                    )
                )

            `)
            .eq('hotel_id', hotelId)
            .eq('is_delete', false)
            .order('created_at', {
                ascending: false
            });

        if (error) {
            throw error;
        }

        /*
        =========================================
        FORMAT DATA
        =========================================
        */

        const formattedRooms = data.map(room => ({

            ...room,

            cover:
                room.room_images.find(
                    image => image.is_cover
                ) || null,

            features:
                room.room_feature_assignments.map(
                    item => item.room_features
                )

        }));

        return formattedRooms;

    } catch (error) {

        console.error(error);

        return [];

    }

}

export const createRoom = async ({hotelId, form }) => {

    try {

        const roomCode = `ROOM-${Date.now()}`;

        const { data: room, error: roomError } = await db
            .from('rooms')
            .insert({
                hotel_id: hotelId,
                code: roomCode,
                name: form.name,
                description: form.description,
                price: Number(form.price),
                capacity: Number(form.capacity),
                floor: Number(form.floor),
            })
            .select()
            .single();

        if (roomError) {
            throw roomError;
        }

        /*
        =========================================
        UPDATE HOTEL STATS
        =========================================
        */

        const { data: hotel, error: hotelError } = await db
            .from('hotels')
            .select('total_rooms, total_floors')
            .eq('id', hotelId)
            .single();

        if (hotelError) {
            throw hotelError;
        }

        const updatedRooms = (hotel.total_rooms || 0) + 1;

        const updatedFloors = Math.max(
            hotel.total_floors || 0,
            Number(form.floor)
        );

        const { error: updateHotelError } = await db
            .from('hotels')
            .update({
                total_rooms: updatedRooms,
                total_floors: updatedFloors
            })
            .eq('id', hotelId);

        if (updateHotelError) {
            throw updateHotelError;
        }

        /*
        =========================================
        UPLOAD IMAGES
        =========================================
        */

        if ( form.images && Array.isArray(form.images) && form.images.length > 0 ) {

            const uploadedImages = [];

            for (let index = 0; index < form.images.length; index++) {

                const file = form.images[index];

                const extension = file.name
                    .split('.')
                    .pop();

                const fileName = `${crypto.randomUUID()}_${Date.now()}.${extension}`;

                const filePath = `${hotelId}/rooms/${fileName}`;

                /*
                =========================================
                UPLOAD STORAGE
                =========================================
                */

                const { error: uploadError } = await db.storage
                    .from('profiles')
                    .upload(filePath, file, {
                        cacheControl: '3600',
                        upsert: false
                    });

                if (uploadError) {
                    throw uploadError;
                }

                /*
                =========================================
                GET PUBLIC URL
                =========================================
                */

                const { data: publicUrlData } = db.storage
                    .from('profiles')
                    .getPublicUrl(filePath);

                uploadedImages.push({
                    room_id: room.id,
                    url: publicUrlData.publicUrl,
                    is_cover: index === 0
                });

            }

            /*
            =========================================
            INSERT ROOM IMAGES
            =========================================
            */

            const { error: imagesError } = await db
                .from('room_images')
                .insert(uploadedImages);

            if (imagesError) {
                throw imagesError;
            }

        }

        /*
        =========================================
        INSERT FEATURES
        =========================================
        */

        if (form.features && Array.isArray(form.features) && form.features.length > 0) {

            const featuresToInsert = form.features.map(feature => ({
                room_id: room.id,
                feature_id: feature.id
            }));

            const { error: featureError } = await db
                .from('room_feature_assignments')
                .insert(featuresToInsert);

            if (featureError) {
                throw featureError;
            }

        }

        return room;

    } catch (error) {

        console.error(error);

        throw error;

    }

}

export const updateRoomService = async ({ hotelId, roomId, form }) => {

    try {

        const { data: room, error: roomError } = await db
            .from('rooms')
            .update({
                name: form.name,
                description: form.description,
                price: Number(form.price),
                capacity: Number(form.capacity),
                floor: Number(form.floor),
            })
            .eq('id', roomId)
            .eq('hotel_id', hotelId)
            .select(`
                *,
                room_images(*),
                room_feature_assignments(
                    *,
                    room_features(*)
                )
            `)
            .single();

        if (roomError) {
            throw roomError;
        }

        /*
        =========================================
        UPDATE HOTEL FLOORS
        =========================================
        */

        const { data: hotel, error: hotelError } = await db
            .from('hotels')
            .select('total_floors')
            .eq('id', hotelId)
            .single();

        if (hotelError) {
            throw hotelError;
        }

        const updatedFloors = Math.max(
            hotel.total_floors || 0,
            Number(form.floor)
        );

        const { error: updateHotelError } = await db
            .from('hotels')
            .update({
                total_floors: updatedFloors
            })
            .eq('id', hotelId);

        if (updateHotelError) {
            throw updateHotelError;
        }

        /*
        =========================================
        DISABLE OLD IMAGES
        =========================================
        */

        if (form.deletedImages && Array.isArray(form.deletedImages) && form.deletedImages.length > 0) {

            const deletedIds = form.deletedImages.map(
                image => image.id
            );

            const { error: deleteImagesError } = await db
                .from('room_images')
                .update({
                    is_delete: true
                })
                .in('id', deletedIds);

            if (deleteImagesError) {
                throw deleteImagesError;
            }

        }

        /*
        =========================================
        UPLOAD NEW IMAGES
        =========================================
        */

        if (form.newImages && Array.isArray(form.newImages) && form.newImages.length > 0) {

            const uploadedImages = [];

            for (let index = 0; index < form.newImages.length; index++) {

                const file = form.newImages[index];

                const extension = file.name
                    .split('.')
                    .pop();

                const fileName = `${crypto.randomUUID()}_${Date.now()}.${extension}`;

                const filePath = `${hotelId}/rooms/${fileName}`;

                /*
                =========================================
                UPLOAD STORAGE
                =========================================
                */

                const { error: uploadError } = await db.storage
                    .from('profiles')
                    .upload(filePath, file, {
                        cacheControl: '3600',
                        upsert: false
                    });

                if (uploadError) {
                    throw uploadError;
                }

                /*
                =========================================
                GET PUBLIC URL
                =========================================
                */

                const { data: publicUrlData } = db.storage
                    .from('profiles')
                    .getPublicUrl(filePath);

                uploadedImages.push({
                    room_id: room.id,
                    url: publicUrlData.publicUrl,
                    is_cover: false
                });

            }

            /*
            =========================================
            INSERT NEW IMAGES
            =========================================
            */

            const { error: imagesError } = await db
                .from('room_images')
                .insert(uploadedImages);

            if (imagesError) {
                throw imagesError;
            }

        }

        /*
        =========================================
        RESET FEATURES
        =========================================
        */

        const { error: deleteFeaturesError } = await db
            .from('room_feature_assignments')
            .delete()
            .eq('room_id', roomId);

        if (deleteFeaturesError) {
            throw deleteFeaturesError;
        }

        /*
        =========================================
        INSERT NEW FEATURES
        =========================================
        */

        if (
            form.features &&
            Array.isArray(form.features) &&
            form.features.length > 0
        ) {

            const featuresToInsert = form.features.map(feature => ({
                room_id: roomId,
                feature_id: feature.id
            }));

            const { error: featureError } = await db
                .from('room_feature_assignments')
                .insert(featuresToInsert);

            if (featureError) {
                throw featureError;
            }

        }

        /*
        =========================================
        RETURN UPDATED ROOM
        =========================================
        */

        const { data: updatedRoom, error: updatedRoomError } = await db
            .from('rooms')
            .select(`
                *,
                room_images(*),
                room_feature_assignments(
                    *,
                    room_features(*)
                )
            `)
            .eq('id', roomId)
            .single();

        if (updatedRoomError) {
            throw updatedRoomError;
        }

        return updatedRoom;

    } catch (error) {

        console.error(error);

        throw error;

    }

}

export const deleteRoom = async ({ hotelId, roomId }) => {
    try {
        const { data: hotel, error: hotelError } = await db
            .from('hotels')
            .select('total_rooms')
            .eq('id', hotelId)
            .single();

        if (hotelError) {
            throw hotelError;
        }

        const { error: updateErrorRooms } = await db
            .from('rooms')
            .update({
                is_delete: true
            })
            .eq('id', roomId)
            .eq('hotel_id', hotelId);

        if (updateErrorRooms) {
            throw updateErrorRooms;
        }

        const updatedRooms = Math.max(
            (hotel.total_rooms || 1) - 1,
            0
        );

        const { error: updateErrorHotel } = await db
            .from('hotels')
            .update({
                total_rooms: updatedRooms
            })
            .eq('id', hotelId);

        if (updateErrorHotel) {
            throw updateErrorHotel;
        }

        return true;

    } catch (error) {
        console.error(error);
        throw error;
    }

}

export const updateStatusRoom = async ({ hotelId, roomId }) => {
    try {
        const { error: updateErrorStatus } = await db
            .from('rooms')
            .update({
                status: 'available'
            })
            .eq('id', roomId)
            .eq('hotel_id', hotelId)
        
        if (updateErrorStatus) {
            throw updateErrorStatus
        }
        
        const { data, error } = await db
            .from('rooms')
            .select(`
                *,

                room_images (
                    id,
                    url,
                    is_cover
                ),

                room_feature_assignments (
                    feature_id,

                    room_features (
                        id,
                        name,
                        slug,
                        category
                    )
                )
            `)
            .eq('id', roomId)
            .eq('hotel_id', hotelId)
            .single();

        if (error) {
            throw error;
        }

        /*
        =========================================
        FORMAT DATA
        =========================================
        */

        const formattedRoom = {

            ...data,

            cover:
                data.room_images.find(
                    image => image.is_cover
                ) || null,

            features:
                data.room_feature_assignments.map(
                    item => item.room_features
                )

        };

        return formattedRoom;

    } catch (error) {
        console.error(error);
        throw error;
    }
}