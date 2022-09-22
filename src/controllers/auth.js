const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authModel = require("../models/auth");
const wrapper = require("../utils/wrapper");
const client = require("../config/redis");

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
      const { username, email, password } = request.body;

      const setData = {
        username,
        email,
        password: bcrypt.hashSync(password, 10), // UNTUK PASSWORD BISA DI ENKRIPSI
      };

      const result = await authModel.register(setData);
      const newResult = [{ userId: result.data[0].id }];

      return wrapper.response(
        response,
        result.status,
        "Success register",
        newResult
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
      // const refreshToken = jwt.sign(payload, process.env.REFRESH_KEYS, {
      //   expiresIn: "36h",
      // });
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
