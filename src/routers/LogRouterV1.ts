import Router from "koa-router";
import {logInfo} from "../Utils";

const router = new Router()
router.all(['/'],
    async (context, next) => {
        let query = '';
        switch (context.method) {
            case 'POST':
                // todo: login with account & password
                break;
            case 'DELETE':
                // todo: logout
                break;
            default:
                logInfo(context);
        }
        await next();
    },
    async (context, next) => {
    })

export default router;