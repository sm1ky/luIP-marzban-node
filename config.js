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
    const addr = new Utils().ProviderAddr({ socketPath: true });

    /**
     *
     * @typedef {import("socket.io-client").Socket} SocketClient
     *
     * @type {SocketClient}
     */
    this.socket = io(addr, {
      query: {
        token: args.accessToken,
      },
    });
  }

  OnBanUser() {
    this.socket.on("banuser", (args) => {
      const data = JSON.parse(args);

      const utils = new Utils();

      utils.BanIP({
        ip: data.ip,
        expireAt: data.expireAt,
      });
    });
  }

  OnUnbanUsers() {
    this.socket.on("unbanusers", () => {
      const utils = new Utils();

      utils.UnbanIPs();
    });
  }
}

module.exports = Io;
