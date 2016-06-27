require('object.assign').shim();
var sha1 = require('sha1');
var request = require('request');

var defaultBaseUrl = 'http://www.salesmanago.pl/api/';
/*
 Very important fields
 Much data
 http://www.salesmanago.pl/api/
*/
function Client(opts) {
  var self = this;

  self.opts = opts || {};
  self.APIkey;
  self.clientId;
  self.APISecret;
  self.baseUrl = defaultBaseUrl;

  function useClientId (clientId) {
    if (!clientId || typeof clientId !== 'string') {
      return cb(new Error("You must provide a ClientId."));
    }

    self.clientId = clientId;
  }

  function useAPISecret (APISecret) {
    if (!APISecret || typeof APISecret !== 'string') {
      return cb(new Error("You must provide a APISecret."));
    }

    self.APISecret = APISecret;
  }

  function useAPIKey (APIkey) {
    if (!APIkey || typeof APIkey !== 'string') {
      return cb(new Error("You must provide a key."));
    }

    self.APIkey = APIkey;
  }

  function setBaseUrl(url) {
    self.baseUrl = url;
  }

  var contacts = {
    create: function (data, cb) {
      sendRequest({
        method: 'POST',
        url: self.baseUrl + 'contact/insert',
        body: data
      }, cb);
    }
  };

  function sendRequest (call, cb) {
    if (!self.clientId || !self.APIkey || !self.APISecret) {
      return cb(new Error("You need to provide ClientId or APIkey or APISecret"));
    }
    call.json = true
    call.body = call.body || {};
    call.headers = {};
    call.headers['Content-Type'] = "application/json;charset=UTF-8";
    call.headers['Accept'] = "application/json, application/json ";
    call.body["clientId"] = self.clientId;
    call.body["apiKey"] = self.APIkey;
    call.body["requestTime"] = new Date().getTime();
    call.body['sha'] = sha1(self.APIkey+self.clientId+self.APISecret);
    console.log(call);
    Object.assign(call, self.opts.request);

    r = request(call, handleResponse(cb));
    console.log("REQUEST");;
    console.log(r);
  }

  function handleResponse (cb) {
    return function (err, res, data) {
      if (err) return cb(err);
      if (typeof data === 'string') {
        try {
          var parsed = JSON.parse(data);
          data = parsed;
        } catch (e) {
          return cb(new Error(data)); // sometimes errors are returned as strings.
        }
      }
      return cb(null, data, res);
    }
  }

  return {
    contacts: contacts,
    useClientId: useClientId,
    useAPISecret: useAPISecret,
    useAPIKey: useAPIKey,
    setBaseUrl: setBaseUrl
  }
}

module.exports = Client;
