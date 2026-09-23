// 1. دالة مجانية لجلب عنوان IP الخاص بالجهاز تلقائياً
async function getClientIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (e) {
        return 'غير معروف';
    }
}

// 2. كائن إدارة البيانات للتواصل مع Firebase بدلاً من LocalStorage
const Storage = {
    // جلب البيانات المخزنة من Firebase Realtime Database
    async getData(key) {
        try {
            if (!window.db) {
                console.warn('Firebase لم يتصل بعد، يتم جلب البيانات محلياً');
                const localData = localStorage.getItem(key);
                return localData ? JSON.parse(localData) : [];
            }
            const snapshot = await window.db.ref(key).once('value');
            const data = snapshot.val();
            return data ? (Array.isArray(data) ? data : Object.values(data)) : [];
        } catch (e) {
            console.error('خطأ في جلب البيانات من السيرفر:', e);
            const fallback = localStorage.getItem(key);
            return fallback ? JSON.parse(fallback) : [];
        }
    },

    // حفظ البيانات في Firebase وتسجيل الـ IP وتاريخ التسجيل تلقائياً
    async saveData(key, data) {
        try {
            const userIP = await getClientIP();

            // إذا كانت البيانات مصفوفة حسابات/شركات، نضمن وجود الـ IP وتاريخ الإنشاء
            if (Array.isArray(data)) {
                data = data.map(item => {
                    if (typeof item === 'object' && item !== null) {
                        if (!item.ip) item.ip = userIP;
                        if (!item.createdAt) item.createdAt = new Date().toISOString();
                    }
                    return item;
                });
            }

            // الحفظ المحلي للاحتياط
            localStorage.setItem(key, JSON.stringify(data));

            // الحفظ السحابي في Firebase ليكون متاحاً لجميع الأجهزة
            if (window.db) {
                await window.db.ref(key).set(data);
            }
            return true;
        } catch (e) {
            console.error('خطأ في حفظ البيانات سحابياً:', e);
            localStorage.setItem(key, JSON.stringify(data));
            return false;
        }
    },

    // الاستماع للتحديثات المباشرة (لكي يرى المدير أي حساب جديد فور تسجيله من أي جهاز)
    listenToData(key, callback) {
        if (window.db) {
            window.db.ref(key).on('value', (snapshot) => {
                const data = snapshot.val();
                const result = data ? (Array.isArray(data) ? data : Object.values(data)) : [];
                callback(result);
            });
        }
    }
};
