const { io } = require("socket.io-client");
const { Utils } = require("./modules");

class Io {
  /**
   * @typedef {Object} IoArgsType
   * @property {string} accessToken
   *
   * @param {IoArgsType} args
   */
  constructor(args) {
    const addr = new Utils().ProviderAddr();

    /**
     * @type {SocketClient}
     */
    this.socket = io(addr);
  }

  OnBanUser() {
    this.socket.on("banuser", () => {});
  }

  OnUnbanUser() {
    this.socket.on("unbanuser", () => {});
  }
}

module.exports = Io;
