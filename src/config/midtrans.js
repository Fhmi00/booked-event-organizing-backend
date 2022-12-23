const midtransClient = require("midtrans-client");

const isProduction = false;
const serverKey = "SB-Mid-server-B_EQlO0rHr8GXxpZmozN58cr";
const clientKey = "SB-Mid-client-S3xIGSuvWdpvr-VZ";

const snap = new midtransClient.Snap({
  isProduction,
  serverKey,
  clientKey,
});

module.exports = snap;
