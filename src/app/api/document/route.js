import { FACTILIZA_API } from "@/config";
import { NextResponse } from "next/server";

const DOCUMENT_RULES = {
    dni: 8,
    cee: 9
};

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);

        const tipo = searchParams.get("tipo")?.toLowerCase().trim();
        const numero = searchParams.get("numero")?.trim();

        if (!tipo || !numero) return NextResponse.json({ success: false, message: "Tipo y documento son requeridos" }, { status: 400 });

        if (!DOCUMENT_RULES[tipo]) return NextResponse.json({success: false, message: "Tipo de documento inválido"}, { status: 400 });

        if (!/^\d+$/.test(numero) || numero.length !== DOCUMENT_RULES[tipo]) return NextResponse.json({success: false, message: `El ${tipo.toUpperCase()} es inválido`}, { status: 400 });

        // Timeout controller
        const controller = new AbortController();

        const timeout = setTimeout(() => {
            controller.abort();
        }, 10000);

        const response = await fetch(`https://api.factiliza.com/v1/${tipo}/info/${numero}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${FACTILIZA_API}`,
                    "Content-Type": "application/json"
                },
                cache: "no-store",
                signal: controller.signal
            }
        );

        clearTimeout(timeout);

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            return NextResponse.json({ success: false, message: errorData?.message || "Error al consultar servicio externo" }, { status: response.status });
        }

        const data = await response.json();

        return NextResponse.json({success: true, data: data.data});

    } catch (error) {
        if (error.name === "AbortError") return NextResponse.json({ success: false, message: "Tiempo de espera agotado" }, { status: 504 });
        console.error("DOCUMENT API ERROR:", error);
        return NextResponse.json({ success: false, message: "Error interno del servidor" }, { status: 500 });
    }
}