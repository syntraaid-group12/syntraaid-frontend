// js/auth.js
// Session handling: token + user storage, role-based redirects, route guards.
const Auth = {
  setSession(token, user) {
    localStorage.setItem("syntraaid_token", token);
    localStorage.setItem("syntraaid_user", JSON.stringify(user));
  },
  getToken() { return localStorage.getItem("syntraaid_token"); },
  getUser() {
    const raw = localStorage.getItem("syntraaid_user");
    return raw ? JSON.parse(raw) : null;
  },
  isLoggedIn() { return !!this.getToken(); },
  logout() {
    localStorage.removeItem("syntraaid_token");
    localStorage.removeItem("syntraaid_user");
    window.location.href = "onboarding-login.html";
  },
  dashboardFor(role) {
    switch (role) {
      case "admin":       return "admin-dashboard.html";
      case "coordinator": return "coordinator-dashboard.html";
      case "volunteer":   return "volunteer.html";
      case "donor":       return "donor-dashboard.html";
      default:            return "onboarding-login.html";
    }
  },
  redirectToDashboard() {
    const u = this.getUser();
    if (u && u.role) window.location.href = this.dashboardFor(u.role);
  },
  requireRole(role) {
    const u = this.getUser();
    if (!this.isLoggedIn() || !u) { window.location.href = "onboarding-login.html"; return false; }
    if (role && u.role !== role) { window.location.href = this.dashboardFor(u.role); return false; }
    return true;
  },
};
window.Auth = Auth;
