import Router from "koa-router";
import {POOLS} from "../../../db/Pools";
import {Mongo} from "../../../db/Mongo";
import {logInfo} from "../../../Utils";

const router = new Router()
/**
 * e.g. http://localhost:3000/1/users/5?n=lonmee&sex=male&age=40
 */
router.all(['/', '/:id'],
    async (context, next) => {
        const {method} = context;
        const {id = 0} = context.params;
        let query = '';
        switch (method) {
            case 'GET':
                query = '';
                Mongo.op.r(context.params);
                break;
            case 'POST':
                await Mongo.op.c(context);
                break;
            // query = 'INSERT INTO users (name, sex, age, phone, wechat) VALUES (<name>, <sex>, <age>, <phone>, <wechat>);';
            case 'PUT':
                query = '';
                Mongo.op.u(context.params);
                logInfo(context);
                break;
            case 'DELETE':
                query = '';
                Mongo.op.d(context.params);
                logInfo(context);
                break;
            default:
                logInfo(context);
        }
        await next();
        // POOLS.USERS.getConnection((err, connection) => {
        //     connection.query(query, (error, results, fields) => {
        //         connection.release();
        //         if (error) throw error;
        //         for (const result of results) {
        //             console.log(result.name);
        //         }
        //     })
        // })
    },
    async (context, next) => {
    })

export default router;
