/* eslint-disable prefer-destructuring */
const eventModel = require("../models/event");
const wrapper = require("../utils/wrapper");
const client = require("../config/redis");
const cloudinary = require("../config/cloudinary");

module.exports = {
  getAllEvent: async (request, response) => {
    try {
      //   console.log(request.query);
      // eslint-disable-next-line prefer-const
      let { page, limit, sort, searchDateShow, searchName } = request.query;
      page = +page;
      limit = +limit;

      const totalData = await eventModel.getCountEvent();
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        page,
        totalPage,
        limit,
        totalData,
      };

      const offset = page * limit - limit;

      let sortColumn = "dateTimeShow";
      let sortType = "asc";
      if (sort) {
        sortColumn = sort.split(" ")[0];
        sortType = sort.split(" ")[1];
      }
      if (sortType.toLowerCase() === "asc") {
        sortType = true;
      } else {
        sortType = false;
      }

      let day;
      let nextDay;
      if (searchDateShow) {
        day = new Date(searchDateShow);
        nextDay = new Date(new Date(day).setDate(day.getDate() + 1));
      }

      const result = await eventModel.getAllEvent(
        offset,
        limit,
        sortColumn,
        sortType,
        searchName,
        day,
        nextDay
      );

      client.setEx(
        `getProduct:${JSON.stringify(request.query)}`,
        3600,
        JSON.stringify({ result: result.data, pagination })
      );

      return wrapper.response(
        response,
        result.status,
        "Success Get Data !",
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
  getEventById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await eventModel.getEventById(id);

      if (result.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Data By Id ${id} Not Found`,
          []
        );
      }

      return wrapper.response(
        response,
        result.status,
        "Success Get Data By Id",
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
  createEvent: async (request, response) => {
    try {
      // console.log(request.body);
      const { name, category, location, detail, dateTimeShow, price } =
        request.body;

      let setData = {
        name,
        category,
        location,
        detail,
        dateTimeShow,
        price,
      };
      if (request.file) {
        const { filename } = request.file;
        setData = { ...setData, image: filename || "" };
      }
      const result = await eventModel.createEvent(setData);

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
  updateEvent: async (request, response) => {
    try {
      // console.log(request.params);
      // console.log(request.body);
      const { id } = request.params;
      const { name, category, location, detail, price } = request.body;

      const checkId = await eventModel.getEventById(id);

      if (checkId.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Data By Id ${id} Not Found`,
          []
        );
      }

      let image;

      if (request.file) {
        const { filename } = request.file;
        image = filename;
        cloudinary.uploader.destroy(checkId.data[0].image, () => {
          // console.log(result);
        });
      }

      // console.log(checkId.data[0].image);

      const setData = {
        name,
        category,
        location,
        detail,
        price,
        image,
      };

      const result = await eventModel.updateEvent(id, setData);

      return wrapper.response(
        response,
        result.status,
        "Success Update Data",
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
  deleteEvent: async (request, response) => {
    try {
      // 1. ngecek apakah idnya itu ada atau tidak ?
      // 1.a. jika tidak ada maka akan mengembalikan id tidak ada di database
      // 1.b. jika ada maka akan menjalankan proses delete
      const { id } = request.params;
      const checkId = await eventModel.getEventById(id);

      if (checkId.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Data By Id ${id} Not Found`,
          []
        );
      }
      cloudinary.uploader.destroy(checkId.data[0].image, (result) => {
        console.log(result);
      });

      const result = await eventModel.deleteEvent(id);
      return wrapper.response(
        response,
        200,
        "Success Delete Data",
        result.data
      );
    } catch (error) {
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      console.log(error);
      return wrapper.response(response, status, statusText, errorData);
    }
  },
};
