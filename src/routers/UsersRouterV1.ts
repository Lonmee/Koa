import Router from "koa-router";
import {Mongo} from "../db/Mongo";
import {logInfo, parsePostData} from "../Utils";
import {MongoServerError, ObjectId} from "mongodb";

const router = new Router()
router
    .post(['/'], async (context, next) => {
        // query = 'INSERT INTO users (name, sex, age, phone, wechat) VALUES (<name>, <sex>, <age>, <phone>, <wechat>);';
        const users = Mongo.collections[Mongo.COLLECTIONS_KEY.users];
        const postData: any = await parsePostData(context);
        const count = await users.find({name: postData.name}).count();
        if (count) {
            return context.body = {
                acknowledged: false,
                insertedId: "",
                msg: 'name conflict'
            };
        }
        try {
            const insertResult = await users.insertOne({
                _id: new ObjectId(),
                ...postData,
            });
            context.session!.id = insertResult.insertedId;
            context.body = insertResult;
        } catch (error) {
            if (error instanceof MongoServerError) {
                console.log(`Error worth logging: ${error}`);
            }
            throw error;
        }
    })
    .get(['/', '/:id'], async (context, next) => {
        const users = Mongo.collections[Mongo.COLLECTIONS_KEY.users];
        const id = context.params.id || context.session!.id;
        if (id == 0) {
            context.body = 'no id';
        } else {
            const uId = new ObjectId(id);
            const findResult = await users.findOne({_id: uId});
            context.body = findResult;
        }
    })
    .put(['/', '/:id'], async (context, next) => {
        logInfo(context);
    })
    .patch(['/', '/:id'], async (context, next) => {
        logInfo(context);
    })
    .delete(['/', '/:id'], async (context, next) => {
        logInfo(context);
    });

export default router;
