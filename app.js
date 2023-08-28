const Api = require("./api/api");
const Io = require("./config");
const { Utils } = require("./modules");
require("dotenv").config();

const utils = new Utils();

utils.RequiredFiles();

(async () => {
  const api = new Api();

  const { access_token: accessToken } = await api.GetAccessToken(
    utils.ApiAuth(),
  );

  const socket = new Io({
    accessToken,
  });

  socket.OnBanUser();
  socket.OnUnbanUsers();
})();
