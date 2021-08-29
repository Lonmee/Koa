import Router from "koa-router";
import {logInfo} from "../Utils";

const router = new Router()
router.all('/:v/:m/:p',
    async (context, next) => {
        console.log('all');
        await next;
        logInfo(context);
    })

export default router;
