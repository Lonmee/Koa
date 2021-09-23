import fs from "fs";

export const APP_CONFIG = {
    // env?: string | undefined,
    keys: ['Lonmee', '@Koa']
    // proxy?: boolean | undefined,
    // subdomainOffset?: number | undefined,
    // proxyIpHeader?: string | undefined,
    // maxIpsCount?: number | undefined
}

export const SESSION_CONFIG = {
    CURRENT: {
        key: 'koa:sess',    // cookie key (default is koa:sess)
        maxAge: 86400000 * 7,   // cookie的过期时间 maxAge in ms (default is 1 days)
        autoCommit: true,   // 自动设置表头
        overwrite: true,    // 是否可以overwrite    (默认default true)
        httpOnly: true,     // cookie是否只有服务器端可以访问 httpOnly or not (default true)
        signed: true,       // 签名默认true
        rolling: false,     // 在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
        renew: true,       // (boolean) renew session when session is nearly expired,
        secure: false,
    },
    DEFAULT: {
        key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
        /** (number || 'session') maxAge in ms (default is 1 days) */
        /** 'session' will result in a cookie that expires when session/browser is closed */
        /** Warning: If a session cookie is stolen, this cookie will never expire */
        maxAge: 86400000,
        autoCommit: true,
        /** (boolean) automatically commit headers (default true) */
        overwrite: true,
        /** (boolean) can overwrite or not (default true) */
        httpOnly: true,
        /** (boolean) httpOnly or not (default true) */
        signed: true,
        /** (boolean) signed or not (default true) */
        rolling: false,
        /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
        renew: false,
        /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
        secure: true,
        /** (boolean) secure cookie*/
        sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
    }
};

export const CORS_OPTION = {
    origin: function (context: any) { //设置允许来自指定域名请求
        const {origin} = context.header;
        if (origin === 'http://localhost:3000' || origin === 'http://localhost') {
            return origin;
        }
        //return '*'; // 允许来自所有域名请求
        // return 'http://localhost:8080'; //只允许http://localhost:8080这个域名的请求
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法'
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Accept'] //设置获取其他自定义字段
}

export const SSL_OPTION = {
    key: fs.readFileSync('/usr/local/etc/nginx/ssl/server.key.unsecure'),
    cert: fs.readFileSync('/usr/local/etc/nginx/ssl/server.crt')
}
