const request = require("./config.api");
const { Utils } = require("../modules");

class Api {
  /**
   * @typedef {Object} GetAccessTokenReturn
   * @property {string} api_key
   *
   *
   * @typedef {Object} GetAccessTokenDataType
   * @property {string} username
   * @property {string} password
   *
   * @param {GetAccessTokenDataType} params
   *
   * @returns {GetAccessTokenReturn}
   */
  async GetAccessToken(params) {
    const ss = new Utils();

    console.log(ss.SessionApikeyExpired());

    if (ss.SessionApikeyExpired() === false)
      return { api_key: ss.GetSession()?.api?.key };

    const { data } = await request.post("/token", params);

    ss.SessionApikeyUpdate({
      key: data?.api_key,
      expireAt: +new Date() + 1000 * 60 * 59,
    });

    return data;
  }
}

module.exports = Api;
