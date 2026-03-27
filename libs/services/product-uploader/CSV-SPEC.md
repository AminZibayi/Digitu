# CSV Specification (Canonical)

This file defines the best-practice CSV format for `digikala-uploader.js` and `cli.js`.

Encoding:

- UTF-8 (BOM tolerated)

Delimiter:

- `,`

Multi-value separator inside a cell:

- `|`

## Canonical Header

```csv
brand_id,model,division_id,product_type_ids,is_iranian,product_classes,general_mefa_id,title_fa,title_en,attr_usage_type_ids,attr_piece_count_select_ids,attr_visual_feature_ids,attr_design,attr_frame_type_ids,attr_frame_material_ids,attr_frame_color,attr_surface_guard_ids,attr_extra_description,attr_resistance_ids,attr_washing_method_ids,attr_general_design_ids,attr_frame_thickness_mm,attr_print_type_ids,advantages,disadvantages,width,height,length,weight,package_width,package_height,package_length,package_weight,image_paths
```

## Field Rules

### Required

- `brand_id`: integer
- `model`: non-empty string
- division field: at least one of
  - `division_id`, or
  - `division_label` (supported), or
  - `painting_type` (legacy)
- `general_mefa_id`: `domestic`/`imported` or `893`/`894`
- `title_fa`: non-empty
- `image_paths`: at least one existing local path

### Strongly Recommended

- `product_type_ids` (real form field)
- category attributes (`attr_*`)
- `advantages` and `disadvantages`

### Optional

- `title_en`
- dimension/package fields

## Data Types

- Integer list fields use `|` separator, e.g. `21209|21210`
- String list fields use `|` separator, e.g. `مقاوم|سبک`
- `is_iranian` accepts: `true|false|1|0|yes|no`

## Attribute Columns (Canonical)

- `attr_usage_type_ids` -> 4931
- `attr_piece_count_select_ids` -> 5127
- `attr_visual_feature_ids` -> 5218
- `attr_design` -> 6597
- `attr_frame_type_ids` -> 8482
- `attr_frame_material_ids` -> 10043
- `attr_frame_color` -> 10129
- `attr_surface_guard_ids` -> 10132
- `attr_extra_description` -> 119
- `attr_resistance_ids` -> 5065
- `attr_washing_method_ids` -> 5080
- `attr_general_design_ids` -> 7830
- `attr_frame_thickness_mm` -> 10130
- `attr_print_type_ids` -> 10131

## Backward Compatibility

Uploader still accepts old AI-generated columns:

- `painting_type`
- `attr_subject_ids`
- `attr_technique_ids`
- `attr_description`
- `attr_piece_count`

If both canonical and legacy columns exist, canonical fields are preferred.

## Example Row (Canonical)

```csv
719,مدل-طبیعت-001,4928,24054,true,2,domestic,تابلو طرح طبیعت مدل 001,Nature Painting 001,21209|21210,15907,14500,زیبا,52502,51393,آبی,52453,توضیحات تکمیلی,19139,19150,35285,12,52450,کیفیت چاپ خوب|رنگ مناسب,حساس به رطوبت,400,600,5,800,420,620,30,900,images/tabloo_001_main.jpg|images/tabloo_001_side.jpg
```

## Validation Notes

`cli.js --validate` checks:

- required identity fields
- division resolution
- MEFA validity
- image file existence
- recommendation-level warnings for missing attributes/product types

## Practical Tips

- Keep file paths relative to repository root when possible.
- Test one row first before batch upload.
- Run validation before every upload batch.
