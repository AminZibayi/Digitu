# راهنمای فارسی Digikala Variant Creator

این ابزار یک CLI مبتنی بر Node.js است که فقط برای ساخت Variant روی محصولاتی که از قبل در دیجی کالا وجود دارند استفاده می شود.

- ایجاد محصول جدید انجام نمی دهد.
- ایجاد ویژگی (attribute) یا تصویر انجام نمی دهد.
- ورودی را از JSON و تنظیمات را از YAML می خواند.

## پیش نیازها

- Node.js (نسخه ای که با پروژه شما سازگار است)
- pnpm
- مقداردهی `DIGIKALA_COOKIE` در محیط اجرا

نمونه در PowerShell:

```powershell
$env:DIGIKALA_COOKIE = "your_cookie_here"
```

## نصب

```bash
pnpm install
```

## ورودی محصولات

فایل ورودی باید آرایه ای از آبجکت ها باشد:

```json
[
  { "productId": 21581903, "productTitle": "تابلو کرم" },
  { "productId": 21581904, "productTitle": "تابلو مدرن" }
]
```

نمونه آماده: `fixtures/products.sample.json`

## ساختار کامل فایل کانفیگ

منبع اصلی اعتبارسنجی: `schemas/config.schema.json`

فایل نمونه: `config.example.yaml`

در ادامه یک نمونه کامل و عملی:

```yaml
version: 1

api:
  baseUrl: https://seller.digikala.com/api/v2
  cookie: ${DIGIKALA_COOKIE}
  referer: https://seller.digikala.com/pwa/product/21581903/variant
  themeId: 1
  site: digikala
  timeoutMs: 20000
  maxRetries: 3
  retryDelayMs: 800

variantDefaults:
  package_weight: 700
  package_length: 100
  package_height: 10
  package_width: 100
  lead_time: 2
  marketplace_seller_stock: 100
  order_limit: 30
  warranty_id: 272
  is_active: true
  supplier_code: ""
  fbs_lead_time: 48
  shipping_type: both

variantDefaultsBySize:
  100x70:
    package_weight: 1200
    package_length: 110
    package_height: 12
    package_width: 80
  130x200:
    package_weight: 2500
    package_length: 205
    package_height: 14
    package_width: 135

sizes:
  - key: 100x70
    themeValueId: 108432
    active: true
  - key: 130x200
    themeValueId: 105738
    active: true

pricing:
  baseCurrency: IRR
  usdToBaseRate: 950000
  defaultBasePrice: 18000000
  basePriceBySize:
    100x70: 21000000
    130x200: 25000000
  conflictResolution: first-match-wins
  rules:
    - id: size-100x70-kerm-usd
      priority: 10
      when:
        sizesAny: [100x70]
        titleIncludesAny: ["کرم"]
      then:
        setUsdPrice: 100

    - id: high-stock-large-size
      priority: 20
      when:
        sizesAny: [130x200]
        titleIncludesAny: ["تابلو", "مدرن"]
      then:
        setBasePrice: 27000000
        overrideFields:
          marketplace_seller_stock: 150

idempotency:
  enabled: true
  stateFile: idempotency-state.json
```

## راهنمای بخش های مهم کانفیگ

### 1) بخش `api`

- `baseUrl`, `cookie`, `referer`, `themeId` اجباری هستند.
- `timeoutMs` حداقل `1000`.
- `maxRetries` و `retryDelayMs` می توانند `0` باشند.
- برای جلوگیری از لو رفتن اطلاعات، `cookie` را داخل فایل commit نکنید.

### 2) بخش `variantDefaults`

این بخش فیلدهای پایه ای است که برای همه Variantها ارسال می شود.

فیلدهای اجباری:

- `package_weight`
- `package_length`
- `package_height`
- `package_width`
- `lead_time`
- `marketplace_seller_stock`
- `order_limit`
- `warranty_id`
- `is_active`
- `supplier_code`
- `fbs_lead_time`
- `shipping_type`

مقادیر معتبر:

- `shipping_type`: یکی از `both`, `fbs`, `marketplace`
- بعضی فیلدها باید بزرگ تر از 0 باشند (مثل ابعاد و وزن)

### 3) بخش `variantDefaultsBySize` (اختیاری)

برای override کردن مقادیر پایه در هر سایز.

ترتیب اعمال:

1. ابتدا `variantDefaults`
2. سپس `variantDefaultsBySize[sizeKey]` (در صورت وجود)
3. سپس `pricing.rules[].then.overrideFields` (اگر rule match شود)

### 4) بخش `sizes`

- هر آیتم باید `key` و `themeValueId` داشته باشد.
- `active` اختیاری است (پیش فرض `true`).
- قیمت پایه هر سایز بهتر است در `basePriceBySize` تعریف شود.

### 5) بخش `pricing`

اجباری ها:

- `baseCurrency`
- `basePriceBySize`
- `conflictResolution`
- `rules`

فیلدهای مهم:

- `usdToBaseRate`: نرخ تبدیل دلار به ارز پایه
- `defaultBasePrice`: قیمت پیش فرض برای سایزی که در map قیمت نبود
- `conflictResolution`: فقط یکی از دو حالت:
  - `first-match-wins`
  - `last-match-wins`

## شرایط (Conditions) در Ruleها

هر Rule این ساختار را دارد:

```yaml
- id: some-rule
  priority: 10
  when:
    sizesAny: [100x70]
    titleIncludesAny: ["کرم"]
    titleExcludesAny: ["کوچک"]
  then:
    setBasePrice: 25000000
    # یا
    # setUsdPrice: 100
    overrideFields:
      marketplace_seller_stock: 200
```

