import Router from "koa-router";
import {POOLS} from "../../../db/Pools";
import {Mongo} from "../../../db/Mongo";

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
            case 'POST':
                Mongo.op.c(context.params);
                break;
            // query = 'INSERT INTO users (name, sex, age, phone, wechat) VALUES (<name>, <sex>, <age>, <phone>, <wechat>);';
            case 'PUT':
                query = '';
                Mongo.op.u(context.params);
            case 'DELETE':
                query = '';
                Mongo.op.d(context.params);
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
        context.body = 'here we go users api';
    })

export default router;
