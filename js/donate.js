// js/donate.js — shared Donate popup for all public pages.
// Include once per page (before </body>):  <script src="./js/donate.js"></script>
// Add a trigger anywhere:                  <a href="#" data-donate>Donate</a>
// If the page has no #donateModal, this injects one; otherwise it wires the existing one.
(function () {
  var MODAL_HTML =
  '<div id="donateModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4">' +
    '<div id="donateBackdrop" class="absolute inset-0 bg-black/50"></div>' +
    '<div class="relative z-10 bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] flex flex-col">' +
      '<div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">' +
        '<h3 class="text-[16px] font-bold text-gray-900">Support Our Work</h3>' +
        '<button type="button" id="closeDonate" class="text-gray-400 hover:text-gray-700 text-2xl leading-none">&times;</button>' +
      '</div>' +
      '<div class="px-6 py-5 overflow-y-auto">' +
        '<p class="text-[13px] text-gray-600 font-medium leading-relaxed mb-5">Your donation helps fund transparent, community-driven projects. Give directly using the details below, no account needed. To track your giving and follow project progress, donate as a registered donor.</p>' +
        '<div class="bg-brand-lightgreen border border-brand-green/20 rounded-2xl p-5 mb-5">' +
          '<h4 class="text-[13px] font-bold text-gray-900 mb-4">Donation Account Details</h4>' +
          '<div class="space-y-3">' +
            '<div><p class="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Bank Name</p><p class="text-[14px] font-semibold text-gray-800">BANK NAME HERE</p></div>' +
            '<div><p class="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Account Name</p><p class="text-[14px] font-semibold text-gray-800">ACCOUNT NAME HERE</p></div>' +
            '<div><p class="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Account Number</p><p class="text-[14px] font-semibold text-gray-800">0000000000</p></div>' +
          '</div>' +
          '<p class="text-[11px] text-gray-500 font-medium mt-4 pt-3 border-t border-brand-green/20">Please use your name or "SyntraAid Donation" in the transfer description so we can identify your gift.</p>' +
        '</div>' +
        '<a href="onboarding-login.html" class="flex items-center justify-center gap-2 w-full px-6 py-3 bg-brand-green text-white text-[14px] font-semibold rounded-full hover:bg-brand-darkgreen transition-colors">Donate as a registered donor' +
          '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>' +
        '</a>' +
        '<p class="text-[11px] text-gray-400 font-medium text-center mt-3">Registering lets you confirm your payment and follow the projects you support.</p>' +
      '</div>' +
    '</div>' +
  '</div>';

  function init() {
    var modal = document.getElementById('donateModal');
    if (!modal) {
      var wrap = document.createElement('div');
      wrap.innerHTML = MODAL_HTML;
      document.body.appendChild(wrap.firstChild);
      modal = document.getElementById('donateModal');
    }
    if (!modal) return;
    var open = function (e) { if (e) e.preventDefault(); modal.classList.remove('hidden'); };
    var close = function () { modal.classList.add('hidden'); };
    document.querySelectorAll('[data-donate]').forEach(function (el) { el.addEventListener('click', open); });
    var c = document.getElementById('closeDonate'); if (c) c.addEventListener('click', close);
    var b = document.getElementById('donateBackdrop'); if (b) b.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();