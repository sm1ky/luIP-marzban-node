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
}

module.exports = { Utils };
