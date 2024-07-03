const redis = require("redis");
// require("dotenv").config();

const redisPassword = "AUIy6RsY3v4orDjN9RuZ52mMZtfUSSbf";
const redisHost = "redis-16520.c245.us-east-1-3.ec2.redns.redis-cloud.com";
const redisPort = "16520";

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
