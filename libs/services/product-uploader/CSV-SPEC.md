# CSV Column Specification & Validation Guide

**File Format:** UTF-8 with BOM (required for Persian/Farsi text)  
**Delimiter:** Comma (`,`)  
**Header Row:** Required (row 1)  
**Data Rows:** Start from row 2

---

## Column Definitions & Validation

| #   | Column Name          | Type           | Required | Format                                        | Description                                         |
| --- | -------------------- | -------------- | -------- | --------------------------------------------- | --------------------------------------------------- |
| 1   | `brand_id`           | Integer        | ✅       | Numeric                                       | Digikala brand ID (e.g., 719 for untitled brands)   |
| 2   | `model`              | String         | ✅       | Text                                          | Product model identifier - unique per brand         |
| 3   | `painting_type`      | String         | ✅       | تابلو / تابلو نوری / تابلو پازل               | Type of artwork/picture                             |
| 4   | `is_iranian`         | Boolean        | ⚠️       | true / false                                  | Domestic (true) or imported (false). Default: true  |
| 5   | `product_classes`    | String         | ⚠️       | Pipe-separated (e.g., `2`)                    | Product class IDs separated by `\|`                 |
| 6   | `general_mefa_id`    | String         | ✅       | domestic / imported / 893 / 894               | Origin indicator: domestic=893, imported=894        |
| 7   | `title_fa`           | String         | ✅       | Farsi/Persian text                            | Product title in Persian (50-200 characters)        |
| 8   | `title_en`           | String         | ⚠️       | English text                                  | Product title in English (optional but recommended) |
| 9   | `attr_subject_ids`   | String         | ⚠️       | Pipe-separated IDs (e.g., `21209\|21210`)     | Category 6946: Subject/Theme attribute IDs          |
| 10  | `attr_technique_ids` | String         | ⚠️       | Pipe-separated IDs (e.g., `15907`)            | Category 6946: Technique attribute IDs              |
| 11  | `attr_description`   | String         | ⚠️       | Free text                                     | Detailed product description                        |
| 12  | `attr_piece_count`   | String/Integer | ⚠️       | Numeric                                       | Number of pieces (for multi-part artworks)          |
| 13  | `advantages`         | String         | ⚠️       | Pipe-separated (e.g., `رنگ\|کیفیت\|ماندگاری`) | Comma-separated list of product advantages          |
| 14  | `disadvantages`      | String         | ⚠️       | Pipe-separated (e.g., `حساس به رطوبت`)        | Comma-separated list of product drawbacks           |
| 15  | `width`              | Decimal        | ⚠️       | Numeric (cm)                                  | Product width in centimeters                        |
| 16  | `height`             | Decimal        | ⚠️       | Numeric (cm)                                  | Product height in centimeters                       |
| 17  | `length`             | Decimal        | ⚠️       | Numeric (cm)                                  | Product depth/length in centimeters                 |
| 18  | `weight`             | Decimal        | ⚠️       | Numeric (kg)                                  | Product weight in kilograms                         |
| 19  | `package_width`      | Decimal        | ⚠️       | Numeric (cm)                                  | Package width in centimeters                        |
| 20  | `package_height`     | Decimal        | ⚠️       | Numeric (cm)                                  | Package height in centimeters                       |
| 21  | `package_length`     | Decimal        | ⚠️       | Numeric (cm)                                  | Package depth in centimeters                        |
| 22  | `package_weight`     | Decimal        | ⚠️       | Numeric (kg)                                  | Package weight in kilograms                         |
| 23  | `image_paths`        | String         | ✅       | Pipe-separated file paths                     | Local paths to images, order determines display     |

---

## Validation Rules

### Required Columns (Must Have a Value)

```
✅ brand_id       - Non-empty, valid integer
✅ model          - Non-empty, non-whitespace string (max 100 chars)
✅ painting_type  - One of: تابلو / تابلو نوری / تابلو پازل
✅ general_mefa_id - One of: domestic / imported / 893 / 894
✅ title_fa       - Non-empty, Farsi text (50-200 chars recommended)
✅ image_paths    - At least one valid image file path
```

