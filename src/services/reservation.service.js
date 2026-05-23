import { db } from "@/lib/supabase/hotel";

export const getReservationsByHotel = async (hotelId) => {

    try {

        const { data, error } = await db
            .from('reservations')
            .select(`
                *,
                
                clients (
                    id,
                    dni,
                    passport,
                    name,
                    lastname,
                    phone,
                    email
                ),

                rooms (
                    id,
                    name,
                    code,
                    price,
                    status
                ),

                payments (
                    id,
                    amount,
                    method,
                    operation_code,
                    status,
                    created_at
                ),

                users (
                    id,
                    name,
                    lastname
                )
            `)
            .eq('hotel_id', hotelId)
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

        const formattedReservations = data.map(
            reservation => {

                const totalPaid =
                    reservation.payments.reduce(
                        (acc, payment) => {
                            return acc + Number(payment.amount);
                        },
                        0
                    );

                const pending =
                    Number(reservation.total) - totalPaid;

                return {

                    ...reservation,

                    totalPaid,

                    pending,

                    fullClientName:
                        `${reservation.clients?.name || ''} ${reservation.clients?.lastname || ''}`,

                    roomName:
                        reservation.rooms?.name || '-',

                    createdBy:
                        reservation.users
                            ? `${reservation.users.name} ${reservation.users.lastname || ''}`
                            : '-'

                };

            }
        );

        return formattedReservations;

    } catch (error) {

        console.error(error);

        return [];

    }

}

export const createReservation = async ({hotelId,userId,form,rooms}) => {

    try {

        const roomSelected = rooms.find(room => room.id === form.room);

        if (!roomSelected) {
            throw new Error('Habitación no encontrada');
        }

        const checkIn = new Date(form.checkin);

        const checkOut = new Date(form.checkout);

        const diffMs = checkOut - checkIn;

        const nights = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

        if (nights <= 0) {
            throw new Error('La fecha de salida debe ser mayor');
        }

        const total = (Number(roomSelected.price) * nights);

        let paymentStatus = 'pending';
        let paymentAmount = 0;


        if (form.payStatus === 'paid') {

            paymentStatus = 'paid';

            paymentAmount = total;

        }

        if (form.payStatus === 'partial') {

            paymentStatus = 'partial';

            const partialPending = Number(
                form.payPartial || 0
            );

            paymentAmount = total - partialPending;

            if (paymentAmount <= 0) {

                throw new Error(
                    'El saldo restante es inválido'
                );

            }

        }

        if (form.payStatus === 'pending') {
            paymentStatus = 'pending';
            paymentAmount = 0;
        }

        const code = `RSV-${Date.now()}`;

        const { data: reservation, error: reservationError } = await db
            .from('reservations')
            .insert({
                hotel_id: hotelId,
                client_id: form.clientId,
                room_id: roomSelected.id,
                code,
                total,
                guests: Number(form.guest),
                children: Number(form.childrens),
                check_in: form.checkin,
                check_out: form.checkout,
                payment_method: form.pay,
                payment_status: paymentStatus,
                status: 'confirmed',
                notes: form.msg,
                created_by: userId
            })
            .select(`
                *,
                clients (
                    id,
                    name,
                    lastname,
                    dni,
                    passport
                ),
                rooms (
                    id,
                    name
                )
            `)
            .single();

        if (reservationError) {
            throw reservationError;
        }

        if (paymentAmount > 0) {

            const paymentLabel = (
                paymentStatus === 'paid'
                    ? 'paid'
                    : 'partial'
            );

            const { error: paymentError } = await db
                .from('payments')
                .insert({
                    reservation_id: reservation.id,
                    amount: paymentAmount,
                    method: form.pay,
                    status: paymentLabel,
                    hotel_id: hotelId
                });

            if (paymentError) {

                throw paymentError;

            }

        }

        const { error: roomError } = await db
            .from('rooms')
            .update({
                status: 'occupied'
            })
            .eq('id', roomSelected.id);

        if (roomError) {
            throw roomError;
        }

        return reservation;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const confirmReservation = async ({reservationId}) => {
    try {
        const { error } = await db
            .from('reservations')
            .update({
                status: 'confirmed'
            })
            .eq('id', reservationId);

        if (error) {
            throw error;
        }

        return true;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const cancelReservation = async ({ reservationId, roomId }) => {

    try {

        /*
        =========================================
        UPDATE RESERVATION
        =========================================
        */

        const { error: reservationError } = await db
            .from('reservations')
            .update({
                status: 'cancelled'
            })
            .eq('id', reservationId);

        if (reservationError) {
            throw reservationError;
        }

        /*
        =========================================
        UPDATE ROOM
        =========================================
        */

        const { error: roomError } = await db
            .from('rooms')
            .update({
                status: 'available'
            })
            .eq('id', roomId);

        if (roomError) {
            throw roomError;
        }

        return true;

    } catch (error) {

        console.error(error);

        throw error;

    }

}

export const checkinReservation = async ({ reservationId, roomId }) => {

    try {

        const { error: reservationError } = await db
            .from('reservations')
            .update({
                status: 'checkin'
            })
            .eq('id', reservationId);

        if (reservationError) {
            throw reservationError;
        }

        const { error: roomError } = await db
            .from('rooms')
            .update({
                status: 'occupied'
            })
            .eq('id', roomId);

        if (roomError) {
            throw roomError;
        }

        return true;

    } catch (error) {

        console.error(error);

        throw error;

    }

}

export const checkoutReservation = async ({ reservationId, roomId }) => {

    try {

        const { error: reservationError } = await db
            .from('reservations')
            .update({
                status: 'checkout'
            })
            .eq('id', reservationId);

        if (reservationError) {
            throw reservationError;
        }

        const { error: roomError } = await db
            .from('rooms')
            .update({
                status: 'cleaning'
            })
            .eq('id', roomId);

        if (roomError) {
            throw roomError;
        }

        return true;

    } catch (error) {
        console.error(error);
        throw error;
    }

}

export const receivedPaymentReservation = async ({ reservationId }) => {

    try {

        /*
        =========================================
        UPDATE RESERVATION
        =========================================
        */

        const { error: reservationError } = await db
            .from('reservations')
            .update({
                payment_status: 'paid'
            })
            .eq('id', reservationId);

        if (reservationError) {
            throw reservationError;
        }

        /*
        =========================================
        UPDATE PAYMENTS
        =========================================
        */

        const { error: paymentError } = await db
            .from('payments')
            .update({
                status: 'paid'
            })
            .eq('reservation_id', reservationId);

        if (paymentError) {
            throw paymentError;
        }

        return true;

    } catch (error) {

        console.error(error);

        throw error;

    }

}

export const refundReservation = async ({reservationId}) => {
    try {
        const { error } = await db
            .from('reservations')
            .update({
                payment_status: 'refund'
            })
            .eq('id', reservationId);
        if (error) {
            throw error;
        }
        return true;
    } catch (error) {
        console.error(error);
        throw error;
    }
}