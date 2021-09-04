import {ExtendableContext} from "koa";

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

/**
 * 解析上下文里node原生请求的POST参数
 * @param ctx
 */
export function parsePostData(ctx: ExtendableContext) {
    return new Promise((resolve, reject) => {
        try {
            let postData = "";
            ctx.req.addListener('data', (data: Buffer) => {
                postData += data
            })
            ctx.req.addListener("end", function () {
                resolve(JSON.parse(postData));
            })
        } catch (err) {
            reject(err)
        }
    })
}
