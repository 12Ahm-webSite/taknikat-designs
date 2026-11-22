(() => {
  const isAppScreen = location.pathname.includes('/app-screens/');
  const isWebsite = location.pathname.includes('/website/');

  const style = document.createElement('style');
  style.textContent = `
    html { scroll-behavior: smooth; }

    a, button {
      transition: transform .18s ease, box-shadow .18s ease, background-color .18s ease, opacity .18s ease;
    }
    a:active, button:active { transform: scale(.97); }
    a[href]:not([href="#"]):hover, button:hover { opacity: .88; }

    img { transition: transform .28s ease, filter .28s ease; }
    img:hover { filter: saturate(1.06); }

    @media (prefers-reduced-motion: reduce) {
      html { scroll-behavior: auto; }
      a, button, img {
        transition: none !important;
      }
    }
  `;
  document.head.appendChild(style);

  const websiteRoutes = {
    'الرئيسية': '01-home.html',
    'الخدمات': '03-services.html',
    'المنتجات': '04-products.html',
    'الفيديوهات': '01-home.html',
    'الفعاليات': '05-events.html',
    'مقالات': '01-home.html',
    'المقالات': '01-home.html',
    'من نحن': '01-home.html',
    'اتصل بنا': '01-home.html',
    'تسجيل الدخول': '01-home.html',
    'شاهد الكل': '01-home.html',
    'شاهد المشاركات': '06-event-details.html',
    'التفاصيل': '02-photographer-profile.html',
    'اطلب الخدمة': '02-photographer-profile.html',
    'اطلب': '02-photographer-profile.html',
    'شارك الآن': '07-event-entry.html',
    'اعتماد النتائج': '08-results-approval.html'
  };

  const appRoutes = {
    'الرئيسية': '01-home.html',
    'شاهد الكل': '01-home.html',
    'الخدمات': '07-services.html',
    'المنتجات': '08-products.html',
    'الفيديوهات': '09-videos.html',
    'الفعاليات': '10-events.html',
    'حسابي': '04-profile.html',
    'حالة الحساب': '06-account.html',
    'طلباتي': '14-orders.html',
    'تعديل البيانات': '13-editprofile.html',
    'معلومات العضوية': '05-profileinfo.html',
    'اعتماد النتائج': '15-approval.html',
    'تصفّح الخدمات': '07-services.html'
  };

  const routes = isAppScreen ? appRoutes : websiteRoutes;

  document.querySelectorAll('a[href="#"]').forEach((link) => {
    const text = (link.textContent || '').replace(/\s+/g, ' ').trim();
    let route = routes[text];

    if (!route && isWebsite) {
      if (text.includes('احجز') || text.includes('اطلب الخدمة') || text.includes('تصوير') || text.includes('بيع صور')) {
        route = '03-services.html';
      } else if (text.includes('سوفت بوكس') || text.includes('عدسة') || text.includes('Vintage')) {
        route = '04-products.html';
      } else if (text.includes('الحركة') || text.includes('اليوم الوطني')) {
        route = '05-events.html';
      } else if (text === 'App Store' || text === 'Google Play') {
        route = '../app-screens/01-home.html';
      }
    }

    if (!route) {
      const aria = link.getAttribute('aria-label') || '';
      if (aria === 'رجوع') return;
      if (aria === 'إغلاق') {
        route = isAppScreen ? '04-profile.html' : '01-home.html';
      }
      if (link.closest('[data-nav="event"]') || text.includes('فعالية') || text.includes('مشاركة')) {
        route = isAppScreen ? '11-event.html' : '06-event-details.html';
      }
      if (text.includes('مشاهدة') || text.includes('المشاركة')) {
        route = isAppScreen ? '12-entry.html' : '07-event-entry.html';
      }
    }

    if (route) {
      link.setAttribute('href', route);
    }
  });

  if (isAppScreen) {
    document.documentElement.style.background = '#E9EDF3';
    document.body.style.margin = '0';
    document.body.style.minHeight = '100vh';
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'flex-start';

    const appFrame = document.querySelector('body > div');
    if (appFrame) {
      appFrame.style.margin = '0 auto';
    }

    const logo = document.querySelector('img[alt="تكنيكات"]');
    if (logo && !logo.closest('a')) {
      const link = document.createElement('a');
      link.href = '01-home.html';
      link.setAttribute('aria-label', 'الصفحة الرئيسية');
      logo.replaceWith(link);
      link.appendChild(logo);
    }

    document.querySelectorAll('a[href="#"]').forEach((link) => {
      if (link.textContent.includes('الصفحة الرئيسية')) {
        link.setAttribute('href', '01-home.html');
      }
    });
  }

  if (isWebsite) {
    document.querySelectorAll('header a').forEach((link) => {
      if (!link.getAttribute('href')) return;
      if (link.getAttribute('href') === '#' && link.querySelector('img')) {
        link.setAttribute('href', '01-home.html');
      }
    });
  }

  // زر التبديل (عرض الموقع / عرض التطبيق) تم إخفاؤه بناءً على الطلب
  /*
  const switchButton = document.createElement('a');
  switchButton.textContent = isAppScreen ? 'عرض الموقع' : 'عرض التطبيق';
  switchButton.href = isAppScreen ? '../website/01-home.html' : '../app-screens/01-home.html';
  Object.assign(switchButton.style, {
    position: 'fixed',
    left: '18px',
    bottom: '18px',
    zIndex: '100',
    padding: '10px 16px',
    borderRadius: '999px',
    background: '#1F7CB6',
    color: '#FFFFFF',
    fontFamily: 'system-ui, sans-serif',
    fontSize: '14px',
    fontWeight: '700',
    boxShadow: '0 6px 20px rgba(27,37,51,.18)'
  });
  document.body.appendChild(switchButton);
  */
})();
