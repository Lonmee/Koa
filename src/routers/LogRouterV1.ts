import Router from "koa-router";
import {parsePostData} from "../Utils";
import {Mongo} from "../db/Mongo";
import {FindCursor} from "mongodb";

const router = new Router()
router.post(['/'],
    async (context, next) => {
        const users = Mongo.collection(Mongo.COLLECTIONS_KEY.users);
        const postData: any = await parsePostData(context);
        const findResult: any = await users.findOne({name: postData.name});
        if (findResult) {
            if (postData.pin === findResult.pin) {
                context.session!.id = findResult._id;
                context.body = {code: 200, info: findResult};
            } else {
                context.body = {code: 203, msg: 'invalid password'};
            }
        } else {
            context.body = {code: 204, msg: 'invalid account'};
        }
        await next();
    },
    async (context, next) => {
    })
    .delete(['/'],
        async (context, next) => {
            context.session = null;
            context.body = {code: 200, msg: 'successful'};
        });

export default router;