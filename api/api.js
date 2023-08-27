const request = require("./config.api");

class Api {
  /**
   *
   * @typedef {Object} GetAccessTokenDataType
   * @property {string} username
   * @property {string} password
   *
   * @param {GetAccessTokenDataType} params
   */
  async GetAccessToken(params) {
    const { data } = await request.post("/token", params);

    return data;
  }
}

module.exports = Api;
