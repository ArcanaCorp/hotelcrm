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
    title: 'Hotel CRM'
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