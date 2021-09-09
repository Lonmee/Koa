import Router from "koa-router";
import {logInfo} from "../../../Utils";

const router = new Router()
/**
 * e.g. http://localhost:3000/1/users/5?n=lonmee&sex=male&age=40
 */
router.all('/:p',
    async (context, next) => {
        logInfo(context);
        await next();
    })

export default router;
