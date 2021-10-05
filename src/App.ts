import Router from "koa-router";
import Koa from "koa";
import HomeRouter from "./routers/HomeRouter";
import LogRouter from "./routers/LogRouterV1";
import UsersRouterV1 from "./routers/UsersRouterV1";
import UsersRouterV2 from "./routers/UsersRouterV2";
import session from "koa-session";
import serve from "koa-static";
import {Mongo} from "./db/Mongo";
import cors from "koa2-cors";
import {APP_CONFIG, CORS_OPTION, SESSION_CONFIG, SSL_OPTION} from "./Config";
import * as https from "https";

const app = new Koa(APP_CONFIG);
const router = new Router();

router
    .use(HomeRouter.routes())
    .use('/1/log', LogRouter.routes())
    .use('/1/users', UsersRouterV1.routes())
    .use('/2/users', UsersRouterV2.routes());

app
    .use(session(SESSION_CONFIG, app))
    .use(cors(CORS_OPTION))
    .use(serve("./public", {extensions: ['.txt']}))
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(8080, 'localhost', () => {
        console.log(`koa http @ http://localhost:8080`);
    });

https
    .createServer(SSL_OPTION, app.callback())
    .listen(8081, 'localhost', () => {
        console.log(`koa https @ https://localhost:8081`);
    });

Mongo
    .setup()
    .then(console.log)
    .catch(console.error)
// .finally(() => client.close());
