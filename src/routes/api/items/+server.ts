import type { RequestHandler } from '@sveltejs/kit';
import { getDb } from '$lib/database';

export const GET: RequestHandler = async () => {
  const db = await getDb();
  const data = db.prepare('SELECT * FROM items').all();
  return new Response(JSON.stringify({ data }), {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const POST: RequestHandler = async ({ request }) => {
  const db = await getDb();
  const { name } = await request.json();
  const result = db.prepare('INSERT INTO items (name) VALUES (?)').run(name);
  return new Response(JSON.stringify({ id: result.lastInsertRowid, name }), {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const PATCH: RequestHandler = async ({ request, params }) => {
  const { id } = params;
  const { name } = await request.json();
  const db = await getDb();
  db.prepare('UPDATE items SET name = ? WHERE id = ?').run(name, id);
  return new Response(JSON.stringify({ id, name }), {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const DELETE: RequestHandler = async ({ params }) => {
  const { id } = params;
  const db = await getDb();
  db.prepare('DELETE FROM items WHERE id = ?').run(id);
  return new Response(JSON.stringify({ id }), {
    headers: { 'Content-Type': 'application/json' }
  });
};