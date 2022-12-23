const redis = require("redis");

const redisPassword = "RP7EGksTyEc7J8VQVMcTtQWSKAFhXvPK";
const redisHost = "redis-11697.c10.us-east-1-3.ec2.cloud.redislabs.com";
const redisPort = "11697";

const client = redis.createClient({
  socket: {
    host: redisHost,
    port: redisPort,
  },
  password: redisPassword,
});

(async () => {
  client.connect();
  client.on("connect", () => {
    // eslint-disable-next-line no-console
    console.log("You're connected db redis ...");
  });
})();

module.exports = client;
