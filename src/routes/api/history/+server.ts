import type { RequestHandler } from '@sveltejs/kit';
import { getDb } from '$lib/database';

export const GET: RequestHandler = async () => {
    const db = await getDb();
    const data = db.prepare('SELECT * FROM consumption').all();
    return new Response(JSON.stringify({ data }), {
        headers: { 'Content-Type': 'application/json' }
    });
};