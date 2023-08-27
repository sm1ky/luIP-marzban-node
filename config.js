const { io } = require("socket.io-client");
const { Utils } = require("./modules");

class Io {
  constructor() {
    const addr = new Utils().ProviderAddr();

    /**
     * @type {SocketClient}
     */

    this.client = io(addr);



  }
}

module.exports = Io;
