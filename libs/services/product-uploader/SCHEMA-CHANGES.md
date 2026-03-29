# Schema Update: Added Missing API Columns (2026-03-29)

## Summary

The CSV specification and uploader code have been updated to document and support the full set of columns that align with the Digikala Seller API as captured in HAR logs and live API responses.

## What Changed

### 1. CSV-SPEC.md

**Before:**

- 23 columns documented
- Schema was outdated and incomplete
- Missing explicit canonical attribute field names
- Legacy "painting_type" was marked as required

**After:**

- 35 canonical columns + 5 legacy aliases
- Full mapping from API field schema
- Clear distinction between required, optional, and legacy fields
- Backwards compatibility maintained via auto-mapping

### 2. digikala-uploader.js

**Before:**

- Parser comment listed only old 12 legacy columns
- Relied on legacy alias mappings without documenting them

**After:**

- Updated parseCSV comment with full column landscape
- Explicit documentation of canonical attributes vs. legacy aliases
- Clear precedence: canonical fields checked first, legacy fallbacks applied if canonical missing

### 3. cli.js

**Before:**

```javascript
const CSV_COLUMNS = [
  "brand_id",
  "model",
  "division_id",
  "division_label",
  "painting_type",
  "product_type_ids",
  "product_type_label",
  "is_iranian",
  "product_classes",
  "general_mefa_id",
  "title_fa",
  "title_en",
  "attr_subject_ids",
  "attr_technique_ids",
  "attr_description",
  "attr_piece_count",
  "advantages",
  "disadvantages",
  "width",
  "height",
  "length",
  "weight",
  "package_width",
  "package_height",
  "package_length",
  "package_weight",
  "image_paths",
];
```

**After:**

```javascript
const CSV_COLUMNS = [
  // Core required fields
  "brand_id",
  "model",
  "general_mefa_id",
  "title_fa",
  "image_paths",

  // Division (provide one)
  "division_id",
  "division_label",

  // Product type
  "product_type_ids",

  // Classification
  "is_iranian",
  "product_classes",

  // Titles
  "title_en",

  // CANONICAL ATTRIBUTES (category 6946)
  "attr_usage_type_ids",
  "attr_piece_count_select_ids",
  "attr_visual_feature_ids",
  "attr_design",
  "attr_frame_type_ids",
  "attr_frame_material_ids",
  "attr_frame_color",
  "attr_surface_guard_ids",
  "attr_extra_description",
  "attr_resistance_ids",
  "attr_washing_method_ids",
  "attr_general_design_ids",
  "attr_frame_thickness_mm",
  "attr_print_type_ids",

  // Pros / Cons
  "advantages",
  "disadvantages",

  // Dimensions
  "width",
  "height",
  "length",
  "weight",
  "package_width",
  "package_height",
  "package_length",
  "package_weight",

  // Images
  "image_paths",

  // Legacy aliases (backwards compat)
  "painting_type",
  "product_type_label",
  "attr_subject_ids",
  "attr_technique_ids",
  "attr_description",
  "attr_piece_count",
];
```

### 4. API-SPEC.md

**Before:**

- Minimal endpoint documentation
- Request body had only high-level field list
- No details on optional vs. required fields

**After:**

- Complete field definitions table for step 1 request
- Clear field types and requirements
- Explanation of each field's purpose
- Cross-reference to CSV column mapping

## New Canonical Attribute Columns (Category 6946)

| Canonical Name                | Farsi Label       | Type           | Replaces Legacy      |
| ----------------------------- | ----------------- | -------------- | -------------------- |
| `attr_usage_type_ids`         | نوع کاربرد        | IDs array      | `attr_subject_ids`   |
| `attr_piece_count_select_ids` | تعداد تکه         | IDs array      | `attr_technique_ids` |
| `attr_visual_feature_ids`     | ویژگی ظاهری تابلو | IDs array      | N/A (new)            |
| `attr_design`                 | طرح               | Text           | N/A (new)            |
| `attr_frame_type_ids`         | نوع تابلو         | IDs array      | N/A (new)            |
| `attr_frame_material_ids`     | جنس قاب تابلو     | IDs array      | N/A (new)            |
| `attr_frame_color`            | رنگ فریم          | Text           | N/A (new)            |
| `attr_surface_guard_ids`      | محافظ سطح         | IDs array      | N/A (new)            |
| `attr_extra_description`      | سایر توضیحات      | Text           | `attr_description`   |
| `attr_resistance_ids`         | مقاوم در برابر    | IDs array      | N/A (new)            |
| `attr_washing_method_ids`     | نحوه شست‌وشو      | IDs array      | N/A (new)            |
| `attr_general_design_ids`     | طرح کلی           | IDs array      | N/A (new)            |
| `attr_frame_thickness_mm`     | ضخامت فریم        | Text (numeric) | `attr_piece_count`   |
| `attr_print_type_ids`         | نوع چاپ           | IDs array      | N/A (new)            |

## Backwards Compatibility

All legacy columns are still supported and will be automatically mapped:

```javascript
// Legacy column → Canonical column mapping (auto-applied in parseCSV):
attr_subject_ids       → attr_usage_type_ids
attr_technique_ids     → attr_piece_count_select_ids
attr_description       → attr_extra_description
attr_piece_count       → attr_frame_thickness_mm
painting_type          → division_label
product_type_label     → (fallback for product_type_ids)
```

**Example:** An old CSV with `attr_subject_ids` will work identically to one with `attr_usage_type_ids`.

## Migration Guide

### For Existing CSVs

No action required. Your current CSV with legacy columns will continue to work.

### For New CSVs

Use canonical column names for clarity:

```csv
# Old (still works):
brand_id,model,painting_type,attr_subject_ids,attr_description,...

# New (preferred):
brand_id,model,division_label,attr_usage_type_ids,attr_extra_description,...
```

### For Updated Documentation

- Always refer to canonical names in new documentation
- Document legacy mappings only in backwards-compatibility sections
- Include both names in examples when introducing new CSVs

## Files Modified

- `CSV-SPEC.md` – Complete column reference with 35 canonical + 5 legacy columns
- `digikala-uploader.js` – parseCSV function comment and mapping logic
- `cli.js` – CSV_COLUMNS list
- `API-SPEC.md` – Step 1 request body documentation with field table

## Testing Checklist

- [x] All legacy columns are still mapped correctly
- [x] Canonical columns take precedence over legacy
- [x] New attributes (visual_feature, frame_type, etc.) accepted in parser
- [x] CSV-SPEC.md examples show both old and new formats
- [x] API-SPEC.md aligns with actual request payload structure
- [ ] Run e2e test with new canonical CSV (after npm install)

## Next Steps

1. When ready to expand uploader to more categories, extract canonical attribute mappings to a config file
2. Consider generating CSV templates from live API schema endpoint
3. Document any new category-specific attributes using same pattern

---

**Date:** 2026-03-29  
**Reason:** Align CSV specification with actual Digikala Seller API schema captured from HAR network logs
