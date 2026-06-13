// js/public.js
// Shared behaviour for the PUBLIC marketing pages (home, about, features, contact, privacy).
// 1) Builds + wires the mobile hamburger menu (the header button had no menu and no handler).
// 2) Turns dead footer links (href="#") into popups, matching the Terms/Donate modal style.
// 3) Makes any [data-donate] link open the donate modal if present, else go to home.
// Add to each public page right before </body>:  <script src="js/public.js"></script>

(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  // Main nav shown in the mobile drawer (same links as the desktop nav).
  var LINKS = [
    { label: 'Home', href: 'home.html' },
    { label: 'About', href: 'about.html' },
    { label: 'Features', href: 'features.html' },
    { label: 'Contact', href: 'contact.html' },
    { label: 'Donate', href: '#', donate: true },
    { label: 'Login', href: 'onboarding-login.html' },
    { label: 'Get Started', href: 'onboarding-intro.html', cta: true },
  ];

  // Content for footer links that have no page yet. Edit freely.
  var INFO = {
    'how it works': { title: 'How It Works', body: 'SyntraAid brings NGOs, coordinators, volunteers, and donors onto one platform. Admins create projects and tasks, coordinators assign volunteers, volunteers log their hours, and donors follow the impact in real time.' },
    'testimonials': { title: 'Testimonials', body: 'Stories from the organisations and volunteers using SyntraAid are coming soon.' },
    'resources': { title: 'Resources', body: 'Guides and resources for getting the most out of SyntraAid are on the way.' },
    'faqs': { title: 'FAQs', body: 'Frequently asked questions will be published here shortly. In the meantime, reach us through the Contact page.' },
    'terms of service': { title: 'Terms of Service', body: 'By using SyntraAid you agree to use the platform responsibly and lawfully. The full terms of service will be published before public launch.' },
  };

  ready(function () {
    buildMobileMenu();
    wireFooterPopups();
    wireDonate();
  });

  function buildMobileMenu() {
    var header = document.querySelector('header');
    if (!header) return;
    var btn = header.querySelector('button.md\\:hidden') || header.querySelector('button');
    if (!btn || document.getElementById('mobileMenu')) return;

    var overlay = document.createElement('div');
    overlay.id = 'mobileMenuOverlay';
    overlay.className = 'hidden md:hidden fixed inset-0 bg-black/40 z-40';

    var panel = document.createElement('div');
    panel.id = 'mobileMenu';
    panel.className = 'hidden md:hidden fixed top-0 right-0 z-50 h-full w-64 max-w-[80%] bg-white shadow-xl p-6 flex flex-col gap-1 overflow-y-auto';

    var html = '<button id="mobileMenuClose" aria-label="Close menu" class="self-end text-gray-400 hover:text-gray-700 text-3xl leading-none mb-4">&times;</button>';
    LINKS.forEach(function (l) {
      if (l.donate) {
        html += '<a href="#" data-donate class="block py-2.5 text-[15px] font-medium text-gray-700 hover:text-brand-green">' + l.label + '</a>';
      } else if (l.cta) {
        html += '<a href="' + l.href + '" class="block mt-3 text-center px-5 py-2.5 border border-brand-green text-gray-800 rounded-full text-[15px] font-medium hover:bg-brand-green hover:text-white transition-colors">' + l.label + '</a>';
      } else {
        html += '<a href="' + l.href + '" class="block py-2.5 text-[15px] font-medium text-gray-700 hover:text-brand-green">' + l.label + '</a>';
      }
    });
    panel.innerHTML = html;

    document.body.appendChild(overlay);
    document.body.appendChild(panel);

    function open() { panel.classList.remove('hidden'); overlay.classList.remove('hidden'); }
    function close() { panel.classList.add('hidden'); overlay.classList.add('hidden'); }

    btn.addEventListener('click', function (e) { e.preventDefault(); open(); });
    overlay.addEventListener('click', close);
    document.getElementById('mobileMenuClose').addEventListener('click', close);
    panel.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
  }

  function wireFooterPopups() {
    var footer = document.querySelector('footer');
    if (!footer) return;
    ensureInfoModal();
    footer.querySelectorAll('a').forEach(function (a) {
      if (a.getAttribute('href') !== '#' || a.hasAttribute('data-donate')) return;
      var key = a.textContent.trim().toLowerCase();
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var item = INFO[key] || { title: a.textContent.trim(), body: 'Content coming soon.' };
        document.getElementById('infoTitle').textContent = item.title;
        document.getElementById('infoBody').innerHTML = '<p>' + item.body + '</p>';
        document.getElementById('infoModal').classList.remove('hidden');
      });
    });
  }

  function ensureInfoModal() {
    if (document.getElementById('infoModal')) return;
    var modal = document.createElement('div');
    modal.id = 'infoModal';
    modal.className = 'hidden fixed inset-0 z-[60] flex items-center justify-center p-4';
    modal.innerHTML =
      '<div id="infoBackdrop" class="absolute inset-0 bg-black/50"></div>' +
      '<div class="relative z-10 bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[85vh] flex flex-col">' +
        '<div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">' +
          '<h3 id="infoTitle" class="text-[16px] font-bold text-gray-900"></h3>' +
          '<button id="infoClose" class="text-gray-400 hover:text-gray-700 text-2xl leading-none">&times;</button>' +
        '</div>' +
        '<div id="infoBody" class="px-6 py-5 overflow-y-auto text-[13px] text-gray-600 font-medium leading-relaxed"></div>' +
      '</div>';
    document.body.appendChild(modal);
    function hide() { modal.classList.add('hidden'); }
    document.getElementById('infoClose').addEventListener('click', hide);
    document.getElementById('infoBackdrop').addEventListener('click', hide);
  }

  function wireDonate() {
    document.querySelectorAll('[data-donate]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var modal = document.getElementById('donateModal');
        if (modal) { e.preventDefault(); modal.classList.remove('hidden'); }
        else { e.preventDefault(); window.location.href = 'home.html'; }
      });
    });
  }
})();