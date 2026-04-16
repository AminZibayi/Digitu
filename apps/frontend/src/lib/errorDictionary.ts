const FA_ERROR_MESSAGES: Record<string, string> = {
  INVALID_REQUEST: 'درخواست نامعتبر است.',
  SETTINGS_NOT_CONFIGURED: 'تنظیمات احراز هویت هنوز ذخیره نشده است.',
  SETTINGS_SAVE_FAILED: 'ذخیره تنظیمات ناموفق بود.',
  SETTINGS_LOAD_FAILED: 'بارگذاری تنظیمات ناموفق بود.',
  STATS_LOAD_FAILED: 'بارگذاری آمار ناموفق بود.',
  UPLOAD_FAILED: 'آپلود محصولات ناموفق بود.',
  VARIANT_CREATION_FAILED: 'ایجاد تنوع‌ها ناموفق بود.',
};

export function resolvePersianErrorMessage(code: string | undefined, englishMessage: string): string {
  if (code && FA_ERROR_MESSAGES[code]) {
    return FA_ERROR_MESSAGES[code];
  }
  return englishMessage;
}
