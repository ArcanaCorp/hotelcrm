import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { SUPABASE_ARCANA_CORE_KEY, SUPABASE_ARCANA_CORE_URL } from "./config";

export async function proxy(request) {
    let response = NextResponse.next({
        request,
    });

    const supabase = createServerClient(SUPABASE_ARCANA_CORE_URL, SUPABASE_ARCANA_CORE_KEY, {
        cookies: {
            getAll() {
                return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value }) =>
                    request.cookies.set(name, value)
                );
                response = NextResponse.next({
                    request,
                });
                cookiesToSet.forEach(({ name, value, options }) =>
                    response.cookies.set(name, value, options)
                );
            },
        },
    });

    const { data: { user }, } = await supabase.auth.getUser();

    // Si NO está logueado y quiere dashboard
    if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // Si YA está logueado y quiere login
    if (user && request.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return response;
}

export const config = {
    matcher: ["/", "/dashboard/:path*"],
};