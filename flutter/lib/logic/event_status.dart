// =====================================================================
// حالة الفعالية
// ---------------------------------------------------------------------
// «فعالية جارية»: تاريخ اليوم بين البداية والنهاية (شاملًا).
//   ⇐ تظهر بطاقة «تحدٍّ وفعالية جارية» وزر «شارك الآن».
// لا توجد فعالية جارية ⇐ البطاقة لا تظهر إطلاقًا.
// قسم النتائج: بعد انتهاء الفعالية + حلول تاريخ الإعلان + نشر المنظّم للنتائج.
// =====================================================================

class TkEvent {
  final String title;
  final DateTime start;          // تاريخ البداية
  final DateTime end;            // تاريخ النهاية
  final DateTime resultsDate;    // تاريخ إعلان النتائج
  final bool resultsPublished;   // هل اعتمد المنظّم النتائج ونشرها؟
  const TkEvent({required this.title, required this.start, required this.end, required this.resultsDate, this.resultsPublished = false});
}

/// يحذف الوقت ويبقي التاريخ فقط (للمقارنة باليوم)
DateTime _day(DateTime d) => DateTime(d.year, d.month, d.day);

/// هل الفعالية جارية اليوم؟ (استخدم توقيت السعودية للخادم)
bool isEventLive(TkEvent e, {DateTime? now}) {
  final t = _day(now ?? DateTime.now());
  return !t.isBefore(_day(e.start)) && !t.isAfter(_day(e.end));
}

/// أول فعالية جارية أو null
TkEvent? findLiveEvent(List<TkEvent> events, {DateTime? now}) {
  for (final e in events) {
    if (isEventLive(e, now: now)) return e;
  }
  return null;
}

/// هل نعرض قسم النتائج؟
bool shouldShowResults(TkEvent e, {DateTime? now}) {
  final t = _day(now ?? DateTime.now());
  return !isEventLive(e, now: now) && !t.isBefore(_day(e.resultsDate)) && e.resultsPublished;
}
