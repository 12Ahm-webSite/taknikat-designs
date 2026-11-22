/**
 * ترتيب النتائج وحسم التعادل — نظام تحكيم تكنيكات
 * ------------------------------------------------------------
 * القواعد المعتمدة (تُكتب في شروط كل فعالية قبل بدايتها):
 *  1) تحكيم أعمى: المحكّم يرى الصورة ورقمها فقط دون اسم المصور (موجود حاليًا).
 *  2) كل محكّم يعطي درجة واحدة من 10، والنتيجة = متوسط درجات المحكمين (بالكسور).
 *  3) مركز واحد لكل مصور: يُحتسب أفضل أعماله فقط، وعمله الثاني لا يدخل المراكز.
 *  4) كسر التعادل بالترتيب:
 *     أ) المتوسط الأعلى.
 *     ب) عدد المحكمين الذين أعطوا العمل أعلى درجة فيه (أكثر = يتقدّم).
 *     ج) تصويت لجنة التحكيم بين الأعمال المتعادلة فقط.
 *     د) قرار المنظّم مع سبب مكتوب إلزامي يُنشر مع النتائج.
 *  ممنوع استخدام الإعجابات أو المشاهدات لكسر التعادل (يمكن التلاعب بها).
 *  5) بعد «اعتماد ونشر» تُقفل النتائج، وأي تعديل لاحق يظهر كملاحظة عامة.
 *  6) الفعاليات الشرفية: كل مصور متوسط أفضل أعماله ≥ الحد (افتراضيًا 7) يأخذ «مشاركة متميزة»،
 *     وتُعرض الأسماء أبجديًا بلا مراكز ⇐ لا يوجد تعادل.
 */

/** متوسط درجات المحكمين لعمل واحد */
const average = (scores) => scores.reduce((a, b) => a + b, 0) / scores.length;

/** عدد المحكمين الذين أعطوا أعلى درجة حصل عليها العمل (القاعدة ب) */
const topScoreCount = (scores) => { const m = Math.max(...scores); return scores.filter((s) => s === m).length; };

/**
 * يحسب الترتيب المبدئي ويكشف التعادلات التي تحتاج قرارًا.
 * @param {Array<{id:number, photographerId:string, scores:number[]}>} entries كل المشاركات مع درجات المحكمين
 * @param {number} places عدد المراكز (1 إلى 3)
 * @returns {{ranked:Array, excluded:Array, ties:Array<Array>}}
 *   ranked  : أفضل عمل لكل مصور مرتبًا.
 *   excluded: الأعمال الثانية لنفس المصور (تظهر باهتة في لوحة المنظّم).
 *   ties    : مجموعات الأعمال المتعادلة داخل المراكز — تحتاج تصويت اللجنة أو قرار المنظّم.
 */
function rankEntries(entries, places = 3) {
  const cmp = (a, b) => (average(b.scores) - average(a.scores)) || (topScoreCount(b.scores) - topScoreCount(a.scores));
  const sorted = entries.slice().sort(cmp);
  const best = new Map();                         // أفضل عمل لكل مصور
  const excluded = [];
  for (const e of sorted) {
    if (best.has(e.photographerId)) excluded.push(e);
    else best.set(e.photographerId, e);
  }
  const ranked = Array.from(best.values());
  // كشف التعادل: نفس المتوسط ونفس عدد الدرجات العليا، ويمس أحد المراكز
  const ties = [];
  for (let i = 0; i < ranked.length; ) {
    let j = i + 1;
    while (j < ranked.length && cmp(ranked[i], ranked[j]) === 0) j++;
    if (j - i > 1 && i < places) ties.push(ranked.slice(i, j));
    i = j;
  }
  return { ranked, excluded, ties };
}

/**
 * يطبّق قرار الحسم على مجموعة متعادلة.
 * @param {Array} ranked الترتيب من rankEntries
 * @param {Array} tieGroup مجموعة التعادل
 * @param {number} winnerId رقم العمل الفائز بالمركز
 * @param {'vote'|'organizer'} method طريقة الحسم
 * @param {string} reason السبب — إلزامي إذا كانت الطريقة «قرار المنظّم»
 */
function resolveTie(ranked, tieGroup, winnerId, method, reason = '') {
  if (method === 'organizer' && reason.trim().length < 4) throw new Error('سبب القرار مطلوب عند حسم التعادل بقرار المنظّم');
  const start = ranked.indexOf(tieGroup[0]);
  const winner = tieGroup.find((e) => e.id === winnerId);
  const others = tieGroup.filter((e) => e.id !== winnerId);
  const note = method === 'vote' ? 'تعادل في المتوسط، وحُسم بتصويت لجنة التحكيم.' : `تعادل في المتوسط، وحُسم بقرار المنظّم: ${reason}`;
  winner.tieNote = note;                           // تظهر تحت المركز في صفحة النتائج
  ranked.splice(start, tieGroup.length, winner, ...others);
  return ranked;
}

/** المستحقون لشهادة «مشاركة متميزة» في الفعاليات الشرفية — أبجديًا بلا ترتيب */
function honoraryList(entries, threshold = 7, nameOf = (id) => id) {
  const best = new Map();
  for (const e of entries) {
    const avg = average(e.scores);
    if (!best.has(e.photographerId) || avg > best.get(e.photographerId)) best.set(e.photographerId, avg);
  }
  return Array.from(best.entries()).filter(([, avg]) => avg >= threshold)
    .map(([id]) => nameOf(id)).sort((a, b) => a.localeCompare(b, 'ar'));
}

if (typeof module !== 'undefined') module.exports = { average, topScoreCount, rankEntries, resolveTie, honoraryList };
