// =====================================================================
// ترتيب النتائج وحسم التعادل — نظام تحكيم تكنيكات
// ---------------------------------------------------------------------
// 1) تحكيم أعمى (موجود حاليًا).
// 2) درجة واحدة من 10 لكل محكّم، والنتيجة = المتوسط بالكسور.
// 3) مركز واحد لكل مصور: أفضل أعماله فقط.
// 4) كسر التعادل بالترتيب:
//    أ) المتوسط الأعلى  ب) عدد المحكمين الذين أعطوا أعلى درجة
//    ج) تصويت اللجنة بين المتعادلين فقط  د) قرار المنظّم مع سبب إلزامي يُنشر.
//    ممنوع: الإعجابات والمشاهدات.
// 5) بعد النشر تُقفل النتائج.
// 6) الفعاليات الشرفية: «مشاركة متميزة» لكل من أفضل أعماله ≥ الحد، أبجديًا بلا مراكز.
// =====================================================================

class Entry {
  final int id;                 // رقم المشاركة (#7898)
  final String photographerId;  // معرّف المصور (مخفي عن المحكمين)
  final List<double> scores;    // درجات المحكمين من 10
  String? tieNote;              // ملاحظة حسم التعادل — تظهر تحت المركز
  Entry({required this.id, required this.photographerId, required this.scores});

  double get average => scores.reduce((a, b) => a + b) / scores.length;
  int get topScoreCount {
    final m = scores.reduce((a, b) => a > b ? a : b);
    return scores.where((s) => s == m).length;
  }
}

enum TieMethod { committeeVote, organizerDecision }

class RankingResult {
  final List<Entry> ranked;       // أفضل عمل لكل مصور مرتبًا
  final List<Entry> excluded;     // أعمال ثانية لنفس المصور (لا تدخل المراكز)
  final List<List<Entry>> ties;   // تعادلات داخل المراكز تحتاج قرارًا
  RankingResult(this.ranked, this.excluded, this.ties);
  bool get readyToPublish => ties.isEmpty; // زر «اعتماد ونشر» يعمل فقط بلا تعادلات معلّقة
}

int _compare(Entry a, Entry b) {
  final byAvg = b.average.compareTo(a.average);
  if (byAvg != 0) return byAvg;
  return b.topScoreCount.compareTo(a.topScoreCount);
}

/// يحسب الترتيب المبدئي ويكشف التعادلات
RankingResult rankEntries(List<Entry> entries, {int places = 3}) {
  final sorted = [...entries]..sort(_compare);
  final best = <String, Entry>{};
  final excluded = <Entry>[];
  for (final e in sorted) {
    if (best.containsKey(e.photographerId)) {
      excluded.add(e);
    } else {
      best[e.photographerId] = e;
    }
  }
  final ranked = best.values.toList();
  final ties = <List<Entry>>[];
  var i = 0;
  while (i < ranked.length) {
    var j = i + 1;
    while (j < ranked.length && _compare(ranked[i], ranked[j]) == 0) {
      j++;
    }
    if (j - i > 1 && i < places) ties.add(ranked.sublist(i, j));
    i = j;
  }
  return RankingResult(ranked, excluded, ties);
}

/// يطبّق قرار الحسم على مجموعة متعادلة
void resolveTie(RankingResult r, List<Entry> group, int winnerId, TieMethod method, {String reason = ''}) {
  if (method == TieMethod.organizerDecision && reason.trim().length < 4) {
    throw ArgumentError('سبب القرار مطلوب عند حسم التعادل بقرار المنظّم');
  }
  final start = r.ranked.indexOf(group.first);
  final winner = group.firstWhere((e) => e.id == winnerId);
  winner.tieNote = method == TieMethod.committeeVote
      ? 'تعادل في المتوسط، وحُسم بتصويت لجنة التحكيم.'
      : 'تعادل في المتوسط، وحُسم بقرار المنظّم: $reason';
  final others = group.where((e) => e.id != winnerId).toList();
  r.ranked.replaceRange(start, start + group.length, [winner, ...others]);
  r.ties.remove(group);
}

/// المستحقون لـ«مشاركة متميزة» — أبجديًا
List<String> honoraryList(List<Entry> entries, {double threshold = 7, required String Function(String id) nameOf}) {
  final best = <String, double>{};
  for (final e in entries) {
    final avg = e.average;
    if (!best.containsKey(e.photographerId) || avg > best[e.photographerId]!) best[e.photographerId] = avg;
  }
  final names = best.entries.where((x) => x.value >= threshold).map((x) => nameOf(x.key)).toList()..sort();
  return names;
}
