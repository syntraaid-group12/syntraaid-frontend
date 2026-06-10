// js/layout.js
// Renders the shared dashboard shell (sidebar + header) so every role screen
// inherits the exact same responsive layout. Change it once, every page updates.
//
// Usage in a dashboard page:
//   <div id="app"></div>
//   <script src="js/config.js"></script><script src="js/auth.js"></script>
//   <script src="js/api.js"></script><script src="js/layout.js"></script>
//   <script>
//     Layout.render({ role:"admin", active:"dashboard", title:"Dashboard",
//                     subtitle:"Welcome back", content: `...page html...` });
//   </script>
//
// The shell matches the approved admin dashboard exactly (colors, spacing,
// mobile drawer). Nav items are per-role and contain ONLY sections that exist
// in the backend (no Teams, no Messages).

(function () {
  const ICON = {
    dashboard: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    projects: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
    volunteers: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    attendance: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 12h6m-6 4h6',
    reports: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    donors: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    transparency: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    tasks: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
    profile: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    settings: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  };

  // Per-role navigation. Only sections backed by real endpoints.
  const NAV = {
    admin: [
      { id: 'dashboard',    label: 'Dashboard',    href: 'admin-dashboard.html',   icon: 'dashboard' },
      { id: 'projects',     label: 'Projects',      href: 'admin-projects.html',    icon: 'projects' },
      { id: 'volunteers',   label: 'Volunteers',    href: 'admin-volunteers.html',  icon: 'volunteers' },
      { id: 'attendance',   label: 'Attendance',    href: 'admin-attendance.html',  icon: 'attendance' },
      { id: 'reports',      label: 'Reports',       href: 'admin-reports.html',     icon: 'reports' },
      { id: 'transparency', label: 'Transparency',  href: 'admin-transparency.html',icon: 'transparency' },
      { id: 'donors',       label: 'Donors',        href: 'admin-donors.html',      icon: 'donors' },
      { id: 'settings',     label: 'Settings',      href: 'admin-settings.html',    icon: 'settings' },
    ],
    coordinator: [
      { id: 'dashboard',  label: 'Dashboard',  href: 'coordinator-dashboard.html', icon: 'dashboard' },
      { id: 'projects',   label: 'Projects',   href: 'coordinator-projects.html',  icon: 'projects' },
      { id: 'volunteers', label: 'Volunteers', href: 'coordinator-volunteers.html',icon: 'volunteers' },
      { id: 'attendance', label: 'Attendance', href: 'coordinator-attendance.html',icon: 'attendance' },
    ],
    volunteer: [
      { id: 'dashboard',  label: 'Dashboard',  href: 'volunteer.html',                 icon: 'dashboard' },
      { id: 'tasks',      label: 'My Tasks',   href: 'volunteer-tasks.html',           icon: 'tasks' },
      { id: 'attendance', label: 'Attendance', href: 'volunteer-attendance.html',      icon: 'attendance' },
      { id: 'profile',    label: 'My Profile', href: 'volunteer-profile.html',         icon: 'profile' },
    ],
    donor: [
      { id: 'dashboard', label: 'Dashboard', href: 'donor-dashboard.html', icon: 'dashboard' },
      { id: 'projects',  label: 'Projects',  href: 'donor-projects.html',  icon: 'projects' },
    ],
  };

  function navItem(item, active) {
    const isActive = item.id === active;
    const cls = isActive
      ? 'flex items-center gap-3 px-3 py-2.5 rounded-xl bg-brand-lightgreen text-brand-green font-[600] text-[13px]'
      : 'flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 font-[500] text-[13px] transition-colors';
    return `
      <a href="${item.href}" class="${cls}">
        <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${ICON[item.icon]}"></path>
        </svg>
        ${item.label}
      </a>`;
  }

  const Layout = {
    render(opts) {
      const { role, active, title, subtitle = '', content = '', roleLabel } = opts;

      // Guard: must be logged in as this role
      if (window.Auth && !window.Auth.requireRole(role)) return;

      const user = (window.Auth && window.Auth.getUser()) || {};
      const items = NAV[role] || [];
      const navHtml = items.map(i => navItem(i, active)).join('');
      const prettyRole = roleLabel || (role.charAt(0).toUpperCase() + role.slice(1));

      const shell = `
      <div class="flex h-screen overflow-hidden">
        <div id="sidebar-overlay" class="fixed inset-0 bg-black/40 z-40 hidden lg:hidden"></div>

        <aside id="sidebar"
          class="fixed lg:static z-50 w-[210px] shrink-0 bg-white border-r border-gray-100 flex flex-col h-full overflow-y-auto transform -translate-x-full lg:translate-x-0 transition-transform duration-200 ease-in-out">
          <div class="px-5 pt-5 pb-4">
            <div class="flex items-center gap-2">
              <img src="./images/logo.png" alt="SyntraAid Logo" class="h-8 w-auto object-contain" onerror="this.style.display='none'">
              <span class="text-[16px] font-[800] text-gray-900 tracking-tight">Syntra<span class="text-brand-green">Aid</span></span>
            </div>
          </div>
          <nav class="flex-1 px-3 mt-2 space-y-0.5">${navHtml}</nav>
          <div class="px-3 pb-5 mt-auto">
            <div class="border-t border-gray-200 my-4"></div>
            <a href="#" id="nav-logout"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 font-[500] text-[13px] transition-colors">
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Log Out
            </a>
          </div>
        </aside>

        <div class="flex-1 flex flex-col overflow-hidden min-w-0">
          <header class="bg-white border-b border-gray-100 px-4 sm:px-6 py-3 flex items-center gap-4 shrink-0">
            <button id="sidebar-toggle" aria-label="Toggle sidebar" class="lg:hidden text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <div class="relative flex-1 max-w-md">
              <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </span>
              <input type="search" placeholder="Search for"
                class="w-full pl-10 pr-4 py-2 rounded-full bg-gray-50 border border-gray-100 text-[13px] focus:outline-none focus:ring-1 focus:ring-brand-green">
            </div>
            <div class="flex items-center gap-3 shrink-0">
              <span class="hidden sm:block text-[12px] text-gray-500" id="layout-date"></span>
              <button aria-label="Notifications" class="relative text-gray-500 hover:text-gray-700">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
              </button>
              <div class="w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center text-[12px] font-[700]" title="${user.email || ''}">
                ${prettyRole.charAt(0)}
              </div>
            </div>
          </header>

          <main class="flex-1 overflow-y-auto px-4 sm:px-6 py-5 bg-[#f8f9fa]">
            <div class="mb-5">
              <h1 class="text-[22px] sm:text-[24px] font-[800] text-gray-900 leading-tight">${title}</h1>
              ${subtitle ? `<p class="text-[13px] text-gray-500 font-[500] mt-0.5">${subtitle}</p>` : ''}
            </div>
            <div id="page-content">${content}</div>
          </main>
        </div>
      </div>`;

      const root = document.getElementById('app');
      root.innerHTML = shell;

      // Wire mobile drawer
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('sidebar-overlay');
      const toggle = document.getElementById('sidebar-toggle');
      function openNav() { sidebar.classList.remove('-translate-x-full'); overlay.classList.remove('hidden'); }
      function closeNav() { sidebar.classList.add('-translate-x-full'); overlay.classList.add('hidden'); }
      if (toggle) toggle.addEventListener('click', () => {
        if (sidebar.classList.contains('-translate-x-full')) openNav(); else closeNav();
      });
      if (overlay) overlay.addEventListener('click', closeNav);

      // Logout
      const logout = document.getElementById('nav-logout');
      if (logout) logout.addEventListener('click', (e) => { e.preventDefault(); window.Auth.logout(); });

      // Date in header
      const dateEl = document.getElementById('layout-date');
      if (dateEl) {
        const d = new Date();
        dateEl.textContent = d.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
      }
    },

    // Small helpers pages can use
    el(id) { return document.getElementById(id); },
    esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); },
  };

  window.Layout = Layout;
})();
