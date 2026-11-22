// =====================================================================
// هوية تكنيكات في تطبيق Flutter (آيفون وأندرويد)
// ---------------------------------------------------------------------
// كل الألوان والمقاسات هنا مطابقة للموقع الجديد. غيّر القيمة هنا فقط
// لتتغير في التطبيق كله.
// الخط: غير معتمد بعد — ضع اسم خط تكنيكات في [TaknikatTheme.fontFamily].
// =====================================================================
import 'package:flutter/material.dart';

/// ألوان الهوية
class TkColors {
  TkColors._();
  static const blue = Color(0xFF349DD7);        // أزرق تكنيكات الأساسي — الهيدر والتبويب النشط
  static const blueStrong = Color(0xFF1F7CB6);  // أزرق أغمق للأزرار والروابط (تباين أوضح)
  static const blueSoft = Color(0xFFEAF5FC);    // خلفية فاتحة للأيقونات والوسوم
  static const pink = Color(0xFFCE107E);        // وردي الشعار — شارات الرتب وإطار الصورة الشخصية
  static const pinkSoft = Color(0xFFFCE8F3);
  static const yellow = Color(0xFFEDE518);      // أصفر الشعار — النقاط ونجمة العمل المميز
  static const goldSoft = Color(0xFFFBF4E4);    // خلفية التقييم والنقاط
  static const goldText = Color(0xFF7A5B0C);
  static const bg = Color(0xFFF1F2F6);          // خلفية الشاشات (سادة — بدون زخرفة)
  static const surface = Colors.white;          // البطاقات
  static const ink = Color(0xFF1B2533);         // النص الأساسي
  static const muted = Color(0xFF5A6577);       // النص الثانوي
  static const line = Color(0xFFE6E9EF);        // الحدود والفواصل
  static const placeholder = Color(0xFFE3E7EE); // خلفية الصورة أثناء التحميل
  static const dark = Color(0xFF0F1620);        // خلفية عرض الصورة الكاملة
  static const danger = Color(0xFFC4262E);      // التعادل والأخطاء
  static const success = Color(0xFF1E8E50);
  // ميداليات المراكز
  static const gold = Color(0xFFE3B505);
  static const silver = Color(0xFFB8C2CC);
  static const bronze = Color(0xFFC98A4B);
}

/// المسافات وأنصاف الأقطار
class TkSize {
  TkSize._();
  static const pagePadding = 16.0;   // هامش الشاشة الجانبي
  static const gap = 10.0;           // المسافة بين البطاقات
  static const galleryGap = 4.0;     // المسافة بين صور المعرض
  static const cardRadius = 18.0;    // زوايا البطاقات
  static const buttonRadius = 14.0;  // زوايا الأزرار والحقول
  static const buttonHeight = 50.0;  // ارتفاع الأزرار الرئيسية
  static const touchMin = 44.0;      // أقل مساحة لمس مريحة
  static const bottomNavHeight = 84.0;
}

/// الثيم العام للتطبيق — يُمرَّر إلى MaterialApp(theme: TaknikatTheme.light())
class TaknikatTheme {
  TaknikatTheme._();

  /// اسم الخط — يُستبدل بخط تكنيكات المعتمد (أضف ملفات الخط في pubspec.yaml)
  static const String? fontFamily = null;

  static ThemeData light() {
    final base = ThemeData(
      useMaterial3: true,
      fontFamily: fontFamily,
      scaffoldBackgroundColor: TkColors.bg,
      colorScheme: ColorScheme.fromSeed(
        seedColor: TkColors.blue,
        primary: TkColors.blueStrong,
        secondary: TkColors.pink,
        surface: TkColors.surface,
      ),
    );
    return base.copyWith(
      // نصوص العناوين والفقرات
      textTheme: base.textTheme.apply(bodyColor: TkColors.ink, displayColor: TkColors.ink),
      // شريط العنوان أعلى الشاشة: أبيض وبدون ظل
      appBarTheme: const AppBarTheme(
        backgroundColor: TkColors.bg,
        foregroundColor: TkColors.ink,
        elevation: 0,
        centerTitle: true,
        titleTextStyle: TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: TkColors.ink),
      ),
      // البطاقات البيضاء بزوايا 18
      cardTheme: CardThemeData(
        color: TkColors.surface,
        elevation: 0,
        margin: EdgeInsets.zero,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(TkSize.cardRadius)),
      ),
      // الزر الرئيسي الأزرق
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          backgroundColor: TkColors.blueStrong,
          foregroundColor: Colors.white,
          minimumSize: const Size.fromHeight(TkSize.buttonHeight),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(TkSize.buttonRadius)),
          textStyle: const TextStyle(fontWeight: FontWeight.w700, fontSize: 16),
        ),
      ),
      // الزر الثانوي بحد أزرق
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: TkColors.blueStrong,
          side: const BorderSide(color: TkColors.blueStrong, width: 1.5),
          minimumSize: const Size.fromHeight(TkSize.buttonHeight),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(TkSize.buttonRadius)),
        ),
      ),
      // حقول الإدخال: بيضاء بحد خفيف
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: TkColors.surface,
        contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(TkSize.buttonRadius),
          borderSide: const BorderSide(color: TkColors.line),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(TkSize.buttonRadius),
          borderSide: const BorderSide(color: TkColors.line),
        ),
      ),
      // الوسوم (التصنيفات والمهارات)
      chipTheme: ChipThemeData(
        backgroundColor: TkColors.surface,
        selectedColor: TkColors.blueStrong,
        labelStyle: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600),
        shape: const StadiumBorder(),
        side: BorderSide.none,
      ),
    );
  }
}
