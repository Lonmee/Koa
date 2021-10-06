import {Collection, MongoClient} from "mongodb";
import {DB_CONFIG} from "../Config";

const
    client = new MongoClient(DB_CONFIG.mongodb.url);

enum COLLECTIONS_KEY {
    users,
    foo,
}

enum OP_TYPE {
    c,
    cm,
    r,
    rm,
    u,
    um,
    d,
    dm,
    i,
}

interface MongoOP {
    key: COLLECTIONS_KEY;
    type: OP_TYPE;
    filter?: any;
    postData?: any;
}

const collections: Collection<Document>[] = [];

async function setup() {
    // async method
    await client.connect();
    const db = client.db(DB_CONFIG.mongodb.DB_KOA);
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

export function mongoOP({key, type, filter = {}, postData = {}}: MongoOP) {
    const col = collections[key];
    switch (type) {
        case OP_TYPE.c:
            return col.insertOne({...postData});
        case OP_TYPE.cm:
            return col.insertMany({...postData});
        case OP_TYPE.r:
            return col.findOne(filter);
        case OP_TYPE.rm:
            return col.find(filter);
        case OP_TYPE.u:
            return col.updateOne(filter, {$set: {...postData}});
        case OP_TYPE.um:
            return col.updateMany(filter, {$set: {...postData}});
        case OP_TYPE.d:
            return col.deleteOne(filter);
        case OP_TYPE.dm:
            return col.deleteMany(filter);
        case OP_TYPE.i:
            return col.createIndex(filter);
            break;
    }
}

export const Mongo = {COLLECTIONS_KEY, OP_TYPE, setup}