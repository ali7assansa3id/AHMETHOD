/* ============================================================
   AHMETHOD — js/permissions.js
   Role constants for the multi-tenant layer.

   IMPORTANT: the actual granular permission ENGINE (view/add/edit/
   delete per module, enforced in every render + every save/delete
   function) already existed in the original file and lives in
   js/app.js unchanged:
     - DB.users[].isAdmin        -> this user is the company's admin
     - DB.users[].perms[module]  -> {view,add,edit,delete} booleans
     - can(moduleId, action)     -> enforcement, used everywhere
     - requirePerm(moduleId, action)
     - buildNav() hides whole sections the user can't view
   This file does not re-implement any of that — it only defines the
   three platform-wide roles and how they map onto it:
     super_admin    -> platform owner, manages companies/subscriptions
                       (not part of any single company's DB.users)
     company_admin  -> a company's DB.users entry with isAdmin:true
                       (created automatically at registration)
     employee       -> a company's DB.users entry with isAdmin:false
                       and a specific perms{} object, created/edited
                       by the company_admin from the existing "users"
                       section (RENDERERS.users in app.js)
   ============================================================ */

const PLATFORM_ROLES = {
  SUPER_ADMIN: 'super_admin',
  COMPANY_ADMIN: 'company_admin',
  EMPLOYEE: 'employee',
};

function isCompanyAdminUser(u) { return !!(u && u.isAdmin); }
