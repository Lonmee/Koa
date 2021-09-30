import fs from "fs";
import {MongoClient} from "mongodb";

export const APP_CONFIG = {
    // env?: string | undefined,                // 默认是 NODE_ENV 或 "development"
    keys: ['Lonmee', '@Koa']                    // 签名的 cookie 密钥数组
    // proxy?: boolean | undefined,             // 当真正的代理头字段将被信任时
    // subdomainOffset?: number | undefined,    // 忽略 .subdomains 的 app.subdomainOffset 偏移量，默认为 2
    // proxyIpHeader?: string | undefined,      // 代理 ip 消息头, 默认为 X-Forwarded-For
    // maxIpsCount?: number | undefined         // 从代理 ip 消息头读取的最大 ips, 默认为 0 (代表无限)
}

export const SESSION_CONFIG = {
    key: 'koa:sess',        // cookie key (default is koa:sess)
    maxAge: 86400000 * 7,   // cookie的过期时间 maxAge in ms (default is 1 days)
    autoCommit: true,       // 自动设置表头
    overwrite: true,        // 是否可以overwrite    (默认default true)
    httpOnly: true,         // cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true,           // 签名默认true
    rolling: false,         // 在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: true,            // (boolean) renew session when session is nearly expired,
    secure: false,          // (string) session cookie sameSite options (default null, don't set it)
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

export const DB_CONFIG = {
    mongodb: {
        url: 'mongodb://localhost:27017',
        dbName: 'koa'
    }
}
