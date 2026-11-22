/**
 * حالة الفعالية — موقع تكنيكات
 * ------------------------------------------------------------
 * القاعدة المعتمدة:
 *  - «فعالية جارية»: تاريخ اليوم بين تاريخ البداية وتاريخ النهاية (شاملًا).
 *    ⇐ تظهر بطاقة «تحدٍّ وفعالية جارية» في الرئيسية وأعلى صفحة الفعاليات، ويظهر زر «شارك الآن».
 *  - لا توجد فعالية جارية ⇐ البطاقة لا تظهر إطلاقًا، وصفحة الفعاليات تعرض «كل الفعاليات».
 *  - قسم النتائج يظهر فقط بعد انتهاء الفعالية وبعد أن يعتمد المنظّم النتائج وينشرها.
 * التواريخ بصيغة YYYY-MM-DD وتوقيت السعودية.
 */

/** تاريخ اليوم بتوقيت الرياض بصيغة YYYY-MM-DD */
function todayRiyadh() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Riyadh' }).format(new Date());
}

/** هل الفعالية جارية الآن؟ */
function isEventLive(event, today = todayRiyadh()) {
  return event.start <= today && today <= event.end;
}

/** أول فعالية جارية من القائمة، أو null إن لم توجد */
function findLiveEvent(events, today = todayRiyadh()) {
  return events.find((e) => isEventLive(e, today)) || null;
}

/** هل نعرض قسم النتائج؟ (انتهت الفعالية + حلّ تاريخ الإعلان + نشرها المنظّم) */
function shouldShowResults(event, today = todayRiyadh()) {
  return !isEventLive(event, today) && today >= event.resultsDate && event.resultsPublished === true;
}

if (typeof module !== 'undefined') module.exports = { todayRiyadh, isEventLive, findLiveEvent, shouldShowResults };
