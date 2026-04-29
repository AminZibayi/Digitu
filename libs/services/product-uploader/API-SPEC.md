# Digikala Seller API Specification

**Version:** 1.0  
**Category:** تابلو (Picture/Tableau) - ID: 6946  
**Base URL:** https://seller.digikala.com/api/v2

---

## Authentication

All requests require the following headers:

```
accept: application/json, text/plain, */*
accept-language: en-US,en;q=0.7
content-type: application/json (for POST requests)
cookie: [seller_api_access_token (JWT), PHPSESSID, tracker_session, seller_api_otp_token]
referer: https://seller.digikala.com/pwa/product/create/1
x-web-optimize-response: 1
sec-fetch-site: same-origin
sec-fetch-mode: cors
sec-fetch-dest: empty
```

**Token Expiration:** The JWT (`seller_api_access_token`) expires and must be refreshed from browser DevTools.

---

## API Endpoints

### 1. Get Category Tree (for reference)

**GET** `/categories/tree`

Returns hierarchical list of all product categories.

**Query Parameters:**

- `categoryId` (optional, integer): Filter to specific category

**Response:**

```json
{
  "status": "ok",
  "data": {
    "items": [
      {
        "id": 6946,
        "title": "تابلو",
        "leaf": true,
        "theme": null
      }
    ]
  }
}
```

---

### 2. Get Category Details

**GET** `/categories/{categoryId}`

Get specific category information including parent hierarchy.

**Example:**  
`GET /categories/6946?categoryId=6946`

**Response:**

```json
{
  "status": "ok",
  "data": {
    "category": {
      "id": 6946,
      "title": "تابلو",
      "active": true,
      "is_leaf": true
    },
    "parents": [
      [
        {
          "id": 5967,
          "title_fa": "خانه و آشپزخانه",
          "is_leaf": false,
          "level": 1
        }
      ]
    ]
  }
}
```

---

### 3. Get Category Validation Schema

**GET** `/product-creation/category/{categoryId}/validation`

Retrieves validation rules, required fields, and brand/attribute options for the category.

**Example:**  
`GET /product-creation/category/6946/validation`

**Response Structure:**

```json
{
  "status": "ok",
  "data": {
    "isValid": true,
    "bind": {
      "brands": [
        {
          "id": "9",
          "text": "توشیبا Toshiba",
          "title_fa": "توشیبا",
          "title_en": "Toshiba",
          "logo_id": "https://dkstatics-public.digikala.com/..."
        }
      ]
    }
  }
}
```

---

### 4. Validate Basic Product Info (Creates/Returns Draft)

**POST** `/product-creation/product/detail/validation`

Used as step 1 in the successful flow. This endpoint validates base fields and returns `draft_product_id` for next steps.

**Request Body (complete observed shape):**

```json
{
  "category_id": 6946,
  "division_id": 4928,
  "brand_id": 719,
  "model": "مدل-طبیعت-001",
  "product_type_ids": [24054],
  "is_iranian": true,
  "product_classes": ["2"],
  "general_mefa_id": 893,
  "description": "توضیح کامل محصول با طول مناسب",
  "exclusive_mefa_id": null,
  "fake": false,
  "fake_reasons": [],
  "advantages": ["رنگ خوب"],
  "disadvantages": ["گرد و تیز"],
  "package_width": 420,
  "package_height": 620,
  "package_length": 30,
  "package_weight": 900,
  "only_cf_fields": {
    "status": "marketable",
    "platforms": ["digikala"],
    "other_titles": []
  }
}
```

**Field Definitions:**

| Field                         | Type        | Required | Notes                                                     |
| ----------------------------- | ----------- | -------- | --------------------------------------------------------- |
| `category_id`                 | Integer     | Yes      | Always 6946 for تابلو category                            |
| `division_id`                 | Integer     | Yes      | E.g., 4928 (تابلو), 9657 (تابلو نوری), 9655 (تابلو پازل)  |
| `brand_id`                    | Integer     | Yes      | Valid Digikala brand ID                                   |
| `model`                       | String      | Yes      | Unique product model/SKU per brand                        |
| `product_type_ids`            | Array       | Yes      | Product type IDs, e.g., [24054] (تابلو ساده)              |
| `is_iranian`                  | Boolean     | Yes      | Domestic (true) or imported (false)                       |
| `product_classes`             | Array       | Optional | Product classification IDs, e.g., ["2"]                   |
| `general_mefa_id`             | Integer     | Yes      | 893 (domestic) or 894 (imported)                          |
| `description`                 | String      | Yes      | Main product description, required length: 150-2000 chars |
| `exclusive_mefa_id`           | String/Null | Optional | For exclusive MEFA classification (usually null)          |
| `fake`                        | Boolean     | Yes      | false (counterfeit detection toggle)                      |
| `fake_reasons`                | Array       | Optional | Reasons for fake flag (empty array if fake=false)         |
| `advantages`                  | Array       | Optional | List of product advantages/benefits                       |
| `disadvantages`               | Array       | Optional | List of product limitations/drawbacks                     |
| `package_width`               | Number      | Optional | Package width (cm) or null                                |
| `package_height`              | Number      | Optional | Package height (cm) or null                               |
| `package_length`              | Number      | Optional | Package length/depth (cm) or null                         |
| `package_weight`              | Number      | Optional | Package weight (kg) or null                               |
| `only_cf_fields.status`       | String      | Optional | Product status, e.g., "marketable"                        |
| `only_cf_fields.platforms`    | Array       | Optional | Target platforms, e.g., ["digikala"]                      |
| `only_cf_fields.other_titles` | Array       | Optional | Alternate titles (empty array typical)                    |

