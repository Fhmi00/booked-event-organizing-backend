const redis = require("redis");

const redisPassword = "OIrsuOwh3PQOSGimvTCFO7bKCbBla0pN";
const redisHost = "redis-10384.c262.us-east-1-3.ec2.cloud.redislabs.com";
const redisPort = "10384";

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
