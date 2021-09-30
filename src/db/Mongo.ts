import {Collection, MongoClient} from "mongodb";
import {DB_CONFIG} from "../Config";

const
    client = new MongoClient(DB_CONFIG.mongodb.url);

enum COLLECTIONS_KEY {
    users,
    foo,
}

const collections: Collection<Document>[] = [];

async function setup() {
    // async method
    await client.connect();
    const db = client.db(DB_CONFIG.mongodb.dbName);
    collections[COLLECTIONS_KEY.users] = db.collection(COLLECTIONS_KEY[COLLECTIONS_KEY.users]);
    collections[COLLECTIONS_KEY.foo] = db.collection(COLLECTIONS_KEY[COLLECTIONS_KEY.foo]);
    return 'mongodb server connected';

    // promise method
    // return new Promise((resolve, reject) => {
    //     client.connect()
    //         .then(client => {
    //             const db = client.db(DB_CONFIG.mongodb.dbName);
    //             collections[COLLECTIONS_KEY.users] = db.collection(COLLECTIONS_KEY[COLLECTIONS_KEY.users]);
    //             collections[COLLECTIONS_KEY.foo] = db.collection(COLLECTIONS_KEY[COLLECTIONS_KEY.foo]);
    //             resolve('mongodb server connected');
    //         })
    //         .catch(reject);
    // })
}

export const Mongo = {COLLECTIONS_KEY, collections, setup}

/**
 * format: "mongodb://user:password@localhost:27017/dbname"
 */
// const cs = new ConnectionString('mongodb://localhost:1234');
// cs.searchParams.set('readPreference', 'secondary');
// console.log(cs.href);

/**
 * promise using
 */
// const client2 = new MongoClient(url);
//
// export function setupMongoDB2() {
//     return new Promise((resolve, reject) => {
//         client2.connect()
//             .then(() => {
//                 const db = client.db(dbName);
//                 const collection = db.collection('documents');
//                 resolve(collection)
//             })
//             .catch(reject);
//     })
// }

// setupMongoDB2()
//     .then(console.log)
//     .catch(console.error);

/**
 * op
 */
// try {
//     /* insert one */
//     // const insertResult = await collection.insertOne({_id: new ObjectId("123456654321")});
//     // console.log('Inserted documents =>', insertResult);
// } catch (error) {
//     if (error instanceof MongoServerError) {
//         console.log(`Error worth logging: ${error}`);
//     }
//     throw error;
// }
/* insert many */
// const insertResult = await collection.insertMany([{a: 1}, {a: 2}, {a: 3}]);
// console.log('Inserted documents =>', insertResult);
/* update one */
// const updateOneResult = await collection.updateOne({b: 88}, {$set: {c: 88}});
// console.log('Updated documents =>', updateOneResult);
/* update many */
// const updateManyResult = await collection.updateMany({b: 2}, {$set: {b: 88}});
// console.log('Updated documents =>', updateManyResult);
/* delete */
// const deleteResult = await collection.deleteMany({b: 88});
// console.log('Deleted documents =>', deleteResult);
/* index */
// const indexName = await collection.createIndex({a: 1});
// console.log('index name =', indexName);
/* find all */
// const findResult = await collection.find({}).toArray();
// console.log('Found documents =>', findResult);
/* find with query filter */
// const filteredDocs = await collection.find({ a: 3 }).toArray();
// console.log('Found documents filtered by { a: 3 } =>', filteredDocs);
