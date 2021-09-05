import Router from "koa-router";
import Koa from "koa";
import HomeRouter from "./routers/HomeRouter";
import UsersRouter from "./routers/v1/users/UsersRouterV1";
import UsersRouter2 from "./routers/v2/users/UsersRouterV2";
import session from "koa-session";
import Keygrip from "keygrip";
import serve from "koa-static";
import {Mongo} from "./db/Mongo";
import cors from "koa2-cors";
import {CORS_OPTION, SESSION_CONFIG} from "./conf/Conf";

const app = new Koa();
const router = new Router();

app.keys = new Keygrip(['im a newer secret', 'i from Lonmee'], 'sha256');

router
    .use(HomeRouter.routes())
    .use('/1/users', UsersRouter.routes())
    .use('/2/users', UsersRouter2.routes());

app
    .use(session(SESSION_CONFIG, app))
    .use(cors(CORS_OPTION))
    .use(serve("./public", {extensions: ['.txt']}))
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(8080, 'localhost', () => {
        console.log(`node start @ http://localhost:8080`);
    });

Mongo
    .setup()
    .then(console.log)
    .catch(console.error)
// .finally(() => client.close());
