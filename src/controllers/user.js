const userModel = require("../models/user");
const wrapper = require("../utils/wrapper");

module.exports = {
  getAllUser: async (request, response) => {
    try {
      console.log(request.query);
      const result = await userModel.getAllProduct();
      return wrapper.response(
        response,
        result.status,
        "Success Get Data !",
        result.data
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
};
