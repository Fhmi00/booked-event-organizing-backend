const redis = require("redis");

const redisPassword = "LjR8gfpnHd1ScFkyv7dycfMeLh1uiuQa";
const redisHost = "redis-11026.c270.us-east-1-3.ec2.cloud.redislabs.com";
const redisPort = "11026";

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
