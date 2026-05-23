import { IconBed, IconCalendar, IconLayout, IconSettings, IconUsers } from "@tabler/icons-react";

export const navs = [
    {
        ico: <IconLayout/>,
        txt: 'Dashboard',
        url: '/dashboard'
    },
    {
        ico: <IconCalendar/>,
        txt: 'Reservas',
        url: '/dashboard/booking'
    },
    {
        ico: <IconBed/>,
        txt: 'Habitaciones',
        url: '/dashboard/rooms'
    },
    {
        ico: <IconUsers/>,
        txt: 'Clientes',
        url: '/dashboard/clients'
    },
    {
        ico: <IconSettings/>,
        txt: 'Configuración',
        url: '/dashboard/settings'
    }
]