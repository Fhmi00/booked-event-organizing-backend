const nodemailer = require("nodemailer");
const fs = require("fs");
const mustache = require("mustache");
const gmail = require("../config/gmail");

module.exports = {
  sendMail: (data) =>
    new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "ifahmi5555@gmail.com",
          clientId: gmail.clientId,
          clientSecret: gmail.clientSecret,
          refreshToken: gmail.refreshToken,
          accessToken: gmail.accessToken,
        },
      });

      const fileTemplate = fs.readFileSync(
        `src/templates/${data.template}`,
        "utf8"
      );
      const mailOptions = {
        from: '"Event Organizing" <ifahmi5555@gmail.com>',
        to: data.to,
        subject: data.subject,
        html: mustache.render(fileTemplate, { ...data }),
      };

      transporter.sendMail(mailOptions, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    }),
  sendMailToResetPassword: (data) =>
    new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "ifahmi5555@gmail.com",
          clientId: gmail.clientId,
          clientSecret: gmail.clientSecret,
          refreshToken: gmail.refreshToken,
          accessToken: gmail.accessToken,
        },
      });

      const fileTemplate = fs.readFileSync(
        `src/templates/${data.template}`,
        "utf8"
      );
      const mailOptions = {
        from: '"Event Organizing" <ifahmi5555@gmail.com>',
        to: data.to,
        subject: data.subject,
        html: mustache.render(fileTemplate, { ...data }),
      };

      transporter.sendMail(mailOptions, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    }),
};
