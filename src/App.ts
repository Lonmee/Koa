import Router from "koa-router";
import Koa from "koa";
import HomeRouter from "./routers/HomeRouter";
import UsersRouter from "./routers/v1/users/UsersRouterV1";
import UsersRouter2 from "./routers/v2/users/UsersRouterV2";
import session from "koa-session";
import {SESSION_CONFIG} from "./Config";
import Keygrip from "keygrip";
import serve from "koa-static";
import {DBPool} from "./Utils";

const app = new Koa();
const router = new Router();

app.keys = new Keygrip(['im a newer secret', 'i from Lonmee'], 'sha256');

router.use(HomeRouter.routes());
router.use('/1/users', UsersRouter.routes());
router.use('/2/users', UsersRouter2.routes());

app
    .use(session(SESSION_CONFIG, app))
    .use(serve("./public", {extensions: ['.txt']}))
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000, 'localhost', () => {
        console.log(`node start @ http://localhost:3000`);
    });

DBPool.getConnection((err, connection) => {
    connection.query(`SELECT * FROM Tech`, (error, results, fields) => {
        connection.release();
        if (error) throw error;
        for (const result of results) {
            console.log(result.name);
        }
    })
})
