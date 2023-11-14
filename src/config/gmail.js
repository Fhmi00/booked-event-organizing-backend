const { google } = require("googleapis");

const clientId =
  "435108553073-g2nonsqbiql6mvt6e5sdoicd9ggtdi2i.apps.googleusercontent.com";
const clientSecret = "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";
const refreshToken =
  "1//04d7T7AvromU9CgYIARAAGAQSNwF-L9IrppD3KvTLtaoNHZs1T_YitS8qnhk7umz3U208w5jNR36326MAawNNP2fQEt06AODmD1s";

const { OAuth2 } = google.auth;
const OAuth2Client = new OAuth2(clientId, clientSecret);
OAuth2Client.setCredentials({
  refresh_token: refreshToken,
});

const accessToken = OAuth2Client.getAccessToken;

module.exports = {
  clientId,
  clientSecret,
  accessToken,
  refreshToken,
};
