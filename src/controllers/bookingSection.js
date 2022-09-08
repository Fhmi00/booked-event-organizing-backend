const bookingSectionModel = require("../models/bookingSection");
const wrapper = require("../utils/wrapper");

module.exports = {
  createBookingSection: async (request, response) => {
    try {
      // console.log(request.body);
      const { bookingId, section, statusUsed } = request.body;
      const setData = {
        bookingId,
        section,
        statusUsed,
      };

      const result = await bookingSectionModel.createBookingSection(setData);

      return wrapper.response(
        response,
        result.status,
        "Success Create Data",
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
