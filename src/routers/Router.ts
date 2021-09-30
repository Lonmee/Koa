// POOLS.USERS.getConnection((err, connection) => {
//     connection.query(query, (error, results, fields) => {
//         connection.release();
//         if (error) throw error;
//         for (const result of results) {
//             console.log(result.name);
//         }
//     })
// })

/* redis usage */
// Redis
//     .publishTest();
//
// Redis
//     .streamTest();
//
// redis
//     .set('user', 'Lonmee')
//     .then(console.log)
//     .catch(console.error);
//
// redis
//     .get('user')
//     .then(console.log)
//     .catch(console.error);
//
// redis
//     .zadd("sortedSet", 1, "one", 2, "dos", 4, "quatro", 3, "three");
// redis
//     .zrange("sortedSet", 0, 3, "WITHSCORES")
//     .then(console.log);
//
// redis.set("key", 100, "EX", 10);