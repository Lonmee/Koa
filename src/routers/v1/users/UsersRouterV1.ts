import Router from "koa-router";
import {logInfo} from "../../../Utils";

const router = new Router()
/**
 * e.g. http://localhost:3000/1/users/5?n=lonmee&sex=male&age=40
 */
router.all('/:id',
    async (context, next) => {
        await next();
        console.log("do response");
        logInfo(context);
    },
    async (context, next) => {
        console.log("dbop");
        await next();
        console.log("dbop2");
    })

export default router;
