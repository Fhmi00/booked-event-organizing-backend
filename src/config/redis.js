const redis = require("redis");

const redisPassword = "u0dWuJZtbl2DbTDhJA4M8bfmMqN8sULk";
const redisHost = "redis-11470.c326.us-east-1-3.ec2.cloud.redislabs.com";
const redisPort = "11470";

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
