# Digikala Seller API Spec (Category 6946)

Version: 2.0
Category: تابلو (6946)
Base URL: `https://seller.digikala.com/api/v2`

## Authentication

All requests require a valid seller cookie (session + JWT), sent via `cookie` header.

Required cookie parts in practice:

- `PHPSESSID`
- `tracker_session`
- `seller_api_access_token`
- `seller_api_otp_token`

Uploader source:

- `DIGIKALA_COOKIE` env var
- fallback: `CONFIG.cookie` in `digikala-uploader.js`

## Core Endpoints

### 1) Create/Update Draft

`POST /product-creation/save`

Used in three phases:

- phase A: basic info and draft creation
- phase B: attributes and dimensions
- phase C: finalization with image IDs

### 2) Save Auto Title

`POST /product-creation/auto-title/save`

### 3) Upload Image

`POST /product-creation/images/upload`

- multipart form-data
- fields: `file`, `slot`

### 4) Category Validation Metadata

`GET /product-creation/category/6946/validation`

Used to resolve valid brands/options/attribute choices.

## Payload Contracts

### A) Basic Info Save

```json
{
  "category_id": 6946,
  "division_id": 4928,
  "brand_id": 719,
  "model": "تابلو فرض",
  "product_type_ids": [24054],
  "is_iranian": true,
  "product_classes": ["2"],
  "general_mefa_id": 893,
  "exclusive_mefa_id": "",
  "fake": false
}
```

Important:

- `division_id` is not the same thing as `product_type_ids`.
- both are expected in real payload flow.

### B) Attribute Save

```json
{
  "draft_product_id": 6977605,
  "category_id": 6946,
  "attributes": {
    "6946": {
      "4931": [21209, 21210],
      "5127": [15907],
      "5218": [14500],
      "6597": "زیبا",
      "8482": [52502],
      "10043": [51393],
      "10129": "آبی",
      "10132": [52453],
      "119": "توضیحات",
      "5065": [19139],
      "5080": [19150],
      "7830": [35285],
      "10130": "12",
      "10131": [52450]
    }
  },
  "advantages": ["رنگ خوب"],
  "disadvantages": ["گرد و تیز"],
  "width": 0,
  "height": 0,
  "length": 0,
  "weight": 0,
  "package_width": null,
  "package_height": null,
  "package_length": null,
  "package_weight": null
}
```

### C) Title Save

```json
{
  "draft_product_id": 6977605,
  "title_fa": "تابلو طرح زیبا مدل تابلو فرض فریم آبی",
  "title_en": ""
}
```

### D) Finalization Save

```json
{
  "category_id": 6946,
  "draft_product_id": 6977605,
  "only_b2b": false,
  "photos_detail": {
    "main_image": "7RyIf",
    "order": "7RyIf,7RyIi",
    "images": [{ "encrypted_id": "7RyIf", "active": true }, { "encrypted_id": "7RyIi" }]
  }
}
```

## Category Constants (6946)

### Known Divisions

- `4928`: تابلو
- `9657`: تابلو نوری
- `9655`: تابلو پازل

### Known Product Type (observed)

- `24054`: ساده

### Known General MEFA

- `893`: domestic
- `894`: imported

## Attribute ID Map (Observed)

- `4931`: نوع کاربرد (multi)
- `5127`: تعداد تکه (select)
- `5218`: ویژگی ظاهری تابلو (select)
- `6597`: طرح (text)
- `8482`: نوع تابلو (multi)
- `10043`: جنس قاب تابلو (multi)
- `10129`: رنگ فریم (text)
- `10132`: محافظ سطح (select)
- `119`: سایر توضیحات (text)
- `5065`: مقاوم در برابر (select)
- `5080`: نحوه شست وشو (select)
- `7830`: طرح کلی (select)
- `10130`: ضخامت فریم (text/number-as-string)
- `10131`: نوع چاپ (select)

## Required vs Recommended

Hard-required for stable upload flow:

- `category_id`, `division_id`, `brand_id`, `model`, `product_type_ids`
- `general_mefa_id`
- `draft_product_id` in non-create phases
- `title_fa`
- at least one uploaded image id in finalization

Recommended for approval quality:

- meaningful attributes for category
- non-empty `advantages` / `disadvantages`
- realistic packaging fields

## Error Handling

Treat responses as failed when `status !== "ok"` even if HTTP code is 200.

## Pacing

Configured in uploader:

- between products: 2000 ms
- between phases: 600 ms
- between images: ~300 ms
