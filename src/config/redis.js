const redis = require("redis");
// require("dotenv").config();

const redisPassword = "Wfg5WGJGJKAvImG2gk7LwYtd2ISd5hGh";
const redisHost = "redis-10638.c261.us-east-1-4.ec2.redns.redis-cloud.com";
const redisPort = "10638";

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
    // console.log(redisHost);
    // console.log(redisPort);
  });
})();

module.exports = client;
