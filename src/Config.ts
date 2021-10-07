import fs from "fs";
import {Options} from "koa2-cors";
import {ServerOptions} from "https";

/**
 *
 * @type {{keys: string[]}}
 */
export const APP_CONFIG = {
    // env?: string | undefined,                // 默认是 NODE_ENV 或 "development"
    keys: ['Lonmee', '@Koa']                    // 签名的 cookie 密钥数组
    // proxy?: boolean | undefined,             // 当真正的代理头字段将被信任时
    // subdomainOffset?: number | undefined,    // 忽略 .subdomains 的 app.subdomainOffset 偏移量，默认为 2
    // proxyIpHeader?: string | undefined,      // 代理 ip 消息头, 默认为 X-Forwarded-For
    // maxIpsCount?: number | undefined         // 从代理 ip 消息头读取的最大 ips, 默认为 0 (代表无限)
}

/**
 * key: (string) cookie key (default is koa.sess)
 * maxAge: (number || 'session') maxAge in ms (default is 1 days)
 * 'session' will result in a cookie that expires when session/browser is closed
 * Warning: If a session cookie is stolen, this cookie will never expire
 * autoCommit: (boolean) automatically commit headers (default true)
 * overwrite: (boolean) can overwrite or not (default true)
 * httpOnly: (boolean) httpOnly or not (default true)
 * signed: (boolean) signed or not (default true)
 * rolling: (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false)
 * renew: (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false
 * secure: (boolean) secure cookie
 * sameSite: (string) session cookie sameSite options (default null, don't set it)
 * @type {{rolling: boolean, maxAge: number, sameSite: null, signed: boolean, httpOnly: boolean, renew: boolean, autoCommit: boolean, secure: boolean, overwrite: boolean, key: string}}
 */
export const SESSION_CONFIG = {
    key: 'koa.sess',        // cookie key (default is koa:sess)
    maxAge: 86400000 * 7,   // cookie的过期时间 maxAge in ms (default is 1 days)
    autoCommit: true,       // 自动设置表头
    overwrite: true,        // 是否可以overwrite    (默认default true)
    httpOnly: true,         // cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true,           // 签名默认true
    rolling: false,         // 在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false,            // (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)
    secure: true,           // (boolean) secure cookie
    // sameSite: null,         // (string) session cookie sameSite options (default null, don't set it)
};

export const CORS_OPTION: Options = {
    origin: function (context: any) { //设置允许来自指定域名请求
        const {origin} = context.header;
        if (origin === 'https://localhost:3000' || origin === 'https://localhost:3001') {
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

export const SSL_OPTION: ServerOptions = {
    key: fs.readFileSync('/usr/local/etc/nginx/ssl/server.key.unsecure'),
    cert: fs.readFileSync('/usr/local/etc/nginx/ssl/server.crt'),
}

export const DB_CONFIG = {
    mongodb: {
        url: 'mongodb://localhost:27017',
        DB_KOA: 'koa'
    }
}
