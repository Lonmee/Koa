import Router from "koa-router";
import {Mongo, mongoOP} from "../db/Mongo";
import {parsePostData} from "../Utils";
import {MongoServerError, ObjectId} from "mongodb";

const router = new Router()
const usersKey = Mongo.COLLECTIONS_KEY.users;
router
    .all(['/', '/:id'], async (context, next) => {
        const
            id = context.params.id || context.session!.id,
            idFilter = id == 0 ? null : {_id: new ObjectId(id)};
        let
            opOption,
            findResult,
            postData: any;
        switch (context.method) {
            case 'POST':
                postData = await parsePostData(context)
                const nameFilter = {name: postData.name};
                opOption = {key: usersKey, type: Mongo.OP_TYPE.r, filter: nameFilter};
                findResult = await mongoOP(opOption);
                if (findResult) {
                    context.status = 201;
                    return context.message = 'name conflict';
                }
                try {
                    opOption = {key: usersKey, type: Mongo.OP_TYPE.c, postData: {...postData}};
                    const insertResult: any = await mongoOP(opOption);
                    context.session!.id = insertResult.insertedId;
                    return context.body = insertResult;
                } catch (error) {
                    if (error instanceof MongoServerError) {
                        console.log(`Error worth logging: ${error}`);
                    }
                    throw error;
                }
            case 'GET':
                opOption = {key: usersKey, type: Mongo.OP_TYPE.r, filter: idFilter};
                findResult = await mongoOP(opOption);
                if (findResult) {
                    return context.body = findResult;
                } else {
                    context.status = 204;
                    return context.message = 'no user found';
                }
            case 'PUT':
                break;
            case 'PATCH':
                break;
            case 'DELETE':
                break;
            default:
                return context.status = 405;
        }
    });

export default router;
// .post(['/'], async (context, next) => {
//     // query = 'INSERT INTO users (name, sex, age, phone, wechat) VALUES (<name>, <sex>, <age>, <phone>, <wechat>);';
//     const users = Mongo.collection(Mongo.COLLECTIONS_KEY.users);
//     const postData: any = await parsePostData(context);
//     const count = await users.find({name: postData.name}).count();
//     if (count) {
//         return context.body = {
//             acknowledged: false,
//             insertedId: "",
//             msg: 'name conflict'
//         };
//     }
//     try {
//         const insertResult = await users.insertOne({
//             _id: new ObjectId(),
//             ...postData,
//         });
//         context.session!.id = insertResult.insertedId;
//         context.body = insertResult;
//     } catch (error) {
//         if (error instanceof MongoServerError) {
//             console.log(`Error worth logging: ${error}`);
//         }
//         throw error;
//     }
// })
// .get(['/', '/:id'], async (context, next) => {
//     const users = Mongo.collection(Mongo.COLLECTIONS_KEY.users);
//     const id = context.params.id || context.session!.id;
//     if (id == 0) {
//         context.body = 'no id';
//     } else {
//         const uId = new ObjectId(id);
//         const findResult = await users.findOne({_id: uId});
//         context.body = findResult;
//     }
// })
// .put(['/', '/:id'], async (context, next) => {
//     logInfo(context);
//     const users = Mongo.collection(Mongo.COLLECTIONS_KEY.users);
//     const updateOneResult = await users.updateOne({b: 88}, {$set: {c: 88}});
// })
// .patch(['/', '/:id'], async (context, next) => {
//     logInfo(context);
//     const users = Mongo.collection(Mongo.COLLECTIONS_KEY.users);
//     const updateOneResult = await users.updateOne({b: 88}, {$set: {c: 88}});
// })
// .delete(['/', '/:id'], async (context, next) => {
//     logInfo(context);
//     const users = Mongo.collection(Mongo.COLLECTIONS_KEY.users);
//     const deleteResult = await users.deleteOne({b: 88});
// });
