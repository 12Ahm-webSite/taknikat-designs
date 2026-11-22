// =====================================================================
// الشريط السفلي للتطبيق
// ---------------------------------------------------------------------
// ثلاثة عناصر: الرئيسية — زر الإضافة الدائري في الوسط — حسابي.
// زر الإضافة يفتح لوحة من الأسفل (Bottom Sheet) فيها «منشور جديد»
// وأنواع الإضافة بأسمائها (خدمة، منتج، فيديو، مشاركة في فعالية، ألبوم، مقال، تدوينة).
// كل أيقونة معها اسمها — لا أيقونات بدون كلمات.
// =====================================================================
import 'package:flutter/material.dart';
import '../theme/taknikat_theme.dart';

enum TkTab { home, profile }

class TaknikatBottomNav extends StatelessWidget {
  final TkTab current;
  final ValueChanged<TkTab> onTab;
  final VoidCallback onAdd; // يفتح لوحة الإضافة
  const TaknikatBottomNav({super.key, required this.current, required this.onTab, required this.onAdd});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: TkSize.bottomNavHeight,
      decoration: const BoxDecoration(color: Colors.white, border: Border(top: BorderSide(color: TkColors.line))),
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _item(TkTab.home, Icons.home_outlined, 'الرئيسية'),
          // الزر الدائري الأوسط مرفوع فوق الشريط
          Transform.translate(
            offset: const Offset(0, -22),
            child: Material(
              color: TkColors.blueStrong,
              shape: const CircleBorder(side: BorderSide(color: Colors.white, width: 4)),
              elevation: 6,
              child: InkWell(
                customBorder: const CircleBorder(),
                onTap: onAdd,
                child: const SizedBox(width: 60, height: 60, child: Icon(Icons.add, color: Colors.white, size: 28, semanticLabel: 'إضافة واستكشاف')),
              ),
            ),
          ),
          _item(TkTab.profile, Icons.person_outline, 'حسابي'),
        ],
      ),
    );
  }

  Widget _item(TkTab tab, IconData icon, String label) {
    final on = tab == current;
    final color = on ? TkColors.blueStrong : TkColors.muted;
    return Expanded(
      child: InkWell(
        onTap: () => onTab(tab),
        child: Padding(
          padding: const EdgeInsets.only(top: 10),
          child: Column(children: [
            Icon(icon, color: color, size: 24),
            Text(label, style: TextStyle(fontSize: 12, color: color, fontWeight: on ? FontWeight.w700 : FontWeight.w500)),
          ]),
        ),
      ),
    );
  }
}
