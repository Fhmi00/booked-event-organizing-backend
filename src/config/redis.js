const redis = require("redis");

const redisPassword = "Ym8e7y7tbCdtlaFRQGv4E7YFDXUgRRFo";
const redisHost = "redis-10306.c274.us-east-1-3.ec2.cloud.redislabs.com";
const redisPort = "10306";

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
