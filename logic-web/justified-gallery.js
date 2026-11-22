/**
 * معرض الصور بلا قص (Justified Gallery) — موقع تكنيكات
 * ------------------------------------------------------------
 * الفكرة: كل صورة تُعرض بنسبتها الأصلية (العرض ÷ الطول) فلا يُقص منها شيء،
 * والصور تُجمع في صفوف متساوية الارتفاع تملأ عرض الصفحة.
 *
 * المطلوب من الخادم: حفظ عرض الصورة وطولها عند الرفع (width, height).
 *
 * الاستخدام:
 *   const rows = buildRows(photos, 2.6);
 *   renderGallery(document.querySelector('#gallery'), rows);
 */

/**
 * يقسّم الصور إلى صفوف.
 * @param {Array<{src:string, width:number, height:number, alt?:string, featured?:boolean}>} photos قائمة الصور
 * @param {number} target مجموع النسب في الصف الواحد. كلما كبر الرقم صارت الصور أصغر والصف أكثر صورًا.
 *                        المستخدم في التصاميم: 2.6 لصفحة المصور، 2.8 للرئيسية بجانب الشريط الجانبي، 3.2 للمشاركات، 2.4 للتطبيق.
 * @returns {Array<Array<{photo?:object, ratio:number, spacer?:boolean}>>}
 */
function buildRows(photos, target = 2.6) {
  const rows = [];
  let row = [];
  let sum = 0;
  for (const p of photos) {
    const ratio = p.width / p.height;          // نسبة الصورة: أكبر من 1 أفقية، أقل من 1 طولية، 1 مربعة
    row.push({ photo: p, ratio });
    sum += ratio;
    if (sum >= target) {                        // اكتمل الصف
      rows.push(row);
      row = [];
      sum = 0;
    }
  }
  if (row.length) {
    // الصف الأخير: نضيف فراغًا مخفيًا حتى لا تتمدد صوره وتكبر أكثر من اللازم
    const rest = target - sum;
    if (rest > 0.05) row.push({ spacer: true, ratio: rest });
    rows.push(row);
  }
  return rows;
}

/**
 * يرسم الصفوف داخل عنصر الصفحة.
 * كل خانة: flex = نسبة الصورة، و aspect-ratio = نسبة الصورة ⇒ ارتفاعات الصف متساوية تلقائيًا.
 * الصورة بـ object-fit: contain حتى لا يُقص أي جزء منها.
 */
function renderGallery(container, rows, gap = 6) {
  container.innerHTML = '';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.gap = gap + 'px';
  for (const row of rows) {
    const line = document.createElement('div');
    line.style.display = 'flex';
    line.style.gap = gap + 'px';
    for (const cell of row) {
      const box = document.createElement('div');
      box.style.flex = `${cell.ratio} 1 0%`;
      box.style.minWidth = '0';
      if (cell.spacer) { box.style.visibility = 'hidden'; line.appendChild(box); continue; }
      box.style.aspectRatio = String(cell.ratio);
      box.style.position = 'relative';
      box.style.background = '#E3E7EE';
      const img = document.createElement('img');
      img.src = cell.photo.src;
      img.alt = cell.photo.alt || '';
      img.loading = 'lazy';                       // تحميل كسول لتسريع الصفحة
      img.style.cssText = 'width:100%;height:100%;object-fit:contain;display:block';
      box.appendChild(img);
      if (cell.photo.featured) {                  // نجمة صفراء للعمل المميز
        const star = document.createElement('span');
        star.setAttribute('aria-label', 'عمل مميز');
        star.textContent = '★';
        star.style.cssText = 'position:absolute;top:10px;right:10px;width:26px;height:26px;border-radius:50%;background:#EDE518;display:flex;align-items:center;justify-content:center;font-size:14px';
        box.appendChild(star);
      }
      line.appendChild(box);
    }
    container.appendChild(line);
  }
}

if (typeof module !== 'undefined') module.exports = { buildRows, renderGallery };
