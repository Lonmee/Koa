import Router from "koa-router";
import {logInfo, parsePostData} from "../Utils";
import {Mongo} from "../db/Mongo";

const router = new Router()
router.all(['/'],
    async (context, next) => {
        let query = '';
        switch (context.method) {
            case 'POST':
                const users = Mongo.collections[Mongo.COLLECTIONS_KEY.users];
                const postData: any = await parsePostData(context);
                const findResult: any = await users.find({name: postData.name});
                if (findResult) {
                    if (postData.pin === findResult.pin) {
                        context.session!.id = findResult._id;
                        context.body = findResult;
                    } else {
                        context.body = {code: 203, msg: 'invalid password'};
                    }
                } else {
                    context.body = {code: 204, msg: 'invalid account'};
                }
                break;
            case 'DELETE':
                context.session!.maxAge = 0
                break;
            default:
                logInfo(context);
        }
        await next();
    },
    async (context, next) => {
    })

export default router;