# CSV Column Specification & Validation Guide

**File Format:** UTF-8 with BOM (required for Persian/Farsi text)  
**Delimiter:** Comma (`,`)  
**Header Row:** Required (row 1)  
**Data Rows:** Start from row 2

---

## Column Definitions & Validation

| #   | Column Name                   | Type    | Required | Format                                        | Description                                             |
| --- | ----------------------------- | ------- | -------- | --------------------------------------------- | ------------------------------------------------------- |
| 1   | `brand_id`                    | Integer | ✅       | Numeric                                       | Digikala brand ID (e.g., 719 for untitled brands)       |
| 2   | `model`                       | String  | ✅       | Text                                          | Product model identifier - unique per brand             |
| 3   | `division_id`                 | Integer | ⚠️       | Numeric (or use division_label)               | Division ID (e.g., 4928 for تابلو, 9657 for تابلو نوری) |
| 4   | `division_label`              | String  | ⚠️       | تابلو / تابلو نوری / تابلو پازل               | Division label (alternative to division_id)             |
| 5   | `product_type_ids`            | String  | ⚠️       | Pipe-separated IDs (e.g., `24054`)            | Product type IDs (from API schema)                      |
| 6   | `is_iranian`                  | Boolean | ⚠️       | true / false                                  | Domestic (true) or imported (false). Default: true      |
| 7   | `product_classes`             | String  | ⚠️       | Pipe-separated (e.g., `2`)                    | Product class IDs separated by `\|`                     |
| 8   | `general_mefa_id`             | String  | ✅       | domestic / imported / 893 / 894               | Origin indicator: domestic=893, imported=894            |
| 9   | `description`                 | String  | ✅       | Free text (150-2000 chars)                    | Main product description sent in step 1 payload         |
| 10  | `title_fa`                    | String  | ✅       | Farsi/Persian text                            | Product title in Persian (50-200 characters)            |
| 10  | `title_en`                    | String  | ⚠️       | English text                                  | Product title in English (optional but recommended)     |
| 11  | `attr_usage_type_ids`         | String  | ⚠️       | Pipe-separated IDs (e.g., `21209\|21210`)     | Category 6946: Usage type (نوع کاربرد)                  |
| 12  | `attr_piece_count_select_ids` | String  | ⚠️       | Pipe-separated IDs (e.g., `15907`)            | Category 6946: Piece count/technique (تعداد تکه)        |
| 13  | `attr_visual_feature_ids`     | String  | ⚠️       | Pipe-separated IDs (e.g., `14500`)            | Category 6946: Visual feature/frame (ویژگی ظاهری)       |
| 14  | `attr_design`                 | String  | ⚠️       | Free text                                     | Category 6946: Design/pattern (طرح)                     |
| 15  | `attr_frame_type_ids`         | String  | ⚠️       | Pipe-separated IDs (e.g., `52502`)            | Category 6946: Frame type (نوع تابلو)                   |
| 16  | `attr_frame_material_ids`     | String  | ⚠️       | Pipe-separated IDs (e.g., `51393`)            | Category 6946: Frame material (جنس قاب)                 |
| 17  | `attr_frame_color`            | String  | ⚠️       | Free text                                     | Category 6946: Frame color (رنگ فریم)                   |
| 18  | `attr_surface_guard_ids`      | String  | ⚠️       | Pipe-separated IDs (e.g., `52453`)            | Category 6946: Surface protection (محافظ سطح)           |
| 19  | `attr_extra_description`      | String  | ⚠️       | Free text                                     | Category 6946: Additional description (سایر توضیحات)    |
| 20  | `attr_resistance_ids`         | String  | ⚠️       | Pipe-separated IDs (e.g., `19139`)            | Category 6946: Resistance (مقاوم در برابر)              |
| 21  | `attr_washing_method_ids`     | String  | ⚠️       | Pipe-separated IDs (e.g., `19150`)            | Category 6946: Washing method (نحوه شست‌وشو)            |
| 22  | `attr_general_design_ids`     | String  | ⚠️       | Pipe-separated IDs (e.g., `35285`)            | Category 6946: General design theme (طرح کلی)           |
| 23  | `attr_frame_thickness_mm`     | String  | ⚠️       | Numeric (mm)                                  | Category 6946: Frame thickness (ضخامت فریم)             |
| 24  | `attr_print_type_ids`         | String  | ⚠️       | Pipe-separated IDs (e.g., `52450`)            | Category 6946: Print type (نوع چاپ)                     |
| 25  | `advantages`                  | String  | ⚠️       | Pipe-separated (e.g., `رنگ\|کیفیت\|ماندگاری`) | Product advantages                                      |
| 26  | `disadvantages`               | String  | ⚠️       | Pipe-separated (e.g., `حساس به رطوبت`)        | Product drawbacks/limitations                           |
| 27  | `width`                       | Decimal | ⚠️       | Numeric (cm)                                  | Product width in centimeters                            |
| 28  | `height`                      | Decimal | ⚠️       | Numeric (cm)                                  | Product height in centimeters                           |
| 29  | `length`                      | Decimal | ⚠️       | Numeric (cm)                                  | Product depth/length in centimeters                     |
| 30  | `weight`                      | Decimal | ⚠️       | Numeric (kg)                                  | Product weight in kilograms                             |
| 31  | `package_width`               | Decimal | ⚠️       | Numeric (cm)                                  | Package width in centimeters                            |
| 32  | `package_height`              | Decimal | ⚠️       | Numeric (cm)                                  | Package height in centimeters                           |
| 33  | `package_length`              | Decimal | ⚠️       | Numeric (cm)                                  | Package depth in centimeters                            |
| 34  | `package_weight`              | Decimal | ⚠️       | Numeric (kg)                                  | Package weight in kilograms                             |
| 35  | `image_paths`                 | String  | ✅       | Pipe-separated file paths                     | Local paths to images, order determines display         |

