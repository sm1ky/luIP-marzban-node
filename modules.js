const { spawn } = require("child_process");
const { join } = require("path");

const fs = require("fs");

class Utils {
  /**
   * @typedef {Object} ProviderAddr
   * @property {boolean} apiPath
   * @property {boolean} socketPath
   *
   * @param {ProviderAddr} options
   * @returns {string}
   */
  ProviderAddr(options = {}) {
    const address = process.env.PROVIDER_ADDR;
    const [ADDRESS, port] = address.split(":");

    let _address = address;

    if (+port === 443) _address = ADDRESS;

    if (options?.apiPath === true) _address += process.env.PROVIDER_API_PATH;
    if (options?.socketPath === true)
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
  }

  ApiAuth() {
    const [username, password] = (process.env?.PROVIDER_API_LOGIN || "").split(
      ":",
    );

    return { username, password };
  }

  /**
   *
   * @typedef {Object} BanIPDataType
   * @property {string} ip
   * @property {string} expireAt
   *
   * @param {BanIPDataType} params
   */
  BanIP(params) {
    const scriptPath = "./ipban.sh";
    const args = [scriptPath, params.ip, `${params.expireAt}`];

    const childProcess = spawn("bash", args);

    childProcess.on("close", (code) => {
      if (code === 0) {
        console.log(`IP ${ip} banned successfully.`);
      } else {
        console.error(`Failed to ban IP ${ip}.`);
      }
    });
  }

  UnbanIPs() {
    exec("bash ./ipunban.sh", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing ipunban.sh: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`ipunban.sh stderr: ${stderr}`);
        return;
      }
    });
  }

  /**
   * @typedef {Object} SessionApikeyType
   * @property {string} key
   * @property {number} expireAt
   *
   * @typedef {Object} SessionType
   * @property {SessionApikeyType} api
   *
   * @returns {SessionType}
   */
  GetSession() {
    const data = fs.readFileSync(join(__dirname, "session.json"));

    return JSON.parse(data);
  }

  /**
   * @returns {boolean}
   */
  SessionApikeyExpired() {
    const session = this.GetSession();

    if (session?.api?.expireAt && Date.now() < session?.api?.expireAt)
      return false;

    return true;
  }

  /**
   * @param {SessionApikeyType} params
   */
  SessionApikeyUpdate(params) {
    const session = this.GetSession();

    session.api = params;

    fs.writeFileSync(join(__dirname, "session.json"), JSON.stringify(session));

    return;
  }
}

module.exports = { Utils };