### Required but Optional Values

```
⚠️ is_iranian     - Boolean (defaults to true if empty)
⚠️ product_classes - Can be empty (leave blank or single value)
⚠️ title_en       - Can be empty (auto-generated if missing)
⚠️ Attributes     - Can be empty (only include if available)
⚠️ Dimensions     - Can be empty (0 if not specified)
⚠️ Advantages/Disadvantages - Can be empty (use | separator)
```

### Data Type Validations

**brand_id**

- Type: Integer
- Range: 1 to 999999
- Example: `719`
- Invalid: `"brand-xyz"`, `12.5`, `NaN`

**model**

- Type: String
- Max Length: 100 characters
- Allowed: Letters, numbers, Persian chars, hyphens, underscores
- Example: `مدل-طبیعت-001` or `MODEL-2024-001`
- Invalid: Empty string, whitespace only

**painting_type**

- Type: String (case-sensitive Farsi)
- Valid Values:
  - `تابلو` → product_type_ids: [4928]
  - `تابلو نوری` → product_type_ids: [9657]
  - `تابلو پازل` → product_type_ids: [9655]
- Example: `تابلو`
- Invalid: `tableau`, `TABLOO`, typos

**is_iranian**

- Type: Boolean
- Case-Insensitive
- Valid Values: `true`, `false`, `TRUE`, `FALSE`, `yes`, `no`, `1`, `0`
- Default: `true` (if empty)
- Example: `true`

**general_mefa_id**

- Type: String or Integer
- Valid Values:
  - `domestic` → mapped to 893
  - `imported` → mapped to 894
  - `893` → domestic (direct ID)
  - `894` → imported (direct ID)
- Example: `domestic` or `893`
- Invalid: `national`, `international`, other numbers

**title_fa**

- Type: String (Persian/Farsi text)
- Length: 50-200 characters (recommended)
- Must Not: Be empty, be only whitespace
- Example: `تابلو نقاشی طرح طبیعت مدل 001`
- Invalid: Empty, English text only, numbers only

**title_en**

- Type: String (English text)
- Length: 0-200 characters
- Optional: Leave empty if not Available
- Example: `Nature Painting Model 001`
- Can be empty

**product_classes**

- Type: String (pipe-separated integers)
- Format: `ID1|ID2|ID3` (no spaces around pipes)
- Example: `2` or `2|3` or `1|5|9`
- Invalid: `"2, 3"` (commas), `"2 | 3"` (spaces)

**attr_subject_ids**

- Type: String (pipe-separated integers)
- Format: `ID1|ID2|ID3`
- These are category-specific attribute option IDs
- Example: `21209|21210` or `15001`
- Invalid: Empty spaces, invalid IDs in this category

**attr_technique_ids**

- Type: String (pipe-separated integers)
- Format: `ID1|ID2|ID3`
- Example: `15907` or `100|101|102`
- Invalid: Non-numeric IDs

**advantages / disadvantages**

- Type: String (pipe-separated phrases)
- Format: `Phrase1|Phrase2|Phrase3`
- No spaces around pipes
- Example: `رنگ‌آمیزی با کیفیت|ماندگاری بالا` or `High Quality|Durable`
- Invalid: `"Phrase1, Phrase2"` (commas)

**width, height, length, weight**

- Type: Decimal/Float
- Units: cm for dimensions, kg for weight
- Min: 0
- Example: `400`, `100.5`, `0` (leave empty for unknown)
- Invalid: Negative numbers, non-numeric strings

**package_width, package_height, package_length, package_weight**

- Type: Decimal/Float
- Same rules as product dimensions
- Must be ≥ product dimensions
- Example: `420`, `0` (leave empty to skip)

**image_paths**

- Type: String (pipe-separated file paths)
- Format: Relative or absolute paths separated by `|`
- Must exist on the filesystem before upload
- First image = main/featured image
- Example: `images/tabloo_001_main.jpg|images/tabloo_001_side.jpg`
- Invalid: Non-existent paths, empty list, URLs

