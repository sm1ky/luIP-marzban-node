const Api = require("./api/api");
const Io = require("./config");
const { Utils } = require("./modules");
const nodeCron = require("node-cron");
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

  nodeCron.schedule(
    `*/${process.env?.UPDATE_API_KEY || 5} * * * *`,
    async () => {
      const data = await api.GetAccessToken(utils.ApiAuth());

      socket.api_key = data?.api_key;
    },
  );
})();
