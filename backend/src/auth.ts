import express, { Request, Response } from 'express';
const { createServerClient, parseCookieHeader, serializeCookieHeader } = require('@supabase/ssr');
import {SupabaseClient} from "@supabase/supabase-js";
require('dotenv').config();

exports.createClient = (req: Request, res: Response ) : SupabaseClient => {
    return createServerClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
        cookies: {
            getAll() {
                return parseCookieHeader(req.headers.cookie ?? '')
            },
            setAll(cookiesToSet: { name: any; value: any; options: any; }[]) {
                cookiesToSet.forEach(({ name, value, options }) =>
                    res.appendHeader('Set-Cookie', serializeCookieHeader(name, value, options))
                )
            },
        },
    })
}