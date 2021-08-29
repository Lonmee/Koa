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
