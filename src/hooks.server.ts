import type { Handle } from '@sveltejs/kit';
import { setupDatabase } from '$lib/database.server';

// Use the Handle type from @sveltejs/kit for better type safety
export const handle: Handle = async ({ event, resolve }) => {
  await setupDatabase();  // Make sure to use `await` since `setupDatabase` is async
  return resolve(event);
};
