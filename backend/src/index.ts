import express, { Request, Response } from 'express';
import {createServerClient, parseCookieHeader, serializeCookieHeader} from '@supabase/ssr';
require('dotenv').config();

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('backend test');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.get("/auth/callback", async function (req: Request, res: Response) {
    const code = req.query.code;
    const next = req.query.next ?? "/";

})