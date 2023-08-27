const fs = require("fs");
const { join } = require("path");

class Utils {
  /**
   * @param {ProviderAddr} options
   * @returns {string}
   */
  ProviderAddr(options = {}) {
    const address = process.env.PROVIDER_ADDR;
    const [ADDRESS, port] = address.split(":");

    let _address = address;

    if (+port === 443) _address = ADDRESS;

    if (options?.apiPath === true) _address += process.env.PROVIDER_API_PATH;
    else if (options?.socketPath === true)
      _address += process.env.PROVIDER_LISTEN_PATH;

    return _address;
  }

  RequiredFiles() {
    const paths = [
      {
        name: "blocked_ips.csv",
        def: "",
      },
      {
        name: "session.json",
        def: JSON.stringify({}),
      },
    ].map((item) => ({ ...item, name: join(__dirname, item.name) }));

    for (let i in paths) {
      const path = paths[i];

      if (fs.existsSync(path.name)) continue;

      fs.writeFileSync(path.name, path.def);
    }

    fs.writeFileSync();
  }

  ApiAuth() {
    const [username, password] = (process.env?.PROVIDER_API_LOGIN || "").split(
      ":",
    );

    return { username, password };
  }
}

module.exports = { Utils };
