const userModel = require("../models/user");
const wrapper = require("../utils/wrapper");
const cloudinary = require("../config/cloudinary");

module.exports = {
  getAllUser: async (request, response) => {
    try {
      // console.log(request.query);
      const result = await userModel.getAllUser();
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
  createUser: async (request, response) => {
    try {
      // console.log(request.body);
      const {
        name,
        username,
        gender,
        profession,
        nationality,
        dateOfBirth,
        email,
        password,
      } = request.body;
      let setData = {
        name,
        username,
        gender,
        profession,
        nationality,
        dateOfBirth,
        email,
        password,
      };
      if (request.file) {
        const { filename } = request.file;
        setData = { ...setData, image: filename || "" };
      }

      const result = await userModel.createUser(setData);

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
  getUserById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await userModel.getUserById(id);

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
  updateUser: async (request, response) => {
    try {
      const { id } = request.params;

      const {
        name,
        username,
        gender,
        profession,
        nationality,
        dateOfBirth,
        phoneNumber,
        role,
      } = request.body;
      const checkId = await userModel.getUserById(id);
      if (checkId.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Update By Id ${id} Not Found`,
          []
        );
      }
      let image;
      if (request.file) {
        const { filename, mimetype } = request.file;
        image = filename ? `${filename}.${mimetype.split("/")[1]}` : "";
        // PROSES DELETE FILE DI CLOUDINARY
        cloudinary.uploader.destroy(image, (result) => result);
      }
      let status;
      const setData = {
        name,
        username,
        gender,
        profession,
        nationality,
        dateOfBirth,
        phoneNumber,
        role,
        image,
        status,
      };

      const result = await userModel.updateUser(id, setData);

      return wrapper.response(
        response,
        result.status,
        "Success Update Data",
        result.data
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
  deleteUser: async (request, response) => {
    try {
      // 1. ngecek apakah idnya itu ada atau tidak ?
      // 1.a. jika tidak ada maka akan mengembalikan id tidak ada di database
      // 1.b. jika ada maka akan menjalankan proses delete
      const { id } = request.params;
      const result = await userModel.deleteUser(id);

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
  updateImage: async (request, response) => {
    try {
      const { id } = request.params;
      const checkId = await userModel.getUserById(id);
      if (checkId.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Update By Id ${id} Not Found`,
          []
        );
      }

      console.log(id);

      let image;
      if (request.file) {
        const { filename, mimetype } = request.file;
        image = filename ? `${filename}.${mimetype.split("/")[1]}` : "";

        // PROSES DELETE FILE DI CLOUDINARY
        if (checkId.data[0].image) {
          cloudinary.uploader.destroy(
            checkId.data[0].image.split(".")[0],
            (result) => result
          );
        }
      }
      if (!request.file) {
        return wrapper.response(response, 404, "Image Must Be Filled");
      }

      const setData = {
        image,
      };
      const result = await userModel.updateUser(id, setData);
      const newResult = [
        {
          userId: result.data[0].id,
          image: result.data[0].image,
          createdAt: result.data[0].createdAt,
          updatedAt: result.data[0].updatedAt,
        },
      ];
      return wrapper.response(
        response,
        result.status,
        "Success Update Image",
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
};
