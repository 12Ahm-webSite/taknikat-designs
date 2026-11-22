/**
 * تصاميم تكنيكات — سكربت تفاعلات شاشات التطبيق الحديثة
 * Eye-Pleasing Mobile App Interactions & Animations
 */

(function () {
  'use strict';

  let splashTimer = null;

  // 1. تحديث وقت شريط الحالة بالوقت الفعلي
  function initClock() {
    const clockEl = document.querySelector('.tkn-status-time');
    if (!clockEl) return;
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    clockEl.textContent = `${hours}:${minutes}`;
  }

  // 2. إظهار وإخفاء شاشة البداية والأنميشن المريح للعين
  function showSplash() {
    const splash = document.querySelector('.tkn-splash-overlay');
    if (!splash) return;

    if (splashTimer) clearTimeout(splashTimer);

    splash.style.display = 'flex';
    void splash.offsetWidth; // force reflow
    splash.classList.remove('hidden');

    // بقاء الأنميشن 1.8 ثانية لتأمل حركة العدسة بهدوء
    splashTimer = setTimeout(() => {
      dismissSplash();
    }, 1800);
  }

  function dismissSplash() {
    const splash = document.querySelector('.tkn-splash-overlay');
    if (!splash) return;

    splash.classList.add('hidden');
    setTimeout(() => {
      splash.style.display = 'none';
    }, 550);
  }

  function initSplash() {
    const splash = document.querySelector('.tkn-splash-overlay');
    if (!splash) return;

    // تشغيل تلقائي عند فتح الصفحة
    showSplash();

    // إمكانية الإلغاء الفوري بالنقر على أي مكان في الشاشة الافتتاحية
    splash.addEventListener('click', () => {
      if (splashTimer) clearTimeout(splashTimer);
      dismissSplash();
    });

    // ربط إعادة تشغيل الأنميشن بالنقر على الشعار أو الجزيرة التفاعلية أو زر الإعادة
    document.querySelectorAll('.tkn-replay-splash-pill, .tkn-dynamic-island, img[alt="تكنيكات"]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        showSplash();
      });
      el.style.cursor = 'pointer';
      el.title = 'انقر لتشغيل أنميشن العدسة المريح';
    });
  }

  // 3. تفاعل زر الإعجاب والقلب المنبثق (Heart Pop)
  function initLikeButtons() {
    document.querySelectorAll('.tkn-heart-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const isLiked = btn.classList.toggle('liked');
        const countSpan = btn.querySelector('.tkn-like-count');

        if (countSpan) {
          let count = parseInt(countSpan.textContent.trim(), 10) || 0;
          count = isLiked ? count + 1 : Math.max(0, count - 1);
          countSpan.textContent = count;
        }
      });
    });
  }

  // 4. إغلاق اللوحة السفلية عند النقر على الخلفية المعتمة
  function initBackdropDismiss() {
    const backdrop = document.querySelector('.tkn-sheet-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          const returnUrl = backdrop.dataset.return || '01-home.html';
          window.location.href = returnUrl;
        }
      });
    }

    const handle = document.querySelector('.tkn-sheet-handle');
    if (handle) {
      handle.addEventListener('click', () => {
        const returnUrl = handle.dataset.return || '01-home.html';
        window.location.href = returnUrl;
      });
    }
  }

  // 5. زر الرجوع الذكي (Smart Back Button)
  function initBackButtons() {
    document.querySelectorAll('.tkn-back-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const customTarget = btn.getAttribute('href');
        if (customTarget && customTarget !== '#') return;

        e.preventDefault();
        if (window.history.length > 1) {
          window.history.back();
        } else {
          window.location.href = '01-home.html';
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initClock();
    initSplash();
    initLikeButtons();
    initBackdropDismiss();
    initBackButtons();
  });

  // كشف الدالة للنطاق العام للاستدعاء الخارجي إن لزم
  window.tknReplayAnimation = showSplash;
})();
