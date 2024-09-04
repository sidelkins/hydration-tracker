import { SECRET_DB_FILE } from '$env/static/private'

export const isDev: boolean = import.meta.env.VITE_ENV === "development";
export const dbFile: string = SECRET_DB_FILE ?? "db.sqlite";