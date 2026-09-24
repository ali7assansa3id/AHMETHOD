/* =========================================================
   ظ†ط¸ط§ظ… ط§ظ„ظ…ط­ط§ط³ط¨ط© ظˆط§ظ„ظ…ط®ط§ط²ظ† ط§ظ„ظ…طھظƒط§ظ…ظ„ (ERP System)
   ط§ظ„ط¬ط²ط، ط§ظ„ط£ظˆظ„: ط§ظ„طھظ‡ظٹط¦ط© + ط¥ط¯ط§ط±ط© ط§ظ„ط­ط³ط§ط¨ط§طھ + ط§ظ„ظپظˆط§طھظٹط±
   ========================================================= */

// ---------- 1. ط§ظ„طھظ‡ظٹط¦ط© ظˆظ‚ط§ط¹ط¯ط© ط§ظ„ط¨ظٹط§ظ†ط§طھ ط§ظ„ظ…ط­ظ„ظٹط© ----------
let DB = {
  users: [
    { id: 1, name: 'ط§ظ„ظ…ط¯ظٹط± ط§ظ„ط¹ط§ظ…', user: 'admin', pass: 'admin123', role: 'admin', perms: ['all'] }
  ],
  accounts: [
    { id: 100, code: '1', name: 'ط§ظ„ط£طµظˆظ„', type: 'asset', parentId: null },
    { id: 101, code: '11', name: 'ط§ظ„ط£طµظˆظ„ ط§ظ„ظ…طھط¯ط§ظˆظ„ط©', type: 'asset', parentId: 100 },
    { id: 102, code: '111', name: 'ط§ظ„ط®ط²ظٹظ†ط© ط§ظ„ط±ط¦ظٹط³ظٹط©', type: 'asset', parentId: 101 },
    { id: 103, code: '112', name: 'ط§ظ„ط¨ظ†ظƒ', type: 'asset', parentId: 101 },
    { id: 104, code: '113', name: 'ط§ظ„ط¹ظ…ظ„ط§ط،', type: 'asset', parentId: 101 },
    { id: 105, code: '114', name: 'ط§ظ„ظ…ط®ط²ظˆظ†', type: 'asset', parentId: 101 },
    { id: 200, code: '2', name: 'ط§ظ„ط§ظ„طھط²ط§ظ…ط§طھ', type: 'liability', parentId: null },
    { id: 201, code: '21', name: 'ط§ظ„ظ…ظˆط±ط¯ظٹظ†', type: 'liability', parentId: 200 },
    { id: 300, code: '3', name: 'ط§ظ„ط¥ظٹط±ط§ط¯ط§طھ', type: 'income', parentId: null },
    { id: 301, code: '31', name: 'ظ…ط¨ظٹط¹ط§طھ ط§ظ„ط¨ط¶ط§ط¦ط¹', type: 'income', parentId: 300 },
    { id: 400, code: '4', name: 'ط§ظ„ظ…طµط±ظˆظپط§طھ', type: 'expense', parentId: null },
    { id: 401, code: '41', name: 'طھظƒظ„ظپط© ط§ظ„ط¨ط¶ط§ط¹ط© ط§ظ„ظ…ط¨ط§ط¹ط©', type: 'expense', parentId: 400 }
  ],
  items: [
    { id: 1, code: 'IT001', name: 'طµظ†ظپ ط§ظپطھط±ط§ط¶ظٹ', unit: 'ظ‚ط·ط¹ط©', minQty: 5 }
  ],
  warehouses: [
    { id: 1, name: 'ط§ظ„ظ…ط®ط²ظ† ط§ظ„ط±ط¦ظٹط³ظٹ', code: 'WH1' }
  ],
  customers: [],
  suppliers: [],
  invoices: [],
  journalEntries: [],
  stockOps: [],
  stockBatches: [],
  auditLogs: []
};

let currentUserId = null;

/* ---------- Firebase Realtime Database ---------- */
// ط¥ط¹ط¯ط§ط¯ط§طھ ظ…ط´ط±ظˆط¹ظƒ ط¹ظ„ظ‰ Firebase (ahmethodpro) â€” ط§ظ„ظ‚ظٹظ… ط¯ظٹ client-side API key
// ط¹ط§ط¯ظٹ طھظƒظˆظ† ط¸ط§ظ‡ط±ط© ظپظٹ ط§ظ„ظƒظˆط¯طŒ ط§ظ„ط­ظ…ط§ظٹط© ط§ظ„ط­ظ‚ظٹظ‚ظٹط© ط¨طھظٹط¬ظٹ ظ…ظ† ط§ظ„ظ€ Security Rules
// ظپظٹ ظ„ظˆط­ط© طھط­ظƒظ… Firebase (Realtime Database â†’ Rules)طŒ ظ…ط´ ظ…ظ† ط¥ط®ظپط§ط، ط§ظ„ظ…ظپطھط§ط­ ط¯ظ‡.
const firebaseConfig = {
  apiKey: "AIzaSyCnuv-hBxucSgRN-_SD0i6jx3Xv7CR_gQU",
  authDomain: "ahmethodpro.firebaseapp.com",
  databaseURL: "https://ahmethodpro-default-rtdb.firebaseio.com",
  projectId: "ahmethodpro",
  storageBucket: "ahmethodpro.firebasestorage.app",
  messagingSenderId: "545312965626",
  appId: "1:545312965626:web:94eb7366be72a6dc965a43",
  measurementId: "G-L542GK25F0"
};
firebase.initializeApp(firebaseConfig);
const fbRef = firebase.database().ref('ERP_FULL_DB');

function saveDB() {
  // ظ†ط³ط®ط© ظ…ط­ظ„ظٹط© ظپظˆط±ظٹط© (طھط´طھط؛ظ„ ط­طھظ‰ ظ„ظˆ ط§ظ„ظ†طھ ظ…ظ‚ط·ظˆط¹ ظ„ط­ط¸طھظ‡ط§)
  try {
    localStorage.setItem('ERP_FULL_DB', JSON.stringify(DB));
  } catch(e) {
    console.error('ظپط´ظ„ ط­ظپط¸ ط§ظ„ط¨ظٹط§ظ†ط§طھ ظپظٹ LocalStorage', e);
  }
  // ظ…ط²ط§ظ…ظ†ط© ظ…ط¹ Firebase â€” ظ„ظˆ ظپط´ظ„طھطŒ ط§ظ„ط¨ظٹط§ظ†ط§طھ ط§ظ„ظ…ط­ظ„ظٹط© ط³ظ„ظٹظ…ط© ظˆط§ظ„ظ†ط¸ط§ظ… ظٹظƒظ…ظ„ ط´ط؛ظ„ ط¹ط§ط¯ظٹ
  fbRef.set(DB).catch(err => {
    console.error('ظپط´ظ„ ط­ظپط¸ ط§ظ„ط¨ظٹط§ظ†ط§طھ ط¹ظ„ظ‰ Firebase', err);
    toast('طھط¹ط°ظ‘ط±طھ ط§ظ„ظ…ط²ط§ظ…ظ†ط© ظ…ط¹ ظ‚ط§ط¹ط¯ط© ط§ظ„ط¨ظٹط§ظ†ط§طھ ط§ظ„ط³ط­ط§ط¨ظٹط© (طھظ… ط§ظ„ط­ظپط¸ ظ…ط­ظ„ظٹظ‹ط§ ظپظ‚ط·)');
  });
}

