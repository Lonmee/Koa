import Router from "koa-router";
import {parsePostData} from "../Utils";
import {Mongo, mongoOP} from "../db/Mongo";

const router = new Router()
const usersKey = Mongo.COLLECTIONS_KEY.users;
router
    .all(['/'],
        async (context, next) => {
            switch (context.method) {
                case 'POST':
                    const postData: any = await parsePostData(context);
                    const opOption = {key: usersKey, type: Mongo.OP_TYPE.r, filter: {name: postData.name}};
                    const findResult: any = await mongoOP(opOption);
                    if (findResult) {
                        if (postData.pin === findResult.pin) {
                            context.session!.id = findResult._id;
                            return context.body = findResult;
                        } else {
                            context.status = 203;
                            return context.message = 'invalid password';
                        }
                    } else {
                        context.status = 204;
                        return context.message = 'invalid account';
                    }
                case 'DELETE':
                    context.session = null;
                    return context.status = 200;
                default:
                    return context.status = 405;
            }
        })

export default router;