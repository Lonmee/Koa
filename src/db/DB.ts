import ConnectionString from "mongodb-connection-string-url";
import {createPool} from "mysql";
import {MongoClient, MongoServerError, ObjectId} from "mongodb";

export const pools = {
    USERS_POOL: createPool({
        host: 'localhost',
        user: 'root',
        password: 'Lonmee',
        database: 'users',
    }),

    ST_POOL: createPool({
        host: 'localhost',
        user: 'root',
        password: 'Lonmee',
        database: 'st',
    })
};

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'koa';

async function main() {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('documents');
    try {
        /* insert one */
        // const insertResult = await collection.insertOne({_id: new ObjectId("123456654321")});
        // console.log('Inserted documents =>', insertResult);
    } catch (error) {
        if (error instanceof MongoServerError) {
            console.log(`Error worth logging: ${error}`);
        }
        throw error;
    }
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
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);
    /* find with query filter */
    // const filteredDocs = await collection.find({ a: 3 }).toArray();
    // console.log('Found documents filtered by { a: 3 } =>', filteredDocs);
    return 'done';
}

export function setupMongoDB() {
    main()
        .then(console.log)
        .catch(console.error)
        .finally(() => client.close());

    /**
     * format: "mongodb://user:password@localhost:27017/dbname"
     */
    const cs = new ConnectionString('mongodb://localhost:1234');
    cs.searchParams.set('readPreference', 'secondary');
    console.log(cs.href);
}

/**
 * promise using
 */
const client2 = new MongoClient(url);

export function setupMongoDB2() {
    return new Promise((resolve, reject) => {
        client2.connect()
            .then(() => {
                const db = client.db(dbName);
                const collection = db.collection('documents');
                resolve(collection)
            })
            .catch(reject);
    })
}