function loadDB(onReady) {
  fbRef.once('value')
    .then(snapshot => {
      const remote = snapshot.val();
      if (remote) {
        DB = { ...DB, ...remote };
      } else {
        // ط£ظˆظ„ ظ…ط±ط© طھظپطھط­ ظپظٹظ‡ط§ ظ‚ط§ط¹ط¯ط© ط§ظ„ط¨ظٹط§ظ†ط§طھ ط§ظ„ط³ط­ط§ط¨ظٹط© ظپط§ط¶ظٹط© - ظ†ط±ظپط¹ظ„ظ‡ط§ ط£ظٹ ظ†ط³ط®ط© ظ…ط­ظ„ظٹط© ظ‚ط¯ظٹظ…ط© ظ…ظˆط¬ظˆط¯ط©
        mergeLocalFallback();
      }
      if (onReady) onReady();
    })
    .catch(err => {
      console.error('طھط¹ط°ط± ط§ظ„ط§طھطµط§ظ„ ط¨ظ€ Firebase â€” ط³ظٹطھظ… ط§ط³طھط®ط¯ط§ظ… ط¢ط®ط± ظ†ط³ط®ط© ظ…ط­ظ„ظٹط© ظ…ط­ظپظˆط¸ط©', err);
      mergeLocalFallback();
      if (onReady) onReady();
    });
}

function mergeLocalFallback() {
  const saved = localStorage.getItem('ERP_FULL_DB');
  if (saved) {
    try {
      DB = { ...DB, ...JSON.parse(saved) };
    } catch(e) {
      console.error('ط®ط·ط£ ظپظٹ طھط­ظ…ظٹظ„ ط§ظ„ظ†ط³ط®ط© ط§ظ„ظ…ط­ظ„ظٹط© ط§ظ„ط§ط­طھظٹط§ط·ظٹط©');
    }
  }
}

