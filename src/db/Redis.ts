import IORedis from "ioredis";

/* publish test */
const
    redis = new IORedis(),
    publisher = new IORedis(),
    subscriber = new IORedis();

/**
 * publisher
 */
function publish() {
    setInterval(() => {
        const message = {foo: Math.random()};
        // Publish to my-channel-1 or my-channel-2 randomly.
        const channel = `my-channel-${1 + Math.round(Math.random())}`;

        // Message can be either a string or a buffer
        publisher
            .publish(channel, JSON.stringify(message))
            .then(/*console.log*/);
        console.log("Published %s to %s", message, channel);
    }, 1000);
}

/**
 * subscriber
 */
function subscribe() {
    subscriber.subscribe("my-channel-1", "my-channel-2", (err, count) => {
        if (err) {
            // Just like other commands, subscribe() can fail for some reasons,
            // ex network issues.
            console.error("Failed to subscribe: %s", err.message);
        } else {
            // `count` represents the number of channels this client are currently subscribed to.
            console.log(
                `Subscribed successfully! This client is currently subscribed to ${count} channels.`
            );
        }
    });

    subscriber.on("message", (channel, message) => {
        console.log(`Received ${message} from ${channel}`);
    });

    /**
     * There's also an event called 'messageBuffer', which is the same as 'message'
     * it returns buffers instead of strings.
     * It's useful when the messages are binary data.
     */
    subscriber.on("messageBuffer", (channel, message) => {
        // Both `channel` and `message` are buffers.
        console.log(channel, message);
    });
}

function publishTest() {
    publish();
    subscribe();
}

/* stream test */
const
    streamRedis = new IORedis(),
    processMessage = (message: any) => {
        console.log("Id: %s. Data: %O", message[0], message[1]);
    };

async function listenForMessage(lastId = "$") {
    // `results` is an array, each element of which corresponds to a key.
    // Because we only listen to one key (mystream) here, `results` only contains
    // a single element. See more: https://redis.io/commands/xread#return-value
    const results = await streamRedis.xread("block", 0, "STREAMS", "mystream", lastId);
    const [key, messages] = results[0]; // `key` equals to "mystream"

    messages.forEach(processMessage);

    // Pass the last id of the results to the next round.
    await listenForMessage(messages[messages.length - 1][0]);
}

function streamTest() {
    listenForMessage()
        .then(console.log)
        .catch(console.error);
}

export const Redis = {publishTest, streamTest}
export default redis;