### Legacy Alias Columns (Deprecated)

These columns are still supported for backwards compatibility but are mapped to canonical fields:

| Legacy Column        | Maps To                       | Notes                                 |
| -------------------- | ----------------------------- | ------------------------------------- |
| `painting_type`      | `division_label`              | Use `division_label` or `division_id` |
| `attr_subject_ids`   | `attr_usage_type_ids`         | Older attribute naming                |
| `attr_technique_ids` | `attr_piece_count_select_ids` | Older attribute naming                |
| `attr_description`   | `attr_extra_description`      | Maps to extra/other description field |
| `attr_piece_count`   | `attr_frame_thickness_mm`     | Legacy fallback mapping               |

---

## Validation Rules

### Required Columns (Must Have a Value)

```
✅ brand_id       - Non-empty, valid integer
✅ model          - Non-empty, non-whitespace string (max 100 chars)
✅ division       - One of: division_id OR division_label OR painting_type (legacy)
✅ general_mefa_id - One of: domestic / imported / 893 / 894
✅ description    - Non-empty, length 150 to 2000 characters
✅ title_fa       - Non-empty, Farsi text (50-200 chars recommended)
✅ image_paths    - At least 2 valid JPG/JPEG file paths
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
- Must contain at least 2 image paths
- All paths must end with `.jpg` or `.jpeg`
- Must exist on the filesystem before upload
- First image = main/featured image
- Example: `images/tabloo_001_main.jpg|images/tabloo_001_side.jpg`
- Invalid: Non-existent paths, fewer than 2 paths, non-JPG/JPEG files, URLs

---

## CSV Examples

### Minimal Valid Row (Legacy format - still supported)

```csv
brand_id,model,division_label,product_type_ids,is_iranian,product_classes,general_mefa_id,description,title_fa,title_en,advantages,disadvantages,image_paths
719,مدل-001,تابلو,24054,true,,domestic,"این تابلو با کیفیت چاپ بالا، ترکیب رنگ هماهنگ و طراحی مناسب دکوراسیون داخلی تولید شده است و برای استفاده در اتاق پذیرایی، اتاق خواب و محیط کار گزینه ای زیبا و ماندگار محسوب می شود.",تابلو نقاشی طرح طبیعت مدل 001,Nature Painting Model 001,,,images/tabloo_001_main.jpg|images/tabloo_001_side.jpg
```

### Complete Row with Canonical Attribute Names

```csv
brand_id,model,division_id,product_type_ids,is_iranian,product_classes,general_mefa_id,description,title_fa,title_en,attr_usage_type_ids,attr_piece_count_select_ids,attr_visual_feature_ids,attr_design,attr_frame_type_ids,attr_frame_material_ids,attr_frame_color,attr_surface_guard_ids,attr_extra_description,attr_resistance_ids,attr_washing_method_ids,attr_general_design_ids,attr_frame_thickness_mm,attr_print_type_ids,advantages,disadvantages,width,height,length,weight,package_width,package_height,package_length,package_weight,image_paths
719,مدل-طبیعت-001,4928,24054,true,2,domestic,"تابلو دکوراتیو طرح طبیعت با چاپ دقیق و رنگ های چشم نواز طراحی شده است. این محصول به دلیل کیفیت متریال، وضوح چاپ و ظاهر حرفه ای برای فضاهای خانگی و اداری مناسب بوده و جلوه ای گرم و زیبا ایجاد می کند.",تابلو نقاشی طرح طبیعت مدل 001,Nature Painting 001,21209|21210,15907,14500,زیبا,52502,51393,آبی,52453,تابلو دکوری مناسب فضای داخلی,19139,19150,35285,12,52450,رنگ‌آمیزی با کیفیت|ماندگاری بالا,حساس به رطوبت,400,600,5,800,420,620,30,900,images/tabloo_001_main.jpg|images/tabloo_001_side.jpg
```

### Example with Legacy Alias Columns (backwards compatible)

```csv
brand_id,model,painting_type,is_iranian,product_classes,general_mefa_id,title_fa,title_en,attr_subject_ids,attr_technique_ids,attr_description,attr_piece_count,advantages,disadvantages,width,height,length,weight,package_width,package_height,package_length,package_weight,image_paths
5559,مدل-نوری-002,تابلو نوری,true,2,domestic,تابلو نوری طرح دریا مدل 002,Ocean Light Painting 002,21210,15907,تابلو نوری با نور ال‌ای‌دی,12,کم‌مصرف|نور یکنواخت,نیاز به برق,500,700,30,1500,520,720,50,1700,images/tabloo_002_main.jpg|images/tabloo_002_side.jpg
```

**Note:** The legacy example above still works because `attr_subject_ids` → `attr_usage_type_ids`, `attr_technique_ids` → `attr_piece_count_select_ids`, and `attr_description` → `attr_extra_description` are automatically mapped in the uploader. `description` is a separate top-level required field and is not replaced by `attr_description`.

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
- **Special Rules:** Must have at least 2 JPG/JPEG images to publish

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
