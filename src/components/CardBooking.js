'use client';
import { statusPaid } from "@/helpers/statusText";
import { IconX } from "@tabler/icons-react";
import moment from "moment";
import { cancelReservation, confirmReservation, checkinReservation, checkoutReservation, receivedPaymentReservation, refundReservation } from "@/services/reservation.service";
import { toast } from "sonner";
import { useHotel } from "@/context/HotelContext";
export default function CardBooking ({ book, onClose }) {

    const { updateBook } = useHotel();

    const handleConfirmReservation = (reservation) => {
        toast.warning(
            'Confirmar reserva',
            {
                description: `¿Confirmar reserva ${reservation.code}?`,
                action: {
                    label: 'Confirmar',
                    onClick: async () => {
                        const loadingToast = toast.loading('Confirmando reserva...');
                        try {
                            await confirmReservation({reservationId: reservation.id});
                            updateBook({reservationId: reservation.id, status: 'confirmed'});
                            toast.dismiss(loadingToast);
                            toast.success('Reserva confirmada',{description: 'La reserva fue confirmada correctamente.'});
                        } catch (error) {
                            console.error(error);
                            toast.dismiss(loadingToast);
                            toast.error('Error',{description: 'No se pudo confirmar la reserva.'});
                        }
                    }
                },
                cancel: {
                    label: 'Cerrar'
                }
            }
        );
    };

    const handleCancelReservation = (reservation) => {
        toast.warning(
            'Cancelar reserva',
            {
                description: `¿Deseas cancelar la reserva ${reservation.code}?`,
                action: {
                    label: 'Cancelar reserva',
                    onClick: async () => {
                        const loadingToast = toast.loading('Cancelando reserva...');
                        try {
                            await cancelReservation({reservationId: reservation.id, roomId: reservation.room_id});
                            updateBook({reservationId: reservation.id, status: 'cancelled'});
                            toast.dismiss(loadingToast);
                            toast.success('Reserva cancelada', { description: 'La reserva fue cancelada correctamente.' });
                        } catch (error) {
                            console.error(error);
                            toast.dismiss(loadingToast);
                            toast.error('Error', { description: 'No se pudo cancelar la reserva.' });
                        }
                    }
                },
                cancel: {
                    label: 'Cerrar'
                }
            }
        );
    };

    const handleCheckin = (reservation) => {

        toast.warning(
            'Registrar Check-In',
            {
                description: `¿Registrar check-in para ${reservation.code}?`,
                action: {
                    label: 'Registrar',
                    onClick: async () => {
                        const loadingToast = toast.loading('Registrando check-in...');
                        try {
                            await checkinReservation({reservationId: reservation.id, roomId: reservation.room_id});
                            updateBook({reservationId: reservation.id, status: 'checkin'});
                            toast.dismiss(loadingToast);
                            toast.success('Check-in registrado', { description: 'El huésped ingresó correctamente.'});
                        } catch (error) {
                            console.error(error);
                            toast.dismiss(loadingToast);
                            toast.error('Error', {description: 'No se pudo registrar el check-in.'});
                        }
                    }
                },
                cancel: {
                    label: 'Cerrar'
                }
            }
        );

    };

    const handleCheckout = (reservation) => {
        toast.warning(
            'Registrar Check-Out',
            {
                description: `¿Registrar salida de ${reservation.code}?`,
                action: {
                    label: 'Registrar',
                    onClick: async () => {
                        const loadingToast = toast.loading('Registrando check-out...');
                        try {
                            await checkoutReservation({reservationId: reservation.id, roomId: reservation.room_id});
                            updateBook({ reservationId: reservation.id, status: 'checkout' });
                            toast.dismiss(loadingToast);
                            toast.success('Check-out registrado',{description: 'La habitación pasó a limpieza.'});
                        } catch (error) {
                            console.error(error);
                            toast.dismiss(loadingToast);
                            toast.error('Error', {description: 'No se pudo registrar el check-out.'});
                        }
                    }
                },
                cancel: {
                    label: 'Cerrar'
                }
            }
        );
    };

    const handlePaymentReceived = (reservation) => {

        toast.warning(
            'Confirmar pago',
            {
                description: `¿Confirmar pago recibido de ${reservation.code}?`,
                action: {
                    label: 'Confirmar',
                    onClick: async () => {
                        const loadingToast = toast.loading('Confirmando pago...');
                        try {
                            await receivedPaymentReservation({reservationId: reservation.id});
                            updateBook({ reservationId: reservation.id, payment_status: 'paid'});
                            toast.dismiss(loadingToast);
                            toast.success('Pago confirmado', {description: 'El pago fue registrado correctamente.'});
                        } catch (error) {
                            console.error(error);
                            toast.dismiss(loadingToast);
                            toast.error('Error', {description: 'No se pudo confirmar el pago.'});
                        }
                    }
                },
                cancel: {
                    label: 'Cerrar'
                }
            }
        );

    };

    const handleRefund = (reservation) => {
        toast.warning(
            'Procesar reembolso',
            {
                description: `¿Reembolsar reserva ${reservation.code}?`,
                action: {
                    label: 'Reembolsar',
                    onClick: async () => {

                        const loadingToast = toast.loading(
                            'Procesando reembolso...'
                        );

                        try {
                            await refundReservation({reservationId: reservation.id});
                            updateBook({ reservationId: reservation.id, payment_status: 'refund' });
                            toast.dismiss(loadingToast);
                            toast.success('Reembolso realizado', {description: 'El pago fue marcado como reembolsado.'});
                        } catch (error) {
                            console.error(error);
                            toast.dismiss(loadingToast);
                            toast.error('Error', { description: 'No se pudo procesar el reembolso.'});
                        }
                    }
                },
                cancel: {
                    label: 'Cerrar'
                }
            }
        );
    };

    return (
        <>
            <div className="w-full flex items-center justify-between">
                <h3 className="font-bold">#{book.code}</h3>
                <button className="w h center bg-surface rounded-full" style={{"--w": "40px", "--h": "40px"}} onClick={onClose}><IconX/></button>
            </div>
            <div className="w-full flex flex-col gap-md">
                <div className="w-full">
                    <h4 className="font-semibold text-xs mb-md">Datos del huésped</h4>
                    <div className="w-full p-md rounded-md grid grid-2 gap-md bg-surface">
                        <div className="w-full">
                            <p className="text-xs font-semibold mb-sm">{book.clients.dni ? 'DNI' : 'CEE'}</p>
                            <p className="text-sm">{book.clients.dni ? book.clients.dni : book.clients.passport}</p>
                        </div>
                        <div className="w-full">
                            <p className="text-xs font-semibold mb-sm">Nombres completos</p>
                            <p className="text-sm">{book.clients.name}</p>
                        </div>
                        <div className="w-full">
                            <p className="text-xs font-semibold mb-sm">Número</p>
                            <p className="text-sm">{book.clients.phone || 'No proporcionado'}</p>
                        </div>
                        <div className="w-full">
                            <p className="text-xs font-semibold mb-sm">Email</p>
                            <p className="text-sm">{book.clients.email || 'No proporcionado'}</p>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <h4 className="font-semibold text-xs mb-md">Detalles de la estadía</h4>
                    <div className="w-full p-md rounded-md grid grid-2 gap-md bg-surface">
                        <div className="w-full">
                            <p className="text-xs font-semibold mb-sm">Huéspedes</p>
                            <p className="text-sm">{book.guests} adultos - {book.children} niños</p>
                        </div>
                        <div className="w-full">
                            <p className="text-xs font-semibold mb-sm">Habitación</p>
                            <p className="text-sm">{book.rooms.name}</p>
                        </div>
                        <div className="w-full">
                            <p className="text-xs font-semibold mb-sm">Check-in</p>
                            <p className="text-sm">{moment(book.check_in).format('LL') || 'No proporcionado'}</p>
                        </div>
                        <div className="w-full">
                            <p className="text-xs font-semibold mb-sm">Check-out</p>
                            <p className="text-sm">{moment(book.check_out).format('LL') || 'No proporcionado'}</p>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <h4 className="font-semibold text-xs mb-md">Información del pago</h4>
                    <div className="w-full p-md rounded-md grid grid-2 gap-md bg-surface">
                        <div className="w-full">
                            <p className="text-xs font-semibold mb-sm">Total</p>
                            <p className="text-sm">s/. {(book.total).toFixed(2)}</p>
                        </div>
                        <div className="w-full">
                            <p className="text-xs font-semibold mb-sm">Método</p>
                            <p className="text-sm">{book.payment_method}</p>
                        </div>
                        <div className="w-full">
                            <p className="text-xs font-semibold mb-sm">Estado</p>
                            <p className="text-sm">{statusPaid[book.payment_status]}</p>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <div className="w-full p-md rounded-md grid grid-2 gap-md bg-surface">
                        <div className="w-full">
                            <p className="text-xs font-semibold mb-sm">Notas de recepción</p>
                            <p className="text-sm">{book.notes || 'Sin notas por el cliente'}</p>
                        </div>
                    </div>
                </div>
                <div className="w-full flex items-center gap-md">
                    {['pending', 'confirmed'].includes(book.status) && (
                        <button className="btn btn-secondary btn-block h" style={{"--h": "50px"}} onClick={() => handleCancelReservation(book)}>Cancelar reserva</button>
                    )}
                    {book.status === 'pending' && (
                        <button className="btn btn-secondary btn-block h" style={{"--h": "50px"}} onClick={() => handleConfirmReservation(book)}>Confirmar reserva</button>
                    )}
                    {book.status === 'confirmed' && (
                        <button className="btn btn-outline-primary btn-block h" style={{"--h": "50px"}} onClick={() => handleCheckin(book)}>Check-In</button>
                    )}
                    {book.status === 'checkin' && (
                        <button className="btn btn-outline-primary btn-block h" style={{"--h": "50px"}} onClick={() => handleCheckout(book)}>Check-Out</button>
                    )}
                    {(book.payment_status === 'pending' || book.payment_status === 'partial') && (
                        <button className="btn btn-primary btn-block h" style={{"--h": "50px"}} onClick={() => handlePaymentReceived(book)}>Pago recibido</button>
                    )}
                    {book.payment_status === 'paid' && (
                        <button className="btn btn-primary btn-block h" style={{"--h": "50px"}} onClick={() => handleRefund(book)}>Reembolsar</button>
                    )}
                </div>
            </div>
        </>
    )
}