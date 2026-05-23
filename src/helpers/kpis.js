import {
    IconBed,
    IconCalendar,
    IconCashBanknote,
    IconUser,
    IconDoor,
    IconBedFilled,
    IconSparkles,
    IconChartBar
} from "@tabler/icons-react";

export const generateKPIS = ({ rooms = [], reservations = [], clients = [], payments = [] }) => {

    /*
    =========================
    ROOMS
    =========================
    */

    const totalRooms = rooms.length;

    const occupiedRooms = rooms.filter(
        room => room.status === 'occupied'
    ).length;

    const occupancyPercent = totalRooms > 0
        ? Math.round((occupiedRooms / totalRooms) * 100)
        : 0;

    /*
    =========================
    TODAY
    =========================
    */

    const today = new Date();

    const todayString = today.toISOString().split('T')[0];

    /*
    =========================
    RESERVATIONS TODAY
    =========================
    */

    const reservationsToday = reservations.filter(reservation => {

        const checkIn = new Date(reservation.check_in)
            .toISOString()
            .split('T')[0];

        return checkIn === todayString;

    });

    /*
    =========================
    NEXT CHECKIN
    =========================
    */

    const nextReservation = reservationsToday[0];

    /*
    =========================
    INCOME
    =========================
    */

    const totalIncome = payments.reduce((acc, payment) => {
        return acc + Number(payment.amount || 0);
    }, 0);

    /*
    =========================
    CLIENTS THIS MONTH
    =========================
    */

    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const newClients = clients.filter(client => {

        const created = new Date(client.created_at);

        return (
            created.getMonth() === currentMonth &&
            created.getFullYear() === currentYear
        );

    });

    /*
    =========================
    KPI ARRAY
    =========================
    */

    return [

        {
            ico: <IconBed />,
            sub: 'Ocupación',
            tit: `${occupiedRooms}/${totalRooms}`,
            stats: {
                state: occupancyPercent >= 50 ? 'up' : 'down',
                value: `${occupancyPercent}%`,
            },
            progressbar: true,
            bar: {
                value: occupiedRooms,
                total: totalRooms
            }
        },

        {
            ico: <IconCalendar />,
            sub: 'Reservas hoy',
            tit: `${reservationsToday.length}`,
            stats: {
                state: 'up',
                value: 'Hoy',
            },
            label: nextReservation
                ? `Próxima llegada: ${new Date(nextReservation.check_in).toLocaleTimeString('es-PE', {
                    hour: '2-digit',
                    minute: '2-digit'
                })}`
                : 'Sin reservas pendientes'
        },

        {
            ico: <IconCashBanknote />,
            sub: 'Ingresos',
            tit: `S/ ${totalIncome.toFixed(2)}`,
            stats: {
                state: 'up',
                value: 'Ingresos',
            },
            label: `Pagos registrados: ${payments.length}`
        },

        {
            ico: <IconUser />,
            sub: 'Clientes nuevos',
            tit: `${newClients.length}`,
            stats: {
                state: 'up',
                value: 'Mes actual',
            },
            label: 'Clientes registrados este mes'
        }

    ];

}

export const getRoomStats = (rooms = []) => {

    const totalRooms = rooms.length;

    const available = rooms.filter(
        room => room.status === 'available'
    ).length;

    const occupied = rooms.filter(
        room => room.status === 'occupied'
    ).length;

    const cleaning = rooms.filter(
        room => room.status === 'cleaning'
    ).length;

    const occupancy = totalRooms > 0
        ? Math.round((occupied / totalRooms) * 100)
        : 0;

    return [
        {
            icon: <IconDoor/>,
            label: 'Disponibles',
            value: available,
            unit: ''
        },
        {
            icon: <IconBedFilled/>,
            label: 'Ocupadas',
            value: occupied,
            unit: ''
        },
        {
            icon: <IconSparkles/>,
            label: 'Limpieza',
            value: cleaning,
            unit: ''
        },
        {
            icon: <IconChartBar/>,
            label: 'Ocupación',
            value: occupancy,
            unit: '%'
        }
    ];

}