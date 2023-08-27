const { default: axios } = require("axios");
const { Utils } = require("../modules");

const addr = new Utils().ProviderAddr({ apiPath: true });

const request = axios.create({
  baseURL: addr,
  headers: {
    accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

request.interceptors.response.use((value) => {
  return value.data;
});

module.exports = request;
