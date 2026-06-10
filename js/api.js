// js/api.js
// Fetch wrapper for the SyntraAid backend. Attaches Bearer token,
// parses the { success, data, message } response shape, auto-logout on 401.
const Api = {
  async request(method, path, body) {
    const headers = { "Content-Type": "application/json" };
    const token = window.Auth ? window.Auth.getToken() : null;
    if (token) headers["Authorization"] = "Bearer " + token;
    const opts = { method, headers };
    if (body !== undefined) opts.body = JSON.stringify(body);

    let res, json;
    try {
      res = await fetch(window.API_BASE + path, opts);
    } catch (e) {
      throw new Error("Cannot reach the server. Check the backend is running and the API URL in js/config.js is correct.");
    }
    try { json = await res.json(); } catch (e) { json = {}; }

    if (res.status === 401 && window.Auth) {
      window.Auth.logout();
      throw new Error("Your session has expired. Please log in again.");
    }
    if (!res.ok || json.success === false) {
      const err = new Error(json.message || ("Request failed (" + res.status + ")"));
      err.status = res.status; err.body = json;
      throw err;
    }
    return json;
  },
  get(p)        { return this.request("GET", p); },
  post(p, b)    { return this.request("POST", p, b); },
  put(p, b)     { return this.request("PUT", p, b); },
  patch(p, b)   { return this.request("PATCH", p, b); },
  del(p)        { return this.request("DELETE", p); },
};
window.Api = Api;
