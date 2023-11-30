const { google } = require("googleapis");

const clientId =
  "435108553073-g2nonsqbiql6mvt6e5sdoicd9ggtdi2i.apps.googleusercontent.com";
const clientSecret = "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";
const refreshToken =
  "1//04cJu6IrKayQcCgYIARAAGAQSNwF-L9IrzdgYqtNSvamP-Mr6d4-jasWy3WLK7s4xgC1x-DvNP_9jP6Bo3qZWnuNZ58QjiH_v2tg";

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
