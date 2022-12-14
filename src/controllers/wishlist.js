const wishlistModel = require("../models/wishlist");
const wrapper = require("../utils/wrapper");
const client = require("../config/redis");

module.exports = {
  getAllWishlist: async (request, response) => {
    try {
      let { page, limit } = request.query;
      const { userId } = request.params;
      page = +page || 1;
      limit = +limit || 3;

      const totalData = await wishlistModel.getCountWishlist();

      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        page,
        totalPage,
        limit,
        totalData,
      };

      const offset = page * limit - limit;

      const result = await wishlistModel.getAllWishlist(offset, limit, userId);
      client.setEx(
        `getWishlist:${JSON.stringify(request.query)}`,
        3600,
        JSON.stringify({ result: result.data, pagination })
      );
      return wrapper.response(
        response,
        result.status,
        "Success Get User !",
        result.data,
        pagination
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
  getWishlistById: async (request, response) => {
    try {
      const { id } = request.params;

      const result = await wishlistModel.getWishlistById(id);

      if (result.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Wishlist By wishlistId ${id} Not Found`,
          []
        );
      }

      client.setEx(`getWishlist:${id}`, 3600, JSON.stringify(result.data));

      return wrapper.response(
        response,
        result.status,
        "Success Get Wishlist By Id",
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
  createWishlist: async (request, response) => {
    try {
      const { eventId, userId } = request.body;
      const setWishlist = {
        eventId,
        userId,
      };
      const checkEventId = await wishlistModel.getWishlistByEventId(
        eventId,
        userId
      );
      if (checkEventId.data.length > 0) {
        const id = checkEventId.data[0].wishlistId;
        const result = await wishlistModel.deleteWishlist(id);
        return wrapper.response(
          response,
          result.status,
          "Success Delete Wishlist !",
          result.data
        );
      }

      const result = await wishlistModel.createWishlist(setWishlist);
      return wrapper.response(
        response,
        result.status,
        "Success Create Wishlist",
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
  deleteWishlist: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await wishlistModel.deleteWishlist(id);

      if (result.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Data By Id ${id} Not Found`,
          []
        );
      }
      return wrapper.response(response, 200, "Success Delete Data", "[]");
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