// ---------- 2. ط£ط¯ظˆط§طھ ظ…ط³ط§ط¹ط¯ط© (Utility Functions) ----------
function uid() { return Date.now() + Math.floor(Math.random() * 1000); }
function todayStr() { return new Date().toISOString().split('T')[0]; }
function fmt(num) { return Number(num || 0).toLocaleString('ar-EG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

function toast(msg) {
  const t = document.getElementById('toast');
  if(!t) return;
  t.innerText = msg;
  t.style.display = 'block';
  setTimeout(() => { t.style.display = 'none'; }, 3000);
}

function logAudit(action, module, details) {
  const u = DB.users.find(x => x.id === currentUserId);
  DB.auditLogs.push({
    id: uid(),
    user: u ? u.name : 'ط؛ظٹط± ظ…ط¹ط±ظˆظپ',
    action, module, details,
    date: new Date().toLocaleString('ar-EG')
  });
  saveDB();
}

function requirePerm(module, perm) {
  const u = DB.users.find(x => x.id === currentUserId);
  if(!u) return false;
  if(u.role === 'admin' || u.perms.includes('all')) return true;
  return u.perms.includes(`${module}_${perm}`);
}

/* ---------- Modal Window Management ---------- */
function openModal(title, htmlContent, onConfirm, hideButtons = false) {
  const root = document.getElementById('modalRoot');
  root.innerHTML = `
    <div class="modalOverlay">
      <div class="modalBox">
        <h3 style="margin-bottom:15px; border-bottom:1px solid #ccc; padding-bottom:8px;">${title}</h3>
        <div class="modalBody">${htmlContent}</div>
        <div style="margin-top:20px; text-align:left; display:flex; gap:8px; justify-content:flex-end;">
          ${!hideButtons ? `<button class="btn" id="modalOkBtn">ط­ظپط¸</button>` : ''}
          <button class="btn secondary" onclick="closeModal()">ط¥ط؛ظ„ط§ظ‚</button>
        </div>
      </div>
    </div>
  `;
  if(!hideButtons && onConfirm) {
    document.getElementById('modalOkBtn').onclick = onConfirm;
  }
}

function closeModal() {
  document.getElementById('modalRoot').innerHTML = '';
}

/* ---------- 3. طھط³ط¬ظٹظ„ ط§ظ„ط¯ط®ظˆظ„ ظˆط¥ط¯ط§ط±ط© ط§ظ„ط¬ظ„ط³ط§طھ ---------- */
function doLogin() {
  const uInput = document.getElementById('liUser').value.trim();
  const pInput = document.getElementById('liPass').value.trim();
  const errEl = document.getElementById('liErr');

  const user = DB.users.find(x => x.user === uInput && x.pass === pInput);
  if (user) {
    currentUserId = user.id;
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('appShell').style.display = 'flex';
    renderUserBox();
    renderNav();
    renderAll();
    logAudit('طھط³ط¬ظٹظ„ ط¯ط®ظˆظ„', 'ط§ظ„ط£ظ…ط§ظ†', 'طھظ… طھط³ط¬ظٹظ„ ط§ظ„ط¯ط®ظˆظ„ ط¨ظ†ط¬ط§ط­');
    toast('ظ…ط±ط­ط¨ط§ظ‹ ط¨ظƒ ظپظٹ ط§ظ„ظ†ط¸ط§ظ…');
  } else {
    errEl.innerText = 'ط§ط³ظ… ط§ظ„ظ…ط³طھط®ط¯ظ… ط£ظˆ ظƒظ„ظ…ط© ط§ظ„ظ…ط±ظˆط± ط؛ظٹط± طµط­ظٹط­ط©';
  }
}

function doLogout() {
  logAudit('طھط³ط¬ظٹظ„ ط®ط±ظˆط¬', 'ط§ظ„ط£ظ…ط§ظ†', 'ط®ط±ظˆط¬ ط§ظ„ظ…ط³طھط®ط¯ظ…');
  currentUserId = null;
  document.getElementById('appShell').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('liPass').value = '';
}

function renderUserBox() {
  const u = DB.users.find(x => x.id === currentUserId);
  document.getElementById('userBox').innerHTML = `
    <span>ط§ظ„ظ…ط³طھط®ط¯ظ…: <b>${u ? u.name : ''}</b> (${u ? u.role : ''})</span>
    <button class="btn danger" style="margin-right:10px; padding:4px 8px; font-size:12px;" onclick="doLogout()">طھط³ط¬ظٹظ„ ط§ظ„ط®ط±ظˆط¬</button>
  `;
}

function renderNav() {
  const nav = document.getElementById('navMain');
  nav.innerHTML = `
    <button class="btn" onclick="renderInventory(document.getElementById('content'))">ط§ظ„ط£طµظ†ط§ظپ ظˆط§ظ„ظ…ط®ط²ظˆظ†</button>
    <button class="btn" onclick="renderStockReceive(document.getElementById('content'))">ط¥ط°ظ† ط§ط³طھظ„ط§ظ…</button>
    <button class="btn" onclick="renderStockIssue(document.getElementById('content'))">ط¥ط°ظ† طµط±ظپ</button>
    <button class="btn" onclick="renderStockTransfer(document.getElementById('content'))">طھط­ظˆظٹظ„ ظ…ط®ط²ظ†ظٹ</button>
    <button class="btn" onclick="renderInvoices(document.getElementById('content'))">ط§ظ„ظپظˆط§طھظٹط± ظˆط§ظ„ظ…ط¨ظٹط¹ط§طھ</button>
    <button class="btn" onclick="renderAccountsTree(document.getElementById('content'))">ط´ط¬ط±ط© ط§ظ„ط­ط³ط§ط¨ط§طھ</button>
    <button class="btn" onclick="renderStockOps(document.getElementById('content'))">ط³ط¬ظ„ ط§ظ„ط­ط±ظƒط§طھ</button>
    <button class="btn secondary" onclick="renderInvImportExport(document.getElementById('content'))">Excel ط§ط³طھظٹط±ط§ط¯/طھطµط¯ظٹط±</button>
  `;
}

/* ---------- 4. ط´ط¬ط±ط© ط§ظ„ط­ط³ط§ط¨ط§طھ ظˆط§ظ„ط¯ظپط§طھط± ---------- */
function renderAccountsTree(root) {
  root.innerHTML = `
    <div class="card">
      <div class="cardHead" style="display:flex; justify-content:space-between; align-items:center;">
        <h2>ط´ط¬ط±ط© ط§ظ„ط­ط³ط§ط¨ط§طھ ط§ظ„ط¹ط§ظ…ط©</h2>
        <button class="btn" onclick="openAccountModal()">+ ط¥ط¶ط§ظپط© ط­ط³ط§ط¨ ط¬ط¯ظٹط¯</button>
      </div>
      <div class="tableWrap">
        <table>
          <thead>
            <tr><th>ط§ظ„ظƒظˆط¯</th><th>ط§ط³ظ… ط§ظ„ط­ط³ط§ط¨</th><th>ط§ظ„ظ†ظˆط¹</th><th>ط§ظ„ط­ط³ط§ط¨ ط§ظ„ط£ط¨</th><th>ط¥ط¬ط±ط§ط،ط§طھ</th></tr>
          </thead>
          <tbody>
            ${DB.accounts.map(acc => {
              const parent = DB.accounts.find(a => a.id === acc.parentId);
              return `<tr>
                <td><b>${acc.code}</b></td>
                <td>${acc.name}</td>
                <td>${acc.type}</td>
                <td>${parent ? parent.name : '-'}</td>
                <td>
                  <button class="btn secondary" style="padding:2px 6px;" onclick="openAccountModal(${acc.id})">طھط¹ط¯ظٹظ„</button>
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openAccountModal(id = null) {
  const acc = id ? DB.accounts.find(x => x.id === id) : { code: '', name: '', type: 'asset', parentId: '' };
  openModal(id ? 'طھط¹ط¯ظٹظ„ ط­ط³ط§ط¨' : 'ط¥ط¶ط§ظپط© ط­ط³ط§ط¨ ط¬ط¯ظٹط¯', `
    <div class="field" style="margin-bottom:8px;"><label>ظƒظˆط¯ ط§ظ„ط­ط³ط§ط¨</label><input id="accCode" value="${acc.code}"></div>
    <div class="field" style="margin-bottom:8px;"><label>ط§ط³ظ… ط§ظ„ط­ط³ط§ط¨</label><input id="accName" value="${acc.name}"></div>
    <div class="field" style="margin-bottom:8px;"><label>ظ†ظˆط¹ ط§ظ„ط­ط³ط§ط¨</label>
      <select id="accType">
        <option value="asset" ${acc.type==='asset'?'selected':''}>ط£طµظˆظ„</option>
        <option value="liability" ${acc.type==='liability'?'selected':''}>ط§ظ„طھط²ط§ظ…ط§طھ</option>
        <option value="income" ${acc.type==='income'?'selected':''}>ط¥ظٹط±ط§ط¯ط§طھ</option>
        <option value="expense" ${acc.type==='expense'?'selected':''}>ظ…طµط±ظˆظپط§طھ</option>
      </select>
    </div>
    <div class="field"><label>ط§ظ„ط­ط³ط§ط¨ ط§ظ„ط£ط¨</label>
      <select id="accParent">
        <option value="">ظ„ط§ ظٹظˆط¬ط¯ (ط­ط³ط§ط¨ ط±ط¦ظٹط³ظٹ)</option>
        ${DB.accounts.filter(a => a.id !== id).map(a => `<option value="${a.id}" ${acc.parentId===a.id?'selected':''}>${a.name} (${a.code})</option>`).join('')}
      </select>
    </div>
  `, () => saveAccount(id));
}

function saveAccount(id) {
  const code = document.getElementById('accCode').value.trim();
  const name = document.getElementById('accName').value.trim();
  const type = document.getElementById('accType').value;
  const parentId = Number(document.getElementById('accParent').value) || null;

  if(!code || !name) { toast('ط¨ظٹط§ظ†ط§طھ ط§ظ„ط­ط³ط§ط¨ ط؛ظٹط± ظ…ظƒطھظ…ظ„ط©'); return; }

  if(id) {
    const acc = DB.accounts.find(x => x.id === id);
    if(acc) { acc.code = code; acc.name = name; acc.type = type; acc.parentId = parentId; }
  } else {
    DB.accounts.push({ id: uid(), code, name, type, parentId });
  }
  saveDB(); closeModal(); renderAccountsTree(document.getElementById('content')); toast('طھظ… ط­ظپط¸ ط§ظ„ط­ط³ط§ط¨');
}

/* =========================================================
   ظ†ط¸ط§ظ… ط§ظ„ظ…ط­ط§ط³ط¨ط© ظˆط§ظ„ظ…ط®ط§ط²ظ† ط§ظ„ظ…طھظƒط§ظ…ظ„ (ERP System)
   ط§ظ„ط¬ط²ط، ط§ظ„ط«ط§ظ†ظٹ: ط¥ط¯ط§ط±ط© ط§ظ„ظ…ط®ط²ظˆظ† + FIFO + ط§ظ„ط­ط±ظƒط§طھ ظˆط§ظ„طھطµط¯ظٹط±
   ========================================================= */

/* ---------- 5. ظ…ظ†ط·ظ‚ طھظ‚ظٹظٹظ… ط§ظ„ظ…ط®ط²ظˆظ† ظˆط­ط³ط§ط¨ط§طھ (FIFO) ---------- */
function getItemStock(itemId, warehouseId = null) {
  let batches = DB.stockBatches.filter(b => b.itemId === itemId && b.remaining > 0);
  if (warehouseId) {
    batches = batches.filter(b => b.warehouseId === warehouseId);
  }
  return batches.reduce((sum, b) => sum + b.remaining, 0);
}

function addStockBatch(itemId, warehouseId, qty, unitCost, date, source, refId) {
  DB.stockBatches.push({
    id: uid(), 
    itemId, 
    warehouseId,
    qty: Number(qty), 
    remaining: Number(qty),
    unitCost: Number(unitCost), 
    date: date || todayStr(), 
    source, 
    refId
  });
  saveDB();
}

function consumeStockFIFO(itemId, warehouseId, qtyToConsume, updateDB = true) {
  let remainingNeed = qtyToConsume;
  let totalCost = 0;
  
  // طھط±طھظٹط¨ ط§ظ„ط¯ظپط¹ط§طھ ط§ظ„ظ…طھط§ط­ط© ط­ط³ط¨ ط§ظ„طھط§ط±ظٹط® (ط§ظ„ظˆط§ط±ط¯ ط£ظˆظ„ط§ظ‹ ظٹطµط±ظپ ط£ظˆظ„ط§ظ‹)
  let batches = DB.stockBatches
    .filter(b => b.itemId === itemId && b.warehouseId === warehouseId && b.remaining > 0)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  for (let b of batches) {
    if (remainingNeed <= 0) break;
    let take = Math.min(b.remaining, remainingNeed);
    totalCost += take * b.unitCost;
    remainingNeed -= take;
    if (updateDB) {
      b.remaining -= take;
    }
  }

  if (remainingNeed > 0.0001) return null; // ط§ظ„ط±طµظٹط¯ ط§ظ„ظ…طھظˆظپط± ظ„ط§ ظٹظƒظپظٹ
  if (updateDB) saveDB();
  return { cost: totalCost };
}

/* ---------- 6. ط¥ط¯ط§ط±ط© ط§ظ„ط£طµظ†ط§ظپ ظˆظ‚ط§ط¦ظ…ط© ط§ظ„ظ…ط®ط²ظˆظ† ---------- */
function renderAll() {
  const content = document.getElementById('content');
  if (content) renderInventory(content);
}

function renderInventory(root) {
  root.innerHTML = `
    <div class="card">
      <div class="cardHead" style="display:flex; justify-content:space-between; align-items:center;">
        <h2>ظ‚ط§ط¦ظ…ط© ط§ظ„ط£طµظ†ط§ظپ ظˆط§ظ„ظ…ط®ط²ظˆظ†</h2>
        <button class="btn" onclick="openItemModal()">+ ط¥ط¶ط§ظپط© طµظ†ظپ ط¬ط¯ظٹط¯</button>
      </div>
      <div class="tableWrap">
        <table>
          <thead>
            <tr><th>ط§ظ„ظƒظˆط¯</th><th>ط§ط³ظ… ط§ظ„طµظ†ظپ</th><th>ط§ظ„ظˆط­ط¯ط©</th><th>ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ظ…ط®ط²ظˆظ†</th><th>ط¥ط¬ط±ط§ط،ط§طھ</th></tr>
          </thead>
          <tbody>
            ${DB.items.map(i => `
              <tr>
                <td>${i.code}</td>
                <td><b>${i.name}</b></td>
                <td>${i.unit}</td>
                <td>${fmt(getItemStock(i.id))}</td>
                <td>
                  <button class="btn secondary" style="padding:3px 8px;" onclick="openItemCard(${i.id})">ظƒط§ط±طھ ط§ظ„طµظ†ظپ</button>
                  <button class="btn" style="padding:3px 8px;" onclick="openItemModal(${i.id})">طھط¹ط¯ظٹظ„</button>
                  <button class="btn danger" style="padding:3px 8px;" onclick="deleteItem(${i.id})">ط­ط°ظپ</button>
                </td>
              </tr>
            `).join('') || '<tr><td colspan=5 class="empty">ظ„ط§ طھظˆط¬ط¯ ط£طµظ†ط§ظپ ظ…ط¹ط±ظپط©</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openItemModal(id = null) {
  const item = id ? DB.items.find(x => x.id === id) : { code: 'IT' + uid(), name: '', unit: 'ظ‚ط·ط¹ط©' };
  openModal(id ? 'طھط¹ط¯ظٹظ„ طµظ†ظپ' : 'ط¥ط¶ط§ظپط© طµظ†ظپ ط¬ط¯ظٹط¯', `
    <div class="field" style="margin-bottom:10px;"><label>ظƒظˆط¯ ط§ظ„طµظ†ظپ</label><input id="mCode" value="${item.code}"></div>
    <div class="field" style="margin-bottom:10px;"><label>ط§ط³ظ… ط§ظ„طµظ†ظپ</label><input id="mName" value="${item.name}"></div>
    <div class="field"><label>ط§ظ„ظˆط­ط¯ط©</label><input id="mUnit" value="${item.unit}"></div>
  `, () => saveItem(id));
}

function saveItem(id) {
  const code = document.getElementById('mCode').value.trim();
  const name = document.getElementById('mName').value.trim();
  const unit = document.getElementById('mUnit').value.trim();
  if(!name) { toast('ظٹط±ط¬ظ‰ ط¥ط¯ط®ط§ظ„ ط§ط³ظ… ط§ظ„طµظ†ظپ'); return; }

  if(id) {
    const it = DB.items.find(x => x.id === id);
    if(it) { it.code = code; it.name = name; it.unit = unit; }
  } else {
    DB.items.push({ id: uid(), code, name, unit });
  }

  saveDB();
  logAudit(id ? 'طھط¹ط¯ظٹظ„' : 'ط¥ط¶ط§ظپط©', 'inventory', 'طµظ†ظپ: ' + name);
  closeModal();
  renderAll();
  toast('طھظ… ط§ظ„ط­ظپط¸ ط¨ظ†ط¬ط§ط­');
}

function deleteItem(id) {
  if (!requirePerm('inventory', 'delete')) return;
  if (!confirm('طھط£ظƒظٹط¯ ط­ط°ظپ ط§ظ„طµظ†ظپطں')) return;
  DB.items = DB.items.filter(x => x.id !== id);
  saveDB();
  renderAll();
  toast('طھظ… ط§ظ„ط­ط°ظپ');
}

function openItemCard(id) {
  const it = DB.items.find(x => x.id === id); 
  if(!it) return;
  const ops = DB.stockOps.filter(o => o.itemId === id);
  const batches = DB.stockBatches.filter(b => b.itemId === id && b.remaining > 0.0001);
  
  openModal('ظƒط§ط±طھ ط§ظ„طµظ†ظپ: ' + it.name + ' (' + it.code + ')', `
    <h3>ط§ظ„ط¯ظپط¹ط© ط§ظ„ط­ط§ظ„ظٹط© ط§ظ„ظ…طھظˆظپط±ط© (FIFO)</h3>
    <div class="tableWrap">
      <table>
        <thead><tr><th>ط§ظ„ظ…ط®ط²ظ†</th><th>ط§ظ„ظƒظ…ظٹط© ط§ظ„ظ…طھط¨ظ‚ظٹط©</th><th>طھظƒظ„ظپط© ط§ظ„ظˆط­ط¯ط©</th><th>ط§ظ„طھط§ط±ظٹط®</th></tr></thead>
        <tbody>
          ${batches.map(b => {
            const wh = DB.warehouses.find(w => w.id == b.warehouseId);
            return `<tr><td>${wh ? wh.name : '-'}</td><td>${fmt(b.remaining)}</td><td>${fmt(b.unitCost)}</td><td>${b.date}</td></tr>`;
          }).join('') || '<tr><td colspan=4 class="empty">ظ„ط§ ظٹظˆط¬ط¯ ط±طµظٹط¯ ظ…طھط¨ظ‚ظچ</td></tr>'}
        </tbody>
      </table>
    </div>
    <h3 style="margin-top:16px;">ط³ط¬ظ„ ط§ظ„ط­ط±ظƒط§طھ</h3>
    <div class="tableWrap">
      <table>
        <thead><tr><th>ط§ظ„طھط§ط±ظٹط®</th><th>ط§ظ„ظ…ط®ط²ظ†</th><th>ظ†ظˆط¹ ط§ظ„ط­ط±ظƒط©</th><th>ظˆط§ط±ط¯</th><th>ظ…ظ†طµط±ظپ</th><th>ط§ظ„ظ…ط±ط¬ط¹</th></tr></thead>
        <tbody>
          ${ops.map(o => {
            const wh = DB.warehouses.find(w => w.id == o.warehouseId);
            return `<tr><td>${o.date}</td><td>${wh ? wh.name : '-'}</td><td>${o.type}</td><td>${o.inQty ? fmt(o.inQty) : ''}</td><td>${o.outQty ? fmt(o.outQty) : ''}</td><td>${o.ref || '-'}</td></tr>`;
          }).join('') || '<tr><td colspan=6 class="empty">ظ„ط§ طھظˆط¬ط¯ ط­ط±ظƒط§طھ ط³ط§ط¨ظ‚ط©</td></tr>'}
        </tbody>
      </table>
    </div>
  `, null, true);
}

/* ---------- 7. ط­ط±ظƒط© ط§ظ„ظ…ط®ط²ظˆظ† (ط§ط³طھظ„ط§ظ… / طµط±ظپ / طھط­ظˆظٹظ„) ---------- */
function logStockOp(itemId, warehouseId, type, inQty, outQty, date, ref) {
  DB.stockOps.push({ 
    id: uid(), 
    itemId, 
    warehouseId, 
    type, 
    inQty: Number(inQty || 0), 
    outQty: Number(outQty || 0), 
    date: date || todayStr(), 
    ref 
  });
  saveDB();
}

function renderStockReceive(root) {
  root.innerHTML = `
    <div class="card">
      <div class="cardHead"><h2>ط¥ط°ظ† ط§ط³طھظ„ط§ظ… ظ…ط®ط²ظ†ظٹ (ظˆط§ط±ط¯)</h2></div>
      <div class="grid3">
        <div class="field"><label>ط§ظ„طµظ†ظپ</label><select id="srItem">${DB.items.map(i => `<option value="${i.id}">${i.name} (${i.code})</option>`).join('')}</select></div>
        <div class="field"><label>ط§ظ„ظ…ط®ط²ظ†</label><select id="srWh">${DB.warehouses.map(w => `<option value="${w.id}">${w.name}</option>`).join('')}</select></div>
        <div class="field"><label>ط§ظ„ظƒظ…ظٹط©</label><input type="number" id="srQty" value="1"></div>
        <div class="field"><label>طھظƒظ„ظپط© ط§ظ„ظˆط­ط¯ط©</label><input type="number" id="srCost" value="0"></div>
        <div class="field"><label>ط§ظ„طھط§ط±ظٹط®</label><input type="date" id="srDate" value="${todayStr()}"></div>
        <div class="field"><label>ظ…ظ„ط§ط­ط¸ط§طھ / ظ…ط±ط¬ط¹</label><input id="srRef"></div>
      </div>
      <button class="btn" style="margin-top:12px;" onclick="saveStockReceive()">ط­ظپط¸ ط¥ط°ظ† ط§ظ„ط§ط³طھظ„ط§ظ…</button>
    </div>
  `;
}

function saveStockReceive() {
  const itemId = Number(document.getElementById('srItem').value);
  const whId = Number(document.getElementById('srWh').value);
  const qty = Number(document.getElementById('srQty').value || 0);
  const cost = Number(document.getElementById('srCost').value || 0);
  const date = document.getElementById('srDate').value;
  const ref = document.getElementById('srRef').value;

  if(!itemId || qty <= 0) { toast('ظٹط±ط¬ظ‰ ظ…ظ„ط، ط§ظ„ط¨ظٹط§ظ†ط§طھ ط¨ط§ظ„ط´ظƒظ„ ط§ظ„طµط­ظٹط­'); return; }

  addStockBatch(itemId, whId, qty, cost, date, 'manual_in', null);
  logStockOp(itemId, whId, 'ط¥ط°ظ† ط§ط³طھظ„ط§ظ…', qty, 0, date, ref || 'ط¥ط°ظ† ط§ط³طھظ„ط§ظ… ظٹط¯ظˆظٹ');
  toast('طھظ… ط¥ط¶ط§ظپط© ط§ظ„ط´ط­ظ†ط© ط¨ظ†ط¬ط§ط­');
  renderAll();
}

function renderStockIssue(root) {
  root.innerHTML = `
    <div class="card">
      <div class="cardHead"><h2>ط¥ط°ظ† طµط±ظپ ظ…ط®ط²ظ†ظٹ (ظ…ظ†طµط±ظپ)</h2></div>
      <div class="grid3">
        <div class="field"><label>ط§ظ„طµظ†ظپ</label><select id="siItem">${DB.items.map(i => `<option value="${i.id}">${i.name} (${i.code})</option>`).join('')}</select></div>
        <div class="field"><label>ط§ظ„ظ…ط®ط²ظ†</label><select id="siWh">${DB.warehouses.map(w => `<option value="${w.id}">${w.name}</option>`).join('')}</select></div>
        <div class="field"><label>ط§ظ„ظƒظ…ظٹط©</label><input type="number" id="siQty" value="1"></div>
        <div class="field"><label>ط§ظ„طھط§ط±ظٹط®</label><input type="date" id="siDate" value="${todayStr()}"></div>
        <div class="field"><label>ظ…ظ„ط§ط­ط¸ط§طھ / ظ…ط±ط¬ط¹</label><input id="siRef"></div>
      </div>
      <button class="btn" style="margin-top:12px;" onclick="saveStockIssue()">ط­ظپط¸ ط¥ط°ظ† ط§ظ„طµط±ظپ</button>
    </div>
  `;
}

function saveStockIssue() {
  const itemId = Number(document.getElementById('siItem').value);
  const whId = Number(document.getElementById('siWh').value);
  const qty = Number(document.getElementById('siQty').value || 0);
  const date = document.getElementById('siDate').value;
  const ref = document.getElementById('siRef').value;

  const avail = getItemStock(itemId, whId);
  if (qty > avail) { alert('ط§ظ„ظƒظ…ظٹط© ط§ظ„ظ…طھط§ط­ط© ظ„ط§ طھظƒظپظٹ! ط§ظ„ط±طµظٹط¯ ط§ظ„ظ…طھط§ط­: ' + avail); return; }

  consumeStockFIFO(itemId, whId, qty, true);
  logStockOp(itemId, whId, 'ط¥ط°ظ† طµط±ظپ', 0, qty, date, ref || 'ط¥ط°ظ† طµط±ظپ ظٹط¯ظˆظٹ');
  toast('طھظ… طµط±ظپ ط§ظ„ظƒظ…ظٹط© ط¨ظ†ط¬ط§ط­');
  renderAll();
}

function renderStockTransfer(root) {
  root.innerHTML = `
    <div class="card">
      <div class="cardHead"><h2>طھط­ظˆظٹظ„ ط¨ظٹظ† ط§ظ„ظ…ط®ط§ط²ظ†</h2></div>
      <div class="grid3">
        <div class="field"><label>ط§ظ„طµظ†ظپ</label><select id="stItem">${DB.items.map(i => `<option value="${i.id}">${i.name} (${i.code})</option>`).join('')}</select></div>
        <div class="field"><label>ظ…ظ† ظ…ط®ط²ظ†</label><select id="stFrom">${DB.warehouses.map(w => `<option value="${w.id}">${w.name}</option>`).join('')}</select></div>
        <div class="field"><label>ط¥ظ„ظ‰ ظ…ط®ط²ظ†</label><select id="stTo">${DB.warehouses.map(w => `<option value="${w.id}">${w.name}</option>`).join('')}</select></div>
        <div class="field"><label>ط§ظ„ظƒظ…ظٹط©</label><input type="number" id="stQty" value="1"></div>
        <div class="field"><label>ط§ظ„طھط§ط±ظٹط®</label><input type="date" id="stDate" value="${todayStr()}"></div>
      </div>
      <button class="btn" style="margin-top:12px;" onclick="saveStockTransfer()">طھط£ظƒظٹط¯ ط§ظ„طھط­ظˆظٹظ„</button>
    </div>
  `;
}

function saveStockTransfer() {
  const itemId = Number(document.getElementById('stItem').value);
  const fromWh = Number(document.getElementById('stFrom').value);
  const toWh = Number(document.getElementById('stTo').value);
  const qty = Number(document.getElementById('stQty').value || 0);
  const date = document.getElementById('stDate').value;

  if (fromWh === toWh) { toast('ط§ظ„ط±ط¬ط§ط، ط§ط®طھظٹط§ط± ظ…ط®ط²ظ†ظٹظ† ظ…ط®طھظ„ظپظٹظ†'); return; }

  const res = consumeStockFIFO(itemId, fromWh, qty, false);
  if (!res) { alert('ط§ظ„ط±طµظٹط¯ ظپظٹ ط§ظ„ظ…ط®ط²ظ† ط§ظ„ظ…طµط¯ط± ظ„ط§ ظٹظƒظپظٹ!'); return; }

  consumeStockFIFO(itemId, fromWh, qty, true);
  const avgCost = res.cost / qty;
  addStockBatch(itemId, toWh, qty, avgCost, date, 'transfer', null);

  logStockOp(itemId, fromWh, 'طھط­ظˆظٹظ„ (ظ…ظ†طµط±ظپ)', 0, qty, date, 'طھط­ظˆظٹظ„ ظ„ظ…ط®ط²ظ† ط¢ط®ط±');
  logStockOp(itemId, toWh, 'طھط­ظˆظٹظ„ (ظˆط§ط±ط¯)', qty, 0, date, 'طھط­ظˆظٹظ„ ظ…ظ† ظ…ط®ط²ظ† ط¢ط®ط±');

  toast('طھظ… ط§ظ„طھط­ظˆظٹظ„ ط¨ظٹظ† ط§ظ„ظ…ط®ط²ظ†ظٹظ† ط¨ظ†ط¬ط§ط­');
  renderAll();
}

function renderStockOps(root) {
  root.innerHTML = `
    <div class="card">
      <div class="cardHead"><h2>ط³ط¬ظ„ ط¹ظ…ظ„ظٹط§طھ ظˆط­ط±ظƒط§طھ ط§ظ„ظ…ط®ط²ظˆظ†</h2></div>
      <div class="tableWrap">
        <table>
          <thead>
            <tr><th>ط§ظ„طھط§ط±ظٹط®</th><th>ط§ظ„طµظ†ظپ</th><th>ط§ظ„ظ…ط®ط²ظ†</th><th>ظ†ظˆط¹ ط§ظ„ط­ط±ظƒط©</th><th>ظˆط§ط±ط¯</th><th>ظ…ظ†طµط±ظپ</th><th>ط§ظ„ظ…ط±ط¬ط¹</th></tr>
          </thead>
          <tbody>
            ${DB.stockOps.slice().reverse().map(o => {
              const it = DB.items.find(i => i.id === o.itemId);
              const wh = DB.warehouses.find(w => w.id === o.warehouseId);
              return `<tr><td>${o.date}</td><td>${it ? it.name : '-'}</td><td>${wh ? wh.name : '-'}</td><td>${o.type}</td><td>${o.inQty ? fmt(o.inQty) : ''}</td><td>${o.outQty ? fmt(o.outQty) : ''}</td><td>${o.ref || '-'}</td></tr>`;
            }).join('') || '<tr><td colspan=7 class="empty">ظ„ط§ طھظˆط¬ط¯ ط­ط±ظƒط§طھ ظ…ط³ط¬ظ„ط©</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

/* ---------- 8. ط§ط³طھظٹط±ط§ط¯ ظˆطھطµط¯ظٹط± Excel ---------- */
function renderInvImportExport(root) {
  root.innerHTML = `
    <div class="card">
      <div class="cardHead"><h2>ط§ط³طھظٹط±ط§ط¯ / طھطµط¯ظٹط± ط§ظ„ط£طµظ†ط§ظپ ط¹ط¨ط± ظ…ظ„ظپط§طھ Excel</h2></div>
      <p style="margin-bottom:12px; font-size:14px; color:#64748b;">ظٹظ…ظƒظ†ظƒ طھطµط¯ظٹط± ظ‚ط§ط¹ط¯ط© ط§ظ„ط£طµظ†ط§ظپ ط§ظ„ط­ط§ظ„ظٹط© ظƒظ…ظ„ظپ Excel ط£ظˆ ط±ظپط¹ ظ…ظ„ظپ ظ„ظ„طھط­ظ…ظٹظ„ طھظ„ظ‚ط§ط¦ظٹط§ظ‹.</p>
      <button class="btn" onclick="exportItemsToExcel()">طھطµط¯ظٹط± ط§ظ„ط£طµظ†ط§ظپ ط¥ظ„ظ‰ Excel</button>
    </div>
  `;
}

function exportItemsToExcel() {
  if (typeof XLSX === 'undefined') { toast('ظ…ظƒطھط¨ط© Excel ط؛ظٹط± ظ…ط«ط¨طھط© ط£ظˆ ط؛ظٹط± ظ…ط­ظ…ظ„ط©'); return; }
  const rows = DB.items.map(i => ({ 
    'ظƒظˆط¯ ط§ظ„طµظ†ظپ': i.code, 
    'ط§ط³ظ… ط§ظ„طµظ†ظپ': i.name, 
    'ط§ظ„ظˆط­ط¯ط©': i.unit, 
    'ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ظ…ط®ط²ظˆظ† ط§ظ„ظ…طھط§ط­': getItemStock(i.id) 
  }));
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'ط§ظ„ط£طµظ†ط§ظپ');
  XLSX.writeFile(wb, 'Items_List.xlsx');
}

/* =========================================================
   ط§ظ„ط¬ط²ط، ط§ظ„ط«ط§ظ„ط«: ط§ظ„ظپظˆط§طھظٹط± ظˆط§ظ„ظ…ط¨ظٹط¹ط§طھ (Sales Invoices)
   ظٹط³طھط®ط¯ظ… ظ†ظپط³ ظ†ظ…ط· addStockBatch/consumeStockFIFO ط§ظ„ظ…ظˆط¬ظˆط¯ ط¨ط§ظ„ط£ط¹ظ„ظ‰طŒ
   ظˆظٹط±ط¨ط· ظƒظ„ ظپط§طھظˆط±ط© ط¨ظ‚ظٹط¯ ظٹظˆظ…ظٹط© ظ…ط²ط¯ظˆط¬ ط¹ظ„ظ‰ ط´ط¬ط±ط© ط§ظ„ط­ط³ط§ط¨ط§طھ.
   ========================================================= */

/* ---------- 9. ط§ظ„ظپظˆط§طھظٹط± - ط§ظ„ظ…ط¨ظٹط¹ط§طھ ---------- */
function findAccountByCode(code) { return DB.accounts.find(a => a.code === code); }

let _invDraftLines = [];

function renderInvoices(root) {
  root.innerHTML = `
    <div class="card">
      <div class="cardHead" style="display:flex; justify-content:space-between; align-items:center;">
        <h2>ظپظˆط§طھظٹط± ط§ظ„ظ…ط¨ظٹط¹ط§طھ</h2>
        <button class="btn" onclick="openSalesInvoiceModal()">+ ظپط§طھظˆط±ط© ط¨ظٹط¹ ط¬ط¯ظٹط¯ط©</button>
      </div>
      <div class="tableWrap">
        <table>
          <thead>
            <tr><th>ط±ظ‚ظ… ط§ظ„ظپط§طھظˆط±ط©</th><th>ط§ظ„طھط§ط±ظٹط®</th><th>ط§ظ„ط¹ظ…ظٹظ„</th><th>ظ†ظˆط¹ ط§ظ„ط¯ظپط¹</th><th>ط§ظ„ط¥ط¬ظ…ط§ظ„ظٹ</th><th>ط¥ط¬ط±ط§ط،ط§طھ</th></tr>
          </thead>
          <tbody>
            ${DB.invoices.slice().reverse().map(inv => {
              const cust = DB.customers.find(c => c.id === inv.customerId);
              return `<tr>
                <td>${inv.number}</td>
                <td>${inv.date}</td>
                <td>${cust ? cust.name : '-'}</td>
                <td>${inv.paymentType === 'cash' ? 'ظ†ظ‚ط¯ظٹ' : 'ط¢ط¬ظ„'}</td>
                <td>${fmt(inv.total)}</td>
                <td><button class="btn secondary" style="padding:3px 8px;" onclick="viewInvoice('${inv.id}')">ط¹ط±ط¶</button></td>
              </tr>`;
            }).join('') || '<tr><td colspan=6 class="empty">ظ„ط§ طھظˆط¬ط¯ ظپظˆط§طھظٹط± ظ…ط³ط¬ظ„ط©</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openSalesInvoiceModal() {
  _invDraftLines = [{
    itemId: DB.items[0] ? DB.items[0].id : '',
    warehouseId: DB.warehouses[0] ? DB.warehouses[0].id : '',
    qty: 1, price: 0
  }];

  const customerOptions = DB.customers.map(c => `<option value="${c.id}">${c.name}</option>`).join('')
    || '<option value="">ظ„ط§ ظٹظˆط¬ط¯ ط¹ظ…ظ„ط§ط، ط¨ط¹ط¯</option>';

  openModal('ظپط§طھظˆط±ط© ط¨ظٹط¹ ط¬ط¯ظٹط¯ط©', `
    <div class="grid3" style="margin-bottom:12px;">
      <div class="field">
        <label>ط§ظ„ط¹ظ…ظٹظ„</label>
        <div style="display:flex; gap:6px;">
          <select id="invCustomer" style="flex:1;">${customerOptions}</select>
          <button class="btn secondary" type="button" style="padding:6px 10px;" onclick="quickAddCustomer()">+ ط¬ط¯ظٹط¯</button>
        </div>
      </div>
      <div class="field"><label>ط§ظ„طھط§ط±ظٹط®</label><input type="date" id="invDate" value="${todayStr()}"></div>
      <div class="field"><label>ظ†ظˆط¹ ط§ظ„ط¯ظپط¹</label>
        <select id="invPayType">
          <option value="cash">ظ†ظ‚ط¯ظٹ</option>
          <option value="credit">ط¢ط¬ظ„ (ط¹ظ„ظ‰ ط§ظ„ط­ط³ط§ط¨)</option>
        </select>
      </div>
    </div>
    <div id="invLinesWrap"></div>
    <button class="btn secondary" type="button" style="margin-top:8px;" onclick="addInvoiceLineRow()">+ ط¥ط¶ط§ظپط© طµظ†ظپ</button>
    <div style="margin-top:14px; text-align:left; font-size:16px;"><b>ط§ظ„ط¥ط¬ظ…ط§ظ„ظٹ: <span id="invTotalLabel">0.00</span></b></div>
  `, () => saveSalesInvoice());

  renderInvoiceLinesTable();
}

function renderInvoiceLinesTable() {
  const wrap = document.getElementById('invLinesWrap');
  if (!wrap) return;
  wrap.innerHTML = `
    <div class="tableWrap">
      <table>
        <thead><tr><th>ط§ظ„طµظ†ظپ</th><th>ط§ظ„ظ…ط®ط²ظ†</th><th>ط§ظ„ظƒظ…ظٹط©</th><th>ط§ظ„ط³ط¹ط±</th><th>ط§ظ„ط±طµظٹط¯ ط§ظ„ظ…طھط§ط­</th><th>ط§ظ„ط¥ط¬ظ…ط§ظ„ظٹ</th><th></th></tr></thead>
        <tbody>
          ${_invDraftLines.map((ln, idx) => {
            const avail = ln.itemId && ln.warehouseId ? getItemStock(Number(ln.itemId), Number(ln.warehouseId)) : 0;
            const lineTotal = Number(ln.qty || 0) * Number(ln.price || 0);
            return `<tr>
              <td><select onchange="updateInvoiceLine(${idx},'itemId',this.value)">
                ${DB.items.map(i => `<option value="${i.id}" ${ln.itemId == i.id ? 'selected' : ''}>${i.name}</option>`).join('')}
              </select></td>
              <td><select onchange="updateInvoiceLine(${idx},'warehouseId',this.value)">
                ${DB.warehouses.map(w => `<option value="${w.id}" ${ln.warehouseId == w.id ? 'selected' : ''}>${w.name}</option>`).join('')}
              </select></td>
              <td><input type="number" min="0" value="${ln.qty}" style="width:70px;" onchange="updateInvoiceLine(${idx},'qty',this.value)"></td>
              <td><input type="number" min="0" value="${ln.price}" style="width:80px;" onchange="updateInvoiceLine(${idx},'price',this.value)"></td>
              <td>${fmt(avail)}</td>
              <td>${fmt(lineTotal)}</td>
              <td>${_invDraftLines.length > 1 ? `<button class="btn danger" style="padding:2px 8px;" onclick="removeInvoiceLineRow(${idx})">ط­ط°ظپ</button>` : ''}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
  const totalLabel = document.getElementById('invTotalLabel');
  if (totalLabel) totalLabel.innerText = fmt(calcInvoiceDraftTotal());
}

function calcInvoiceDraftTotal() {
  return _invDraftLines.reduce((s, ln) => s + Number(ln.qty || 0) * Number(ln.price || 0), 0);
}

function updateInvoiceLine(idx, field, value) {
  if (!_invDraftLines[idx]) return;
  _invDraftLines[idx][field] = (field === 'qty' || field === 'price') ? Number(value) : value;
  renderInvoiceLinesTable();
}

function addInvoiceLineRow() {
  _invDraftLines.push({
    itemId: DB.items[0] ? DB.items[0].id : '',
    warehouseId: DB.warehouses[0] ? DB.warehouses[0].id : '',
    qty: 1, price: 0
  });
  renderInvoiceLinesTable();
}

function removeInvoiceLineRow(idx) {
  _invDraftLines.splice(idx, 1);
  renderInvoiceLinesTable();
}

function quickAddCustomer() {
  const name = prompt('ط§ط³ظ… ط§ظ„ط¹ظ…ظٹظ„ ط§ظ„ط¬ط¯ظٹط¯:');
  if (!name) return;
  DB.customers.push({ id: uid(), name, balance: 0 });
  saveDB();
  openSalesInvoiceModal(); // ط¥ط¹ط§ط¯ط© ظپطھط­ ط§ظ„ظ†ظ…ظˆط°ط¬ ظ…ط¹ طھط­ط¯ظٹط« ظ‚ط§ط¦ظ…ط© ط§ظ„ط¹ظ…ظ„ط§ط،
}

function saveSalesInvoice() {
  const customerId = Number(document.getElementById('invCustomer').value) || null;
  const date = document.getElementById('invDate').value || todayStr();
  const paymentType = document.getElementById('invPayType').value;

  if (!customerId) { toast('ظٹط±ط¬ظ‰ ط§ط®طھظٹط§ط± ط§ظ„ط¹ظ…ظٹظ„ (ط£ظˆ ط¥ط¶ط§ظپط© ط¹ظ…ظٹظ„ ط¬ط¯ظٹط¯ ط£ظˆظ„ط§ظ‹)'); return; }
  if (!_invDraftLines.length) { toast('ط£ط¶ظپ طµظ†ظپظ‹ط§ ظˆط§ط­ط¯ظ‹ط§ ط¹ظ„ظ‰ ط§ظ„ط£ظ‚ظ„'); return; }

  // طھط­ظ‚ظ‚ ظ…ظ† طھظˆظپط± ط§ظ„ط±طµظٹط¯ ظ„ظƒظ„ ط§ظ„ط£طµظ†ط§ظپ ظ‚ط¨ظ„ طھظ†ظپظٹط° ط£ظٹ ط¹ظ…ظ„ظٹط© طµط±ظپ ظپط¹ظ„ظٹط©
  for (const ln of _invDraftLines) {
    const itemId = Number(ln.itemId), whId = Number(ln.warehouseId), qty = Number(ln.qty);
    if (!itemId || !whId || qty <= 0) { toast('ظٹط±ط¬ظ‰ ط§ط³طھظƒظ…ط§ظ„ ط¨ظٹط§ظ†ط§طھ ظƒظ„ ط§ظ„ط£طµظ†ط§ظپ ط¨ط´ظƒظ„ طµط­ظٹط­'); return; }
    const avail = getItemStock(itemId, whId);
    if (qty > avail) {
      const item = DB.items.find(i => i.id === itemId);
      toast(`ط§ظ„ط±طµظٹط¯ ط؛ظٹط± ظƒط§ظپظچ ظ„ظ„طµظ†ظپ "${item ? item.name : itemId}" â€” ط§ظ„ظ…طھط§ط­: ${fmt(avail)}`);
      return;
    }
  }

  let total = 0, totalCost = 0;
  const savedLines = [];
  for (const ln of _invDraftLines) {
    const itemId = Number(ln.itemId), whId = Number(ln.warehouseId), qty = Number(ln.qty), price = Number(ln.price);
    const res = consumeStockFIFO(itemId, whId, qty, true);
    const lineCost = res ? res.cost : 0;
    total += qty * price;
    totalCost += lineCost;
    savedLines.push({ itemId, warehouseId: whId, qty, price, cost: lineCost });
    logStockOp(itemId, whId, 'ظپط§طھظˆط±ط© ط¨ظٹط¹', 0, qty, date, 'ظپط§طھظˆط±ط© ط¨ظٹط¹');
  }

  const invoice = {
    id: uid(),
    number: 'S-' + (DB.invoices.filter(i => i.type === 'sale').length + 1).toString().padStart(4, '0'),
    type: 'sale',
    date, customerId, paymentType,
    lines: savedLines,
    total, totalCost
  };
  DB.invoices.push(invoice);

  // طھط­ط¯ظٹط« ط±طµظٹط¯ ط§ظ„ط¹ظ…ظٹظ„ ظپظٹ ط­ط§ظ„ط© ط§ظ„ط¨ظٹط¹ ط§ظ„ط¢ط¬ظ„ (ط¹ظ„ظ‰ ط§ظ„ط­ط³ط§ط¨)
  if (paymentType === 'credit') {
    const cust = DB.customers.find(c => c.id === customerId);
    if (cust) cust.balance = Number(cust.balance || 0) + total;
  }

  postInvoiceJournal(invoice);

  saveDB();
  logAudit('ط¥ط¶ط§ظپط©', 'invoices', 'ظپط§طھظˆط±ط© ط¨ظٹط¹ ط±ظ‚ظ…: ' + invoice.number);
  closeModal();
  renderInvoices(document.getElementById('content'));
  toast('طھظ… ط­ظپط¸ ط§ظ„ظپط§طھظˆط±ط© ط±ظ‚ظ… ' + invoice.number);
}

function postInvoiceJournal(invoice) {
  const cashAcc = findAccountByCode('111');
  const custAcc = findAccountByCode('113');
  const salesAcc = findAccountByCode('31');
  const cogsAcc = findAccountByCode('41');
  const invAcc = findAccountByCode('114');
  const debitAcc = invoice.paymentType === 'cash' ? cashAcc : custAcc;

  // ظ‚ظٹط¯ ط§ظ„ط¥ظٹط±ط§ط¯: ظ…ظ† ط­/ ط§ظ„ط®ط²ظٹظ†ط© (ظ†ظ‚ط¯ظٹ) ط£ظˆ ط§ظ„ط¹ظ…ظ„ط§ط، (ط¢ط¬ظ„) - ط¥ظ„ظ‰ ط­/ ظ…ط¨ظٹط¹ط§طھ ط§ظ„ط¨ط¶ط§ط¦ط¹
  DB.journalEntries.push({
    id: uid(), date: invoice.date,
    memo: 'ظپط§طھظˆط±ط© ط¨ظٹط¹ ط±ظ‚ظ… ' + invoice.number,
    debitAccountId: debitAcc ? debitAcc.id : null,
    creditAccountId: salesAcc ? salesAcc.id : null,
    amount: invoice.total
  });

  // ظ‚ظٹط¯ طھظƒظ„ظپط© ط§ظ„ط¨ط¶ط§ط¹ط© ط§ظ„ظ…ط¨ط§ط¹ط©: ظ…ظ† ط­/ طھظƒظ„ظپط© ط§ظ„ط¨ط¶ط§ط¹ط© ط§ظ„ظ…ط¨ط§ط¹ط© - ط¥ظ„ظ‰ ط­/ ط§ظ„ظ…ط®ط²ظˆظ†
  if (invoice.totalCost > 0) {
    DB.journalEntries.push({
      id: uid(), date: invoice.date,
      memo: 'طھظƒظ„ظپط© ط¨ط¶ط§ط¹ط© ظپط§طھظˆط±ط© ط¨ظٹط¹ ط±ظ‚ظ… ' + invoice.number,
      debitAccountId: cogsAcc ? cogsAcc.id : null,
      creditAccountId: invAcc ? invAcc.id : null,
      amount: invoice.totalCost
    });
  }
}

function viewInvoice(id) {
  const inv = DB.invoices.find(i => i.id === id);
  if (!inv) return;
  const cust = DB.customers.find(c => c.id === inv.customerId);
  openModal('ظپط§طھظˆط±ط© ط¨ظٹط¹ ط±ظ‚ظ… ' + inv.number, `
    <p><b>ط§ظ„طھط§ط±ظٹط®:</b> ${inv.date} &nbsp;|&nbsp; <b>ط§ظ„ط¹ظ…ظٹظ„:</b> ${cust ? cust.name : '-'} &nbsp;|&nbsp; <b>ظ†ظˆط¹ ط§ظ„ط¯ظپط¹:</b> ${inv.paymentType === 'cash' ? 'ظ†ظ‚ط¯ظٹ' : 'ط¢ط¬ظ„'}</p>
    <div class="tableWrap" style="margin-top:12px;">
      <table>
        <thead><tr><th>ط§ظ„طµظ†ظپ</th><th>ط§ظ„ظ…ط®ط²ظ†</th><th>ط§ظ„ظƒظ…ظٹط©</th><th>ط§ظ„ط³ط¹ط±</th><th>ط§ظ„ط¥ط¬ظ…ط§ظ„ظٹ</th></tr></thead>
        <tbody>
          ${inv.lines.map(ln => {
            const item = DB.items.find(i => i.id === ln.itemId);
            const wh = DB.warehouses.find(w => w.id === ln.warehouseId);
            return `<tr><td>${item ? item.name : '-'}</td><td>${wh ? wh.name : '-'}</td><td>${fmt(ln.qty)}</td><td>${fmt(ln.price)}</td><td>${fmt(ln.qty * ln.price)}</td></tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
    <div style="margin-top:14px; text-align:left; font-size:16px;"><b>ط§ظ„ط¥ط¬ظ…ط§ظ„ظٹ: ${fmt(inv.total)}</b></div>
  `, null, true);
}

// ط§ظ„طھط´ط؛ظٹظ„ ظˆط§ظ„طھظ‡ظٹط¦ط© ط§ظ„ظ…ط¨ط§ط´ط±ط© ط¨ط¹ط¯ ظپطھط­ ط§ظ„ظ†ط¸ط§ظ…
// loadDB ط£طµط¨ط­طھ ط؛ظٹط± ظ…طھط²ط§ظ…ظ†ط© (ط¨طھطھطµظ„ ط¨ظ€ Firebase ط§ظ„ط£ظˆظ„) ظپظ…ط­طھط§ط¬ظٹظ† ظ†ظ†طھط¸ط±ظ‡ط§
// ظ‚ط¨ظ„ ظ…ط§ ظ†ط¸ظ‡ط± ط´ط§ط´ط© ط§ظ„ط¯ط®ظˆظ„طŒ ط¹ط´ط§ظ† ظ…ظٹط­طµظ„ط´ ط¯ط®ظˆظ„ ط¨ط¨ظٹط§ظ†ط§طھ ظپط§ط¶ظٹط© ظ‚ط¨ظ„ ظ…ط§ طھظˆطµظ„ ظ…ظ† ط§ظ„ط³ط­ط§ط¨ط©.
window.onload = function() {
  const loadingEl = document.getElementById('loadingScreen');
  const loginEl = document.getElementById('loginScreen');
  loadDB(function() {
    if (loadingEl) loadingEl.style.display = 'none';
    if (loginEl) loginEl.style.display = 'flex';
  });
};
