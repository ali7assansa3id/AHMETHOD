/* ============================================================
   AHMETHOD — js/auth.js
   Owns: super-admin seeding, legacy single-tenant data migration,
   the login button's actual behavior, session persistence (so a
   refresh keeps you logged in, exactly like the original file),
   the subscription gate, and the one-and-only DOMContentLoaded
   bootstrap for the whole app (js/app.js's own bootstrap was
   removed — see the note at the bottom of js/app.js).
   ============================================================ */

window.ACTIVE_COMPANY_ID = null;

/* ---------------- boot ---------------- */
function bootstrapPlatform() {
  const platformUsers = getPlatformUsers();
  if (!platformUsers.find(x => x.role === PLATFORM_ROLES.SUPER_ADMIN)) {
    platformUsers.push({ id: 1, username: 'admin', password: 'admin123', role: PLATFORM_ROLES.SUPER_ADMIN, createdAt: new Date().toISOString() });
    savePlatformUsers(platformUsers);
  }
  migrateLegacyDataIfNeeded();
}

/* If this file is being dropped onto a browser that already has data saved
   under the ORIGINAL single-tenant key ('acc_system_data_v1') from before
   this multi-tenant version existed, wrap that data into a proper company
   ("الشركة الافتراضية") instead of losing it. The original key is left in
   place untouched (never deleted) — only copied — so nothing is destroyed
   even if this runs more than once or something goes wrong reading it. */
function migrateLegacyDataIfNeeded() {
  if (localStorage.getItem(NS.legacyMigrated)) return;
  const legacyRaw = localStorage.getItem('acc_system_data_v1');
  const companies = getCompanies();
  if (legacyRaw && companies.length === 0) {
    try {
      const legacyData = JSON.parse(legacyRaw);
      const companyId = 'legacy';
      const companyName = (legacyData.settings && legacyData.settings.companyName) ? legacyData.settings.companyName : 'الشركة الافتراضية';
      const company = {
        id: companyId, name: companyName, adminName: '-', phone: '', email: '',
        subscriptionType: 'pro', subscriptionStart: todayISO(), subscriptionEnd: addDaysToDate(todayISO(), 3650),
        status: 'active', createdAt: new Date().toISOString(),
      };
      companies.push(company);
      saveCompanies(companies);
      localStorage.setItem('acc_system_data_v1__' + companyId, legacyRaw);
      const idx = getUserIndex();
      (legacyData.users || []).forEach(u => {
        idx[u.username] = { companyId, role: u.isAdmin ? PLATFORM_ROLES.COMPANY_ADMIN : PLATFORM_ROLES.EMPLOYEE };
      });
      saveUserIndex(idx);
    } catch (e) {
      // Legacy data unreadable — leave it exactly where it was, untouched.
    }
  }
  localStorage.setItem(NS.legacyMigrated, '1');
}

/* ---------------- login ---------------- */
function platformDoLogin() {
  const u = document.getElementById('liUser').value.trim();
  const p = document.getElementById('liPass').value;
  const errEl = document.getElementById('liErr');
  errEl.textContent = '';
  if (!u || !p) { errEl.textContent = 'أدخل اسم المستخدم وكلمة السر'; return; }

  // 1) super admin
  const superUser = getPlatformUsers().find(x => x.username === u && x.password === p && x.role === PLATFORM_ROLES.SUPER_ADMIN);
  if (superUser) {
    saveSession({ role: 'super_admin', userId: superUser.id, loginTime: new Date().toISOString() });
    enterSuperAdminPanel();
    return;
  }

  // 2) company user (company_admin or employee) — routed via the platform-wide index
  const entry = getUserIndex()[u];
  if (!entry) { errEl.textContent = 'بيانات الدخول غير صحيحة'; return; }
  const company = getCompanyById(entry.companyId);
  if (!company) { errEl.textContent = 'بيانات الدخول غير صحيحة'; return; }

  const live = computeLiveStatus(company);
  if (live !== 'active') { showSubscriptionExpiredScreen(company); return; }

  window.ACTIVE_COMPANY_ID = company.id;
  loadDB(company.id);
  const user = DB.users.find(x => x.username === u && x.password === p);
  if (!user) { errEl.textContent = 'بيانات الدخول غير صحيحة'; return; }

  DB.currentUserId = user.id; saveDB();
  logAudit('تسجيل دخول', 'system', '-');
  saveSession({ role: user.isAdmin ? 'company_admin' : 'employee', companyId: company.id, userId: user.id, loginTime: new Date().toISOString() });
  showApp();
}