**Response fields used:**

- `draft_product_id` (integer) — Use in subsequent steps
- `is_valid` (boolean) — true if all required fields passed
- `errors` (object/array) — Validation error details if is_valid=false
- Other fields: bind data, score information (not used in uploader)

---

### 5. Save Attributes & Dimensions

**POST** `/product-creation/attributes`

Used as step 2 in the successful flow.

```json
{
  "draft_product_id": 6977605,
  "category_id": 6946,
  "attributes": [
    { "id": 4931, "value": [21209, 21210] },
    { "id": 5127, "value": [15907] },
    { "id": 6597, "value": "زیبا" }
  ],
  "width": 400,
  "height": 600,
  "length": 5,
  "weight": 800
}
```

---

### 6. Finalize Product With Images

**POST** `/product-creation/save`

Used only as the final step after images are uploaded.

```json
{
  "category_id": 6946,
  "draft_product_id": 6977605,
  "only_b2b": false,
  "photos_detail": {
    "main_image": "encrypted_id_1",
    "order": "encrypted_id_1,encrypted_id_2",
    "images": [{ "encrypted_id": "encrypted_id_1", "active": true }, { "encrypted_id": "encrypted_id_2" }]
  }
}
```

**Response:**

```json
{
  "status": "ok",
  "data": {
    "data": {
      "product_id": 123456789
    }
  }
}
```

---

### 7. Save Product Title

**POST** `/product-creation/auto-title/save`

Updates the product Persian and English titles.

**Request Body:**

```json
{
  "draft_product_id": 6977605,
  "title_fa": "تابلو نقاشی طرح طبیعت مدل 001",
  "title_en": "Nature Painting Model 001"
}
```

**Response:**

```json
{
  "status": "ok",
  "data": {}
}
```

---

### 8. Upload Product Image

**POST** `/product-creation/images/upload`

Upload a product image using multipart form-data.

**Request:**

- Content-Type: `multipart/form-data`
- Form Fields:
  - `file` (binary): Image file
  - `slot` (integer): Image position (1, 2, 3, ...)

**Example cURL:**

```bash
curl -X POST https://seller.digikala.com/api/v2/product-creation/images/upload \
  -H "Cookie: ..." \
  -F "file=@/path/to/image.jpg" \
  -F "slot=1"
```

**Response:**

```json
{
  "status": "ok",
  "data": {
    "id": "encrypted_image_id_string",
    "timestamp": 1697123456
  }
}
```

---

## Constants for Category 6946 (تابلو)

### Product Type IDs

```
تابلو (Regular Picture):     4928
تابلو نوری (Light Picture):  9657
تابلو پازل (Puzzle):         9655
```

### General MEFA ID (Origin)

```
domestic (تولید داخل):  893
imported (وارداتی):      894
```

### Attribute IDs

| ID    | Name (FA)  | Type   | Notes                                     |
| ----- | ---------- | ------ | ----------------------------------------- |
| 4931  | موضوع      | Multi  | Subject/Theme - pipe-separated option IDs |
| 5127  | تکنیک      | Multi  | Technique - pipe-separated option IDs     |
| 119   | توضیحات    | Text   | Description - free text                   |
| 10130 | تعداد قطعه | Number | Piece count - string representation       |

### Required Fields

- ✅ `category_id` (always 6946)
- ✅ `brand_id` (integer, valid brand)
- ✅ `model` (string, product model)
- ✅ `product_type_ids` (array, at least one painting type)
- ✅ `title_fa` (Persian title)
- ✅ `title_en` (English title)
- ✅ `general_mefa_id` (893 or 894)
- ✅ At least two image files
- ✅ Image files must be JPG/JPEG for upload endpoint acceptance

### Optional Fields

- `is_iranian` (boolean, default: true)
- `product_classes` (pipe-separated class IDs)
- `exclusive_mefa_id` (advanced feature, usually empty)
- `attr_subject_ids` (attribute values)
- `attr_technique_ids` (attribute values)
- `attr_description` (text)
- `attr_piece_count` (number as string)
- `advantages` (pipe-separated list)
- `disadvantages` (pipe-separated list)
- `width`, `height`, `length`, `weight` (dimensions in cm/kg)
- `package_*` (packaging dimensions)

---

## Rate Limiting & Delays

To avoid hitting rate limits:

- **Between products:** 2000 ms (2 seconds)
- **Between API steps:** 600 ms (0.6 seconds)
- **Between image uploads:** 300 ms

---

## Error Response Format

All errors return with status code 200 but `result.status !== 'ok'`:

```json
{
  "status": "failed",
  "message": "Error message",
  "errors": {
    "field_name": "Error detail"
  }
}
```

---

## Example Flow for One Product

1. **POST** `/product-creation/product/detail/validation` with basic info → get `draft_product_id`
2. Wait 600ms
3. **POST** `/product-creation/attributes` with attributes
4. Wait 600ms
5. **POST** `/product-creation/auto-title/save` with titles
6. Wait 300ms × (number of images)
7. **POST** `/product-creation/images/upload` for each JPG/JPEG image
8. **POST** `/product-creation/save` with image encrypted IDs for finalization
