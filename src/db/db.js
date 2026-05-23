import { IconBed, IconCalendar, IconCashBanknote, IconUser } from "@tabler/icons-react";

export const fakeData = {
    kpis: [
        {
            ico: <IconBed/>,
            sub: 'Ocupación',
            tit: '18/22',
            stats: {
                state: 'up',
                value: '12%',
            },
            progressbar: true,
        },
        {
            ico: <IconCalendar/>,
            sub: 'Reservas hoy',
            tit: '2',
            stats: {
                state: 'up',
                value: 'Hoy',
            },
            label: 'Próxima a las 14:00 p.m.'
        },
        {
            ico: <IconCashBanknote/>,
            sub: 'Ingresos',
            tit: '22,526.00',
            stats: {
                state: 'up',
                value: '12%',
            },
            label: 'Facturado: s/ 18,000.00'
        },
        {
            ico: <IconUser/>,
            sub: 'Clientes nuevos',
            tit: '22',
            stats: {
                state: 'up',
                value: '12%',
            },
            label: '12% con respecto al mes anterior'
        }
    ],
    lastBooks: [
        {
            id: 1,
            code: '085',
            guest: {
                dni: '78965412',
                name: 'Marco Felipe',
                last: 'Veliz Huaman',
                phone: '+51 987 159 025'
            },
            room: '101 - Suite doble',
            date: {
                in: '23 MAY',
                out: '26 MAY'
            },
            pay: {
                total: 480,
                method: 'YAPE',
                status: 'cancel'
            },
            status: {
                state: 'success',
                label: 'Confirmado',
            },
            person: '2 adultos, 0 Niños',
            notes: 'Cliente alegido al algodon.'
        },
        {
            id: 2,
            code: '086',
            guest: {
                dni: '78965412',
                name: 'Marco Felipe',
                last: 'Veliz Huaman',
                phone: '+51 987 159 025'
            },
            room: '102 - Suite doble',
            date: {
                in: '23 MAY',
                out: '26 MAY'
            },
            pay: {
                total: 480,
                method: 'YAPE',
                status: 'cancel'
            },
            status: {
                state: 'success',
                label: 'Confirmado',
            },
            person: '2 adultos, 0 Niños',
            notes: 'Cliente alegido al algodon.'
        },
        {
            id: 3,
            code: '087',
            guest: {
                dni: '78965412',
                name: 'Marco Felipe',
                last: 'Veliz Huaman',
                phone: '+51 987 159 025'
            },
            room: '103 - Suite doble',
            date: {
                in: '23 MAY',
                out: '26 MAY'
            },
            pay: {
                total: 480,
                method: 'YAPE',
                status: 'cancel'
            },
            status: {
                state: 'success',
                label: 'Confirmado',
            },
            person: '2 adultos, 0 Niños',
            notes: 'Cliente alegido al algodon.'
        }
    ],
    rooms: {
        stats: [
            {
                label: 'Disponibles',
                value: 12
            },
            {
                label: 'Ocupadas',
                value: 8
            },
            {
                label: 'Limpieza',
                value: 3
            },
            {
                label: 'Ocupación',
                value: 65
            }
        ],
        list: [
            {
                id: 1,
                image: '',
                title: 'Suite Matrimonial',
                floor: 1,
                price: 250,
                status: 'available',
                capacity: 2,
                extra: [
                    {
                        type: 'wifi',
                        label: 'Wi-fi'
                    },
                    {
                        type: 'tv',
                        label: 'Smart TV'
                    },
                    {
                        type: 'table',
                        label: 'Escritorio'
                    }
                ]
            },
            {
                id: 2,
                image: '',
                title: 'Suite Matrimonial',
                floor: 1,
                price: 250,
                status: 'available',
                capacity: 2,
                extra: [
                    {
                        type: 'wifi',
                        label: 'Wi-fi'
                    },
                    {
                        type: 'tv',
                        label: 'Smart TV'
                    },
                    {
                        type: 'table',
                        label: 'Escritorio'
                    }
                ]
            },
            {
                id: 3,
                image: '',
                title: 'Suite Matrimonial',
                floor: 1,
                price: 250,
                status: 'available',
                capacity: 2,
                extra: [
                    {
                        type: 'wifi',
                        label: 'Wi-fi'
                    },
                    {
                        type: 'tv',
                        label: 'Smart TV'
                    },
                    {
                        type: 'table',
                        label: 'Escritorio'
                    }
                ]
            },
            {
                id: 4,
                image: '',
                title: 'Suite Matrimonial',
                floor: 1,
                price: 250,
                status: 'available',
                capacity: 2,
                extra: [
                    {
                        type: 'wifi',
                        label: 'Wi-fi'
                    },
                    {
                        type: 'tv',
                        label: 'Smart TV'
                    },
                    {
                        type: 'table',
                        label: 'Escritorio'
                    }
                ]
            },
            {
                id: 5,
                image: '',
                title: 'Suite Matrimonial',
                floor: 1,
                price: 250,
                status: 'available',
                capacity: 2,
                extra: [
                    {
                        type: 'wifi',
                        label: 'Wi-fi'
                    },
                    {
                        type: 'tv',
                        label: 'Smart TV'
                    },
                    {
                        type: 'table',
                        label: 'Escritorio'
                    }
                ]
            },
            {
                id: 6,
                image: '',
                title: 'Suite Matrimonial',
                floor: 1,
                price: 250,
                status: 'available',
                capacity: 2,
                extra: [
                    {
                        type: 'wifi',
                        label: 'Wi-fi'
                    },
                    {
                        type: 'tv',
                        label: 'Smart TV'
                    },
                    {
                        type: 'table',
                        label: 'Escritorio'
                    }
                ]
            },
            {
                id: 7,
                image: '',
                title: 'Suite Matrimonial',
                floor: 1,
                price: 250,
                status: 'available',
                capacity: 2,
                extra: [
                    {
                        type: 'wifi',
                        label: 'Wi-fi'
                    },
                    {
                        type: 'tv',
                        label: 'Smart TV'
                    },
                    {
                        type: 'table',
                        label: 'Escritorio'
                    }
                ]
            },
            {
                id: 8,
                image: '',
                title: 'Suite Matrimonial',
                floor: 1,
                price: 250,
                status: 'available',
                capacity: 2,
                extra: [
                    {
                        type: 'wifi',
                        label: 'Wi-fi'
                    },
                    {
                        type: 'tv',
                        label: 'Smart TV'
                    },
                    {
                        type: 'table',
                        label: 'Escritorio'
                    }
                ]
            },
            {
                id: 9,
                image: '',
                title: 'Suite Matrimonial',
                floor: 1,
                price: 250,
                status: 'available',
                capacity: 2,
                extra: [
                    {
                        type: 'wifi',
                        label: 'Wi-fi'
                    },
                    {
                        type: 'tv',
                        label: 'Smart TV'
                    },
                    {
                        type: 'table',
                        label: 'Escritorio'
                    }
                ]
            }
        ]
    }
}