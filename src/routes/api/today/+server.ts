import type { RequestHandler } from '@sveltejs/kit';
import { getDb } from '$lib/database';

export const GET: RequestHandler = async () => {
    const db = await getDb();
    const timestamp = new Date().toISOString();
    const data = db.prepare(`
    SELECT SUM(amount) as consumed_today 
    FROM consumption
    WHERE DATE(timestamp) = DATE(?)
    GROUP BY DATE(timestamp)
    `).get(timestamp);
    return new Response(JSON.stringify({ data }), {
        headers: { 'Content-Type': 'application/json' }
    });
};

export const POST: RequestHandler = async ({ request }) => {
  const db = await getDb();
  const { amount } = await request.json();
  const timestamp = new Date().toISOString();
  const result = db.prepare('INSERT INTO consumption (timestamp, amount) VALUES (?, ?)').run(timestamp, amount);
  return new Response(JSON.stringify({ id: result.lastInsertRowid, amount }), {
    headers: { 'Content-Type': 'application/json' }
  });
};