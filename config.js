const { io } = require("socket.io-client");
const { Utils } = require("./modules");

class Io {
  /**
   * @typedef {Object} IoArgsType
   * @property {string} api_key
   *
   * @param {IoArgsType} args
   */
  constructor(args) {
    const addr = new Utils().ProviderAddr({ apiPath: false, socketPath: true });

    this.api_key = args.api_key;

    /**
     *
     * @typedef {import("socket.io-client").Socket} SocketClient
     *
     * @type {SocketClient}
     */
    this.socket = io(addr, {
      query: {
        api_key: this.api_key,
      },
      retries: 60,
    });
  }

  OnBanUser() {
    this.socket.on("user:ip:ban", (args) => {
      const data = JSON.parse(args);

      const utils = new Utils();

      utils.BanIP({
        ip: data.ip,
        expireAt: data.expireAt,
      });
    });
  }

  OnUnbanUsers() {
    this.socket.on("user:ip:unban", () => {
      const utils = new Utils();

      utils.UnbanIPs();
    });
  }
}

module.exports = Io;
