// =====================================================================
// معرض الصور بلا قص (Justified Gallery)
// ---------------------------------------------------------------------
// كل صورة تُعرض بنسبتها الأصلية (العرض ÷ الطول) فلا يُقص منها شيء،
// والصور تُجمع في صفوف متساوية الارتفاع تملأ عرض الشاشة.
// المطلوب من الخادم: إرسال عرض وطول كل صورة (width, height).
// يُستخدم في: الرئيسية (الإلهام)، صفحة المصور (ألبوماتي)، داخل الفعالية (المشاركات).
// =====================================================================
import 'package:flutter/material.dart';
import '../theme/taknikat_theme.dart';

/// بيانات صورة واحدة في المعرض
class GalleryPhoto {
  final String url;
  final double width;      // عرض الصورة الأصلي بالبكسل
  final double height;     // طول الصورة الأصلي بالبكسل
  final bool featured;     // عمل مميز ⇐ نجمة صفراء
  final String? caption;   // سطر تحت الصورة (مثل: #7898 · 10/10) — اختياري
  const GalleryPhoto({required this.url, required this.width, required this.height, this.featured = false, this.caption});
  double get ratio => width / height; // أكبر من 1 أفقية، أقل من 1 طولية، 1 مربعة
}

class JustifiedGallery extends StatelessWidget {
  final List<GalleryPhoto> photos;
  /// مجموع النسب في الصف الواحد: 2.4 للجوال (كلما كبر صارت الصور أصغر)
  final double target;
  final double gap;
  final double radius;
  final void Function(GalleryPhoto photo)? onTap;
  const JustifiedGallery({super.key, required this.photos, this.target = 2.4, this.gap = TkSize.galleryGap, this.radius = 6, this.onTap});

  /// يقسّم الصور إلى صفوف. الصف الأخير يأخذ فراغًا مخفيًا حتى لا تكبر صوره أكثر من اللازم.
  List<List<_Cell>> _rows() {
    final rows = <List<_Cell>>[];
    var row = <_Cell>[];
    var sum = 0.0;
    for (final p in photos) {
      row.add(_Cell(p, p.ratio));
      sum += p.ratio;
      if (sum >= target) { rows.add(row); row = []; sum = 0; }
    }
    if (row.isNotEmpty) {
      final rest = target - sum;
      if (rest > 0.05) row.add(_Cell(null, rest)); // فراغ مخفي
      rows.add(row);
    }
    return rows;
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        for (final row in _rows())
          Padding(
            padding: EdgeInsets.only(bottom: gap),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                for (var i = 0; i < row.length; i++) ...[
                  if (i > 0) SizedBox(width: gap),
                  // flex بنسبة الصورة ⇒ كل صور الصف بنفس الارتفاع
                  Expanded(
                    flex: (row[i].ratio * 1000).round(),
                    child: row[i].photo == null ? const SizedBox.shrink() : _tile(row[i].photo!),
                  ),
                ],
              ],
            ),
          ),
      ],
    );
  }

  Widget _tile(GalleryPhoto p) {
    return GestureDetector(
      onTap: onTap == null ? null : () => onTap!(p),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(radius),
            child: AspectRatio(
              aspectRatio: p.ratio,
              child: Stack(
                fit: StackFit.expand,
                children: [
                  Container(color: TkColors.placeholder),
                  // BoxFit.contain ⇒ لا قص إطلاقًا
                  Image.network(p.url, fit: BoxFit.contain),
                  if (p.featured)
                    const PositionedDirectional(
                      top: 6, start: 6,
                      child: CircleAvatar(radius: 10, backgroundColor: TkColors.yellow, child: Icon(Icons.star, size: 12, color: TkColors.ink)),
                    ),
                ],
              ),
            ),
          ),
          if (p.caption != null)
            Padding(
              padding: const EdgeInsets.only(top: 3),
              child: Text(p.caption!, maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(fontSize: 11, color: TkColors.muted)),
            ),
        ],
      ),
    );
  }
}

class _Cell {
  final GalleryPhoto? photo; // null = فراغ مخفي في الصف الأخير
  final double ratio;
  _Cell(this.photo, this.ratio);
}
