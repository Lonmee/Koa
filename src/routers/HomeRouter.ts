import Router from "koa-router";
import {logInfo} from "../Utils";

const router = new Router()
router.get('/', async (context, next) => {
        await next();
        const rt = context.response.get('X-Response-Time');
        console.log(`${context.method} ${context.url} - ${rt}`);
    },
    async (context, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        context.set('X-Response-Time', `${ms}ms`);
    },
    async (context, next) => {
        context.body = 'home usersRouter';
    })
    .get('/home', (context, next) => {
        logInfo(context);
    })
    .post('/home', (context, next) => {
        logInfo(context);
    })
    .put('/home', (context, next) => {
        logInfo(context);
    })
    .del('/home', (context, next) => {
        logInfo(context);
    })
    .all('/home', (context, next) => {
        console.log('all');
        logInfo(context);
    });

export default router;
