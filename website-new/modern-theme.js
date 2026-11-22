(() => {
  // 1. تضمين ملف التنسيق العصري إذا لم يكن موجوداً
  if (!document.querySelector('link[href*="modern-theme.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'modern-theme.css';
    document.head.appendChild(link);
  }

  // 2. حقن شاشة اللودينج بأنيميشن عدسة تكنيكات إذا لم تكن موجودة في الصفحة
  if (!document.getElementById('taknikatSplash')) {
    const splash = document.createElement('div');
    splash.id = 'taknikatSplash';
    splash.innerHTML = `
      <div class="splash-lens">
        <div class="aperture-ring"></div>
        <svg class="aperture-blades" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="44" stroke="#349DD7" stroke-width="2" stroke-dasharray="6 4" opacity="0.6"/>
          <path d="M50 16 L65 50 L50 42 Z" fill="#349DD7" opacity="0.8"/>
          <path d="M78 35 L58 65 L50 54 Z" fill="#CE107E" opacity="0.85"/>
          <path d="M78 65 L42 68 L48 56 Z" fill="#EDE518" opacity="0.9"/>
          <path d="M50 84 L35 50 L50 58 Z" fill="#349DD7" opacity="0.8"/>
          <path d="M22 65 L42 35 L50 46 Z" fill="#CE107E" opacity="0.85"/>
          <path d="M22 35 L58 32 L52 44 Z" fill="#EDE518" opacity="0.9"/>
          <circle cx="50" cy="50" r="14" fill="#1B2533" stroke="#FFFFFF" stroke-width="2.5"/>
        </svg>
      </div>
      <div class="splash-logo-text">
        <span></span>
        <span>تكنيكات</span>
        <span style="background:var(--blue)"></span>
      </div>
      <div class="splash-bar">
        <div class="splash-bar-fill"></div>
      </div>
    `;
    document.body.appendChild(splash);
  }

  // إخفاء شاشة اللودينج بنعومة بعد التحميل
  const hideSplash = () => {
    setTimeout(() => {
      const splash = document.getElementById('taknikatSplash');
      if (splash) splash.classList.add('loaded');
    }, 600);
  };
  if (document.readyState === 'complete') hideSplash();
  else window.addEventListener('load', hideSplash);

  // 3. توجيه جميع أزرار طلب الخدمة إلى صفحة 11-service-order.html
  document.querySelectorAll('a, button').forEach(el => {
    const text = (el.textContent || '').trim();
    if (text === 'اطلب الخدمة' || text === 'اطلب خدمة' || text.includes('اطلب الخدمة')) {
      if (el.tagName === 'A') {
        el.setAttribute('href', '11-service-order.html');
      } else {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          window.location.href = '11-service-order.html';
        });
      }
    }
  });

  // 4. روابط المسارات المتبقية لصفحات الموقع
  const routes = {
    'الرئيسية': '01-home.html',
    'المقالات': '09-articles.html',
    'مقالات': '09-articles.html',
    'الفيديوهات': '10-videos.html',
    'فيديوهات': '10-videos.html',
    'الخدمات': '03-services.html',
    'المنتجات': '04-products.html',
    'الفعاليات': '05-events.html',
    'شاهد الكل': '01-home.html',
    'شاهد المشاركات': '06-event-details.html',
    'التفاصيل': '02-photographer-profile.html',
    'اطلب الخدمة': '11-service-order.html',
    'اطلب': '11-service-order.html',
    'اطلب خدمة': '11-service-order.html',
    'شارك الآن': '07-event-entry.html',
    'اعتماد النتائج': '08-results-approval.html'
  };

  document.querySelectorAll('a[href="#"]').forEach(link => {
    const text = (link.textContent || '').replace(/\s+/g, ' ').trim();
    if (routes[text]) {
      link.setAttribute('href', routes[text]);
    }
  });
})();