### `when` چگونه کار می کند؟

- `sizesAny`: اگر سایز جاری داخل لیست باشد، شرط سایز true است.
- `titleIncludesAny`: اگر حداقل یکی از کلمات داخل عنوان محصول بود، شرط true است.
- `titleExcludesAny`: اگر هر کدام از کلمات داخل عنوان بود، rule رد می شود.

نکته: مقایسه عنوان بر اساس matching رشته ای یونیکد انجام می شود و برای فارسی مناسب است.

### `then` چه کاری می کند؟

- `setBasePrice`: قیمت نهایی را مستقیم با ارز پایه تنظیم می کند.
- `setUsdPrice`: ابتدا با `usdToBaseRate` تبدیل می شود، بعد به عنوان قیمت پایه اعمال می شود.
- `overrideFields`: فیلدهای payload را در سطح Variant override می کند.

## ترتیب و حل تعارض Ruleها

Ruleها قطعی (deterministic) اعمال می شوند:

1. ابتدا بر اساس `priority` صعودی مرتب می شوند.
2. اگر priority برابر باشد، بر اساس `id` به صورت لغت نامه ای مرتب می شوند.
3. سپس طبق `pricing.conflictResolution` اعمال می شوند.

### حالت `first-match-wins`

- اولین Rule منطبق، انتخاب می شود.
- Ruleهای بعدی نادیده گرفته می شوند.

مناسب وقتی که می خواهید یک قانون مشخص برنده نهایی باشد.

### حالت `last-match-wins`

- همه Ruleهای منطبق به ترتیب اعمال می شوند.
- Ruleهای انتهایی می توانند مقدار قبلی را override کنند.

مناسب برای سیاست های مرحله ای یا لایه ای.

## مثال های کاربردی

### مثال 1: قیمت دلاری برای یک سایز خاص

```yaml
pricing:
  usdToBaseRate: 950000
  rules:
    - id: usd-rule
      priority: 10
      when:
        sizesAny: [100x70]
        titleIncludesAny: ["کرم"]
      then:
        setUsdPrice: 100
```

قیمت نهایی تقریبی: `100 * 950000 = 95000000`

### مثال 2: افزایش موجودی فقط برای یک سایز

```yaml
rules:
  - id: stock-up-large
    priority: 20
    when:
      sizesAny: [130x200]
      titleIncludesAny: ["تابلو"]
    then:
      overrideFields:
        marketplace_seller_stock: 150
```

### مثال 3: رد کردن عنوان های ناخواسته

```yaml
rules:
  - id: ignore-small
    priority: 5
    when:
      titleIncludesAny: ["کرم"]
      titleExcludesAny: ["کوچک"]
    then:
      setBasePrice: 20000000
```

اگر عنوان شامل `کوچک` باشد، این Rule حتی با وجود `کرم` اعمال نمی شود.

## اسکریپت های pnpm

بر اساس `package.json` پروژه:

### `pnpm start`

اجرای CLI اصلی:

```bash
pnpm start -- --config ./config.example.yaml --input ./fixtures/products.sample.json --output-dir ./output
```

نکته: هر چیزی بعد از `--` به CLI پاس می شود.

### `pnpm dry-run`

اجرای dry-run با فایل live-test:

```bash
pnpm dry-run
```

- درخواست POST واقعی ارسال نمی شود.
- برای بررسی payload و قیمت ها قبل از اجرا عالی است.

### `pnpm update`

اجرای واقعی روی fixture زنده:

```bash
pnpm update
```

- در این حالت، ایجاد Variant واقعی انجام می شود.
- قبل از اجرا، dry-run را حتما بررسی کنید.

### `pnpm test`

اجرای تست ها:

```bash
pnpm test
```

### `pnpm test:watch`

اجرای تست در watch mode:

```bash
pnpm test:watch
```

## اجرای پیشنهادی امن

1. اعتبارسنجی کانفیگ خودتان با نمونه نزدیک به production
2. اجرای dry-run
3. بررسی خروجی های `output/results-<timestamp>.json`
4. بررسی لاگ `logs/variant-creator.log`
5. اجرای واقعی با `pnpm update` یا `pnpm start` بدون `--dry-run`

## فایل های خروجی مهم

- `output/results-<timestamp>.json`: نتیجه هر اجرا برای هر محصول
- `output/idempotency-state.json`: وضعیت جلوگیری از اجرای تکراری
- `logs/variant-creator.log`: لاگ کامل اجرا

## نکات پایداری و ایمنی

- قبل از POST، ورودی و کانفیگ validate می شوند.
- خطاهای موقت (مثل 429 یا 5xx) با retry مدیریت می شوند.
- idempotency از تکرار ناخواسته ساخت Variant جلوگیری می کند.
- اطلاعات حساس (cookie) را وارد git نکنید.

## خطاهای رایج

- خطای schema: معمولاً یک فیلد اجباری جا افتاده یا نوع داده اشتباه است.
- خطای قیمت: `setUsdPrice` بدون `usdToBaseRate` منطقی نیست.
- خطای rule: اگر `conflictResolution` درست انتخاب نشود، نتیجه با انتظار شما فرق می کند.
- عنوان ها match نمی شوند: عبارت های `titleIncludesAny` را دقیق تر و واقعی تر انتخاب کنید.

## یک چک لیست سریع قبل از اجرا

- `DIGIKALA_COOKIE` ست شده است.
- `themeId`, `themeValueId` ها صحیح هستند.
- `sizes` و `basePriceBySize` با هم همخوانی دارند.
- ruleها `id` و `priority` مشخص دارند.
- حداقل یک بار `pnpm dry-run` اجرا شده است.
