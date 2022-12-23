const { google } = require("googleapis");

const clientId =
  "1071820962566-5gftglffuib3vvi2j1eqmqb292ccbu0l.apps.googleusercontent.com";
const clientSecret = "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";
const refreshToken =
  "1//04J7gtTb7BdrvCgYIARAAGAQSNwF-L9IrXHauthwuWWYFrsVLotlmqKm3Zha_aD0248LccCRmbaPJ1Z-mK--GMrfPYovee1Zlvrw";

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
