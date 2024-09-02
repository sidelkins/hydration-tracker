import type { RequestHandler } from '@sveltejs/kit';
import { getDb } from '$lib/database';

export const POST: RequestHandler = async ({ request }) => {
  const db = await getDb();
  const { amount } = await request.json();
  const consumption_date = new Date().toISOString();
  const result = db.prepare('INSERT INTO WaterConsumption (consumption_date, amount) VALUES (?, ?)').run(consumption_date, amount);
  return new Response(JSON.stringify({ id: result.lastInsertRowid, amount }), {
    headers: { 'Content-Type': 'application/json' }
  });
};