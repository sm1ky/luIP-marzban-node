const { default: axios } = require("axios");
const { Utils } = require("../modules");
require("dotenv").config();

const addr = new Utils().ProviderAddr({ apiPath: true });

const request = axios.create({
  baseURL: addr,
});

request.interceptors.response.use(
  (value) => {
    return value.data;
  },
  (err) => {
    console.error({
      method: err.request.method,
      path: err.request.path,
      error: err.response?.data?.error,
      data: err.config?.data,
    });

    return err;
  },
);

module.exports = request;
