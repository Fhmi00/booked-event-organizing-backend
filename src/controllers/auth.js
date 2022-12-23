const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const authModel = require("../models/auth");
const userModel = require("../models/user");
const wrapper = require("../utils/wrapper");
const client = require("../config/redis");
const { sendMail, sendMailToResetPassword } = require("../utils/mail");

module.exports = {
  showGreetings: async (request, response) => {
    try {
      // return response.status(200).send("Hello World!");
      return wrapper.response(
        response,
        200,
        "Success Get Greetings",
        "Hello World !"
      );
    } catch (error) {
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  register: async (request, response) => {
    try {
      const { username, email, password, confirmPassword } = request.body;

      if (password.length < 6) {
        return wrapper.response(
          response,
          400,
          "Password Minimum 6 Characters",
          null
        );
      }

      if (password !== confirmPassword) {
        return wrapper.response(response, 400, "Password Not Match", null);
      }
      const hash = bcrypt.hashSync(password, 10);

      const setData = {
        username,
        email,
        password: hash,
      };

      const checkEmail = await authModel.getUserByEmail(email);
      if (checkEmail.data.length > 0) {
        return wrapper.response(response, 403, "Email Alredy Registered", null);
      }

      const result = await authModel.register(setData);
      console.log(result);
      const newResult = [{ userId: result.data[0].id }];

      const OTP = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });

      client.setEx(`OTP:${OTP}`, 3600, OTP);
      client.setEx(`userId:${OTP}`, 3600 * 48, result.data[0].id);

      const setMailOptions = {
        to: email,
        name: username,
        subject: "Email Verification !",
        template: "verificationEmail.html",
        buttonUrl: `http://localhost:3001/api/auth/verify/${OTP}`,
        OTP,
      };

      await sendMail(setMailOptions);
      return wrapper.response(
        response,
        200,
        "Success Register Please Check Your Email",
        newResult
      );
    } catch (error) {
      console.log(error);
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  verify: async (request, response) => {
    try {
      const { OTP } = request.params;

      const userId = await client.get(`userId:${OTP}`);
      const cehckOTP = await client.get(`OTP:${OTP}`);
      if (!cehckOTP) {
        return wrapper.response(response, 400, "Wrong Input OTP", null);
      }

      const result = [{ userId }];

      const setStatus = {
        status: "active",
      };
      await userModel.updateUser(userId, setStatus);

      return wrapper.response(response, 200, "Verify Success ", result);
    } catch (error) {
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  login: async (request, response) => {
    try {
      const { email, password } = request.body;
      // console.log(password);

      const checkEmail = await authModel.getUserByEmail(email);
      if (checkEmail.data.length < 1) {
        return wrapper.response(response, 404, "Email Not Registed", null);
      }

      const checkPassword = await bcrypt
        .compare(password, checkEmail.data[0].password)
        .then((result) => result);
      // console.log(checkPassword);
      if (!checkPassword) {
        return wrapper.response(response, 400, "invalid password", null);
      }
      const payload = {
        userId: checkEmail.data[0].id,
        role: !checkEmail.data[0].role ? "user" : checkEmail.data[0].role,
      };
      console.log(payload);

      const token = jwt.sign(payload, "rahasia", {
        expiresIn: "24h",
      });
      // 4. PROSES REPON KE USER
      const newResult = {
        userId: payload.userId,
        token,
        // refreshToken,
      };
      return wrapper.response(response, 200, "Login Success", newResult);
    } catch (error) {
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
};
