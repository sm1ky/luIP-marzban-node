const Api = require("./api/api");
const Io = require("./config");
const { Utils } = require("./modules");
require("dotenv").config();

const utils = new Utils();

utils.RequiredFiles();

(async () => {
  const api = new Api();

  const data = await api.GetAccessToken(utils.ApiAuth());

  const socket = new Io({
    api_key: data?.api_key,
  });

  socket.OnBanUser();
  socket.OnUnbanUsers();
})();
