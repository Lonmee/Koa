import {createPool} from "mysql";

export function logInfo(context: any) {
    const {method, ip, hostname, href} = context;
    const params = context.params;
    const query = context.query;
    context.body = `method: ${method}
ip: ${ip}
hostname: ${hostname}
href: ${href}
params: `
    for (const paramKey in params) {
        context.body += `${paramKey} = ${params[paramKey]} 
        `;
    }
    context.body += `
query: `
    for (const queryKey in query) {
        context.body += `${queryKey} = ${query[queryKey]} 
       `;
    }
}

export const DBPool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'Lonmee',
    database: 'employee',
});

export const SampleDBPool = createPool({
    host: '52.27.134.212',
    user: 'Sample user',
    password: 'Sample user',
    database: 'Northwind',
});