---

## CSV Examples

### Minimal Valid Row

```csv
brand_id,model,painting_type,is_iranian,product_classes,general_mefa_id,title_fa,title_en,attr_subject_ids,attr_technique_ids,attr_description,attr_piece_count,advantages,disadvantages,width,height,length,weight,package_width,package_height,package_length,package_weight,image_paths
719,مدل-001,تابلو,true,,domestic,تابلو نقاشی طرح طبیعت مدل 001,,,,,,,,,,,,,,images/tabloo_001.jpg
```

### Complete Row

```csv
719,مدل-طبیعت-001,تابلو,true,2,domestic,تابلو نقاشی طرح طبیعت مدل 001,Nature Painting 001,21209|21210,15907,تابلو دکوری با رنگ‌بندی گرم,1,رنگ‌آمیزی با کیفیت|ماندگاری بالا,حساس به رطوبت,400,600,5,800,420,620,30,900,images/tabloo_001_main.jpg|images/tabloo_001_side.jpg
```

### Another Example

```csv
5559,مدل-نوری-002,تابلو نوری,true,2,domestic,تابلو نوری طرح دریا مدل 002,Ocean Light Painting 002,21210,15907,تابلو نوری با نور ال‌ای‌دی,1,کم‌مصرف|نور یکنواخت,نیاز به برق,500,700,30,1500,520,720,50,1700,images/tabloo_002_main.jpg
```

---

## Excel / Google Sheets Tips

1. **Set up sheet encoding:** Ensure file is UTF-8 with BOM
2. **Format text cells:** Set all columns to "Text" format before entering data
3. **Input method for Persian:** Use Persian keyboard layout or copy-paste
4. **Validation:** Use Data > Validation to restrict input
5. **Export:** Save as CSV (Comma-Separated Values) format

### Excel Column Widths (Suggested)

| Column        | Width |
| ------------- | ----- |
| brand_id      | 12    |
| model         | 20    |
| painting_type | 15    |
| title_fa      | 40    |
| title_en      | 40    |
| image_paths   | 50    |

---

## Common Errors & Fixes

| Error                     | Cause              | Fix                                                |
| ------------------------- | ------------------ | -------------------------------------------------- |
| `Invalid painting_type`   | Typo or wrong case | Use exact: تابلو, تابلو نوری, تابلو پازل           |
| `Missing brand_id`        | Empty cell         | Insert valid integer brand ID                      |
| `Image not found`         | Wrong file path    | Check relative/absolute path matches actual files  |
| `Invalid general_mefa_id` | Wrong value        | Use `domestic` or `imported`                       |
| `title_fa is empty`       | No Persian title   | Enter Persian title                                |
| `Pipe parsing error`      | Space around pipes | Remove spaces: `21209\|21210` not `21209 \| 21210` |
| `CSV encoding issues`     | Not UTF-8 BOM      | Resave as UTF-8 with BOM                           |

---

## Category 6946 Specific Notes

- **Name:** تابلو (Picture/Tableau)
- **Parent Categories:** خانه و آشپزخانه → دکوراسیون و دکوراتیو → قاب عکس و تابلو
- **Allowed Brands:** Any valid Digikala brand ID
- **Required Attributes:** At minimum title_fa and images
- **Theme:** null (supports colors and sizes)
- **Special Rules:** Must have at least one image to publish

---

## Batch Upload Steps

1. **Prepare CSV file** with all product data
2. **Validate each row:**
   - Check required fields are present
   - Verify data types and formats
   - Confirm image files exist
3. **Run the CLI tool:**
   ```bash
   node cli.js --upload products.csv
   ```
4. **Review and confirm** before uploading
5. **Monitor progress** in output logs
6. **Check results** in `upload_results.json`

---

## Header Row (Required)

```
brand_id,model,painting_type,is_iranian,product_classes,general_mefa_id,title_fa,title_en,attr_subject_ids,attr_technique_ids,attr_description,attr_piece_count,advantages,disadvantages,width,height,length,weight,package_width,package_height,package_length,package_weight,image_paths
```
