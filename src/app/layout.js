import { Montserrat } from "next/font/google";
import "@/assets/css/global.css";
import { Toaster } from "sonner";
import Providers from "@/providers/Providers";

const montserrat = Montserrat({
    variable: '--font-sans',
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

export const metadata = {
    metadataBase: new URL('https://hotel.andaleya.pe'),
    title: {
        default: 'Ándale Hotel CRM',
        template: '%s | Ándale Hotel CRM'
    },
    description: 'Sistema moderno de gestión hotelera para hoteles, hostales y alojamientos turísticos. Administra reservas, habitaciones, clientes y operaciones hoteleras desde una plataforma rápida, moderna y escalable.',
    keywords: [
        'hotel crm',
        'sistema hotelero',
        'software hotelero',
        'gestión hotelera',
        'reservas hotel',
        'hotel management system',
        'crm hotelero',
        'software para hoteles',
        'hostales',
        'turismo',
        'hotel dashboard',
        'hotel booking',
        'hotel peru',
        'hotel jauja',
        'hotel latinoamerica',
        'hotel saas'
    ],
    authors: [
        {
            name: 'ARCANA CORP'
        }
    ],
    creator: 'ARCANA CORP',
    publisher: 'ARCANA CORP',
    applicationName: 'Ándale Hotel CRM',
    category: 'technology',
    alternates: {
        canonical: 'https://hotel.andaleya.pe'
    },
    openGraph: {
        type: 'website',
        locale: 'es_PE',
        url: 'https://hotel.andaleya.pe',
        siteName: 'Ándale Hotel CRM',
        title: 'Ándale Hotel CRM',
        description: 'Digitaliza tu hotel con una plataforma moderna para gestionar reservas, habitaciones, clientes y operaciones hoteleras.',
        images: [
            {
                url: '/images/seo-cover.jpg',
                width: 1200,
                height: 630,
                alt: 'Ándale Hotel CRM'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Ándale Hotel CRM',
        description: 'Sistema moderno de gestión hotelera desarrollado para hoteles y alojamientos turísticos.',
        images: ['/images/seo-cover.jpg']
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1
        }
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/apple-touch-icon.png'
    },
    manifest: '/manifest.json'
}

export default function RootLayout ({ children }) {
    return (
        <html lang="es" className={`${montserrat.variable}`}>
            <body>
                <Providers>
                    {children}
                    <Toaster duration={5000} position="top-right" richColors />
                </Providers>
            </body>
        </html>
    )
}