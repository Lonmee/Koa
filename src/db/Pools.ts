import {createPool} from "mysql";

export const POOLS = {
    USERS: createPool({
        host: 'localhost',
        user: 'root',
        password: 'Lonmee',
        database: 'users',
    }),

    ST: createPool({
        host: 'localhost',
        user: 'root',
        password: 'Lonmee',
        database: 'st',
    })
};