function platformLogout() {
  clearSessionStorage();
  document.getElementById('superAdminShell').style.display = 'none';
  document.getElementById('appShell').style.display = 'none';
  document.getElementById('subExpiredScreen').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('liUser').value = ''; document.getElementById('liPass').value = '';
}
// used by js/app.js's own doLogout() so a company user's normal logout also
// clears the platform session (guarded call — see js/app.js).
window.clearPlatformSession = function () { clearSessionStorage(); };

/* ---------------- screens ---------------- */
function enterSuperAdminPanel() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('appShell').style.display = 'none';
  document.getElementById('subExpiredScreen').style.display = 'none';
  document.getElementById('superAdminShell').style.display = 'flex';
  renderCompaniesPanel();
}
function showSubscriptionExpiredScreen(company) {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('appShell').style.display = 'none';
  document.getElementById('superAdminShell').style.display = 'none';
  document.getElementById('subExpiredCompanyName').textContent = company.name;
  document.getElementById('subExpiredEnd').textContent = company.subscriptionEnd;
  document.getElementById('subExpiredMsg').textContent =
    company.status === 'suspended' ? 'تم إيقاف اشتراك هذه الشركة من قبل الإدارة.' : 'انتهى اشتراكك';
  document.getElementById('subExpiredScreen').style.display = 'flex';
}
function backToLoginFromExpired() {
  document.getElementById('subExpiredScreen').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
}

/* ---------------- session restore (page load + back-button) ---------------- */
function restoreSessionOnLoad() {
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('appShell').style.display = 'none';
  document.getElementById('superAdminShell').style.display = 'none';
  document.getElementById('subExpiredScreen').style.display = 'none';

  const s = getSession();
  if (!s) return;

  if (s.role === 'super_admin') { enterSuperAdminPanel(); return; }

  if (s.companyId) {
    const company = getCompanyById(s.companyId);
    if (!company) { clearSessionStorage(); return; }
    const live = computeLiveStatus(company);
    if (live !== 'active') { showSubscriptionExpiredScreen(company); return; }
    window.ACTIVE_COMPANY_ID = company.id;
    loadDB(company.id);
    if (DB.currentUserId && DB.users.find(x => x.id === DB.currentUserId)) {
      showApp();
    } else {
      clearSessionStorage();
    }
  }
}

// Browser back/forward (bfcache) should never re-show a stale authenticated
// page without re-checking the session.
window.addEventListener('pageshow', function (e) {
  if (e.persisted) restoreSessionOnLoad();
});

// Light periodic re-check in case a subscription expires mid-session.
setInterval(function () {
  const s = getSession();
  if (s && s.companyId) {
    const company = getCompanyById(s.companyId);
    if (!company || computeLiveStatus(company) !== 'active') {
      toast('انتهت صلاحية الاشتراك، سيتم تسجيل الخروج');
      setTimeout(function () { doLogout(); restoreSessionOnLoad(); }, 1200);
    }
  }
}, 5 * 60 * 1000);

/* ---------------- init ---------------- */
document.addEventListener('DOMContentLoaded', function () {
  bootstrapPlatform();
  document.getElementById('liPass').addEventListener('keydown', function (e) { if (e.key === 'Enter') platformDoLogin(); });
  document.getElementById('liUser').addEventListener('keydown', function (e) { if (e.key === 'Enter') platformDoLogin(); });
  restoreSessionOnLoad();
});
