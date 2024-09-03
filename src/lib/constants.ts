export const isDev: boolean = import.meta.env.VITE_ENV === "development";
export const title: string = "Simple Water Tracker";
export const db_file: string = "db.sqlite";
// environment variables currently do not work
//export const db_file: string = process.env.DB_FILE ?? "db.sqlite";

// Routes
export const homeLoc: string = "/";
export const historyLoc: string = "/history";
export const settingsLoc: string = "/settings";

// Standard Water Sizes (fl. oz)
export class StandardSizes {
    static waterBottle: string = "Water Bottle";
}
export class FluidOunces {
    static waterBottle: number = 16.9;
    static stanleyCup: number = 40;
}