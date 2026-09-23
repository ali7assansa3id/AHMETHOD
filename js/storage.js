/* ============================================================
   AHMETHOD — js/storage.js
   Namespaced localStorage access for PLATFORM-level data only:
   companies, the super-admin account, the platform-wide username
   index, and the current login session.

   Company accounting data itself is NOT stored here — it keeps
   using the ORIGINAL key from js/app.js ('acc_system_data_v1'),
   just suffixed per company ('acc_system_data_v1__<companyId>')
   so existing single-tenant data is never orphaned. See
   migrateLegacyDataIfNeeded() in js/auth.js.
   ============================================================ */

const NS = {
  companies: 'ahmethod_companies',
  platformUsers: 'ahmethod_platform_users', // the super_admin account
  userIndex: 'ahmethod_user_index',         // { username: {companyId, role} } — login router
  session: 'ahmethod_session',              // persisted current login (mirrors original DB.currentUserId behavior)
  legacyMigrated: 'ahmethod_legacy_migrated_v1',
};

function psGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}
function psSet(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getCompanies() { return psGet(NS.companies, []); }
function saveCompanies(list) { psSet(NS.companies, list); }
function getCompanyById(id) { return getCompanies().find(c => c.id === id) || null; }

function getPlatformUsers() { return psGet(NS.platformUsers, []); }
function savePlatformUsers(list) { psSet(NS.platformUsers, list); }

function getUserIndex() { return psGet(NS.userIndex, {}); }
function saveUserIndex(idx) { psSet(NS.userIndex, idx); }

function getSession() { return psGet(NS.session, null); }
function saveSession(s) { psSet(NS.session, s); }
function clearSessionStorage() { localStorage.removeItem(NS.session); }
