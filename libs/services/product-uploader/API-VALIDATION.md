# 📋 API SPECIFICATION REVIEW & VALIDATION

## Overview for User Review

I've analyzed the existing code and network traffic to create a comprehensive API specification for the Digikala Seller Platform (Category 6946: تابلو/Pictures).

---

## 🔍 Extracted API Specification: **AWAITING YOUR VALIDATION**

### Base Information

- **Base URL:** https://seller.digikala.com/api/v2
- **Category ID:** 6946 (تابلو - Picture/Tableau)
- **Authentication:** JWT Token in cookies (seller_api_access_token)

### Main API Endpoints Identified:

#### 1️⃣ GET /categories/tree

- **Purpose:** List all product categories
- **Used For:** Reference only (validating category)
- **Response:** Hierarchical list of categories with IDs and titles

#### 2️⃣ GET /categories/{categoryId}

- **Purpose:** Get category details and parent hierarchy
- **Example:** GET /categories/6946?categoryId=6946
- **Response:** Category info, parent path, leaf status

#### 3️⃣ GET /product-creation/category/{categoryId}/validation

- **Purpose:** Get validation rules and available options for category
- **Example:** GET /product-creation/category/6946/validation
- **Response:** Brand list, attribute options, required field schema

#### 4️⃣ POST /product-creation/save

- **Purpose:** Main endpoint - create/update product drafts in 3 steps:
  - Step 1: Basic product info (brand, model, type) → returns draft_product_id
  - Step 2: Product attributes (dimensions, advantages, disadvantages)
  - Step 3: Finalize with images → returns final product_id
- **Content-Type:** application/json
- **Response:** Confirming success or validation errors

#### 5️⃣ POST /product-creation/auto-title/save

- **Purpose:** Update product Persian & English titles
- **Request:** { draft_product_id, title_fa, title_en }
- **Response:** Success confirmation

#### 6️⃣ POST /product-creation/images/upload

- **Purpose:** Upload product images
- **Content-Type:** multipart/form-data
- **Form Fields:** file (binary) + slot (integer position)
- **Response:** { id: "encrypted_image_id", ... }

### Product Type Constants (Category 6946):

```
تابلو (Regular Picture)      → [4928]
تابلو نوری (Light Picture)   → [9657]
تابلو پازل (Puzzle Picture)  → [9655]
```

### MEFA ID (Origin/Source):

```
Domestic (تولید داخل) → 893
Imported (وارداتی)     → 894
```

### Attribute IDs:

```
ID 4931  - موضوع (Subject/Theme) - Multi-select
ID 5127  - تکنیک (Technique) - Multi-select
ID 119   - توضیحات (Description) - Free text
ID 10130 - تعداد قطعه (Piece Count) - Number
```

### Required Fields for Upload:

```
✅ category_id (always 6946)
✅ brand_id (integer)
✅ model (string)
✅ product_type_ids (array: [4928] or [9657] or [9655])
✅ title_fa (Persian title)
✅ general_mefa_id (893 or 894)
✅ image_paths (at least 1 image file)
```

### Optional Fields:

```
⚠️ title_en (English title)
⚠️ is_iranian (boolean, default: true)
⚠️ product_classes (string, pipe-separated)
⚠️ attr_subject_ids through attr_piece_count (attributes)
⚠️ advantages, disadvantages (pipe-separated lists)
⚠️ width, height, length, weight, package_* (dimensions)
```

### Rate Limiting & Delays:

```
Between products:    2000ms (2 seconds)
Between API steps:    600ms (0.6 seconds)
Between images:       300ms
```

---

## ✅ QUESTIONS FOR YOUR VALIDATION

Please review and confirm the following:

### 1. **API Endpoints**

Are these 6 endpoints comprehensive for product creation?

- [ ] Yes, these are all needed
- [ ] No, missing endpoint: **********\_\_**********
- [ ] No, some are unnecessary

### 2. **Required vs Optional Fields**

Is my classification correct?

- [ ] Yes, required and optional fields are correct
- [ ] No, these should be required: ********\_********
- [ ] No, these are actually optional: ********\_********

### 3. **Product Types**

Are these exactly right for Category 6946?

- [ ] تابلو (Regular) [4928] ✓
- [ ] تابلو نوری (Light) [9657] ✓
- [ ] تابلو پازل (Puzzle) [9655] ✓
- [ ] Missing type: **********\_\_**********

### 4. **Attribute IDs**

Are these attribute IDs correct for your needs?

- [ ] ID 4931 (موضوع/Subject) ✓
- [ ] ID 5127 (تکنیک/Technique) ✓
- [ ] ID 119 (توضیحات/Description) ✓
- [ ] ID 10130 (تعداد قطعه/Piece Count) ✓
- [ ] Other attributes needed: **********\_\_**********

### 5. **MEFA IDs (Origin)**

Is this mapping correct?

- [ ] 893 = Domestic (تولید داخل) ✓
- [ ] 894 = Imported (وارداتی) ✓

### 6. **CSV Columns**

Are all 23 columns necessary? Any missing?

```
brand_id, model, painting_type, is_iranian, product_classes,
general_mefa_id, title_fa, title_en, attr_subject_ids,
attr_technique_ids, attr_description, attr_piece_count,
advantages, disadvantages, width, height, length, weight,
package_width, package_height, package_length, package_weight,
image_paths
```

- [ ] All columns needed ✓
- [ ] Column(s) to remove: **********\_\_**********
- [ ] Column(s) to add: **********\_\_**********

### 7. **API Workflow**

Is the 3-step save process correct?

1. POST /product-creation/save (basic info) → get draft_product_id
2. POST /product-creation/save (attributes + dimensions)
3. POST /product-creation/images/upload (images)
4. POST /product-creation/save (finalize with image IDs)

- [ ] This flow is correct ✓
- [ ] Step order should be: **********\_\_**********
- [ ] Missing step: **********\_\_**********

### 8. **Rate Limiting**

Are these delays appropriate?

- [ ] 2000ms between products ✓
- [ ] 600ms between API steps ✓
- [ ] 300ms between images ✓
- [ ] Should adjust to: **********\_\_**********

---

## 📄 Documentation Created

I've created the following files for your review:

### **API-SPEC.md** (Please Review)

Complete API specification including:

- Authentication headers
- All 6 endpoints with examples
- Request/response formats
- Constants and mappings
- Example workflow
- Error handling

**Action:** Review and confirm accuracy

### **CSV-SPEC.md** (Please Review)

Detailed CSV documentation including:

- All 23 column definitions
- Data types and formats
- Validation rules
- Valid value examples
- Common errors and fixes
- Excel/Sheets tips

**Action:** Review and confirm all columns are needed

### **cli.js** (Interactive Tool)

Node.js CLI application with:

- CSV loading and parsing
- Data validation
- Interactive product review
- Edit/skip/confirm workflow
- Color-coded output
- Help documentation

**Usage:**

```bash
npm install
node cli.js --help          # Show all commands
node cli.js --validate products.csv  # Validate only
node cli.js --upload products.csv    # Interactive upload
```

### **README.md** (Complete Guide)

Comprehensive documentation covering:

- Quick start guide
- Installation instructions
- All CLI commands
- Step-by-step workflow
- Troubleshooting
- Security best practices
- Production usage

### **Updated package.json**

Dependencies:

- csv-parse (CSV parsing)
- form-data (Image multipart uploads)
- node-fetch (API requests)

Scripts:

- `npm start` - Run CLI
- `npm run validate` - Validate CSV only
- `npm run upload` - Interactive upload
- `npm run uploader` - Direct bulk uploader

---

## 🚀 Next Steps

### For You (Validation):

1. **Review API-SPEC.md** - Confirm all endpoints and fields are correct
2. **Review CSV-SPEC.md** - Verify all 23 columns are needed
3. **Answer the validation questions above** - Help me confirm accuracy
4. **Test with sample products** - Try the CLI tool

### Once Validated:

1. Run: `npm install` (install dependencies)
2. Get your API credentials from Digikala DevTools
3. Edit `digikala-uploader.js` and set your `CONFIG.cookie`
4. Prepare your CSV file with products
5. Run: `node cli.js --validate products.csv`
6. Run: `node cli.js --upload products.csv` (interactive mode)

---

## ⚠️ Important Notes

### Files Warning

You mentioned AI-generated files should be treated cautiously:

- ✅ **apiExamples.js** - Used for API reference (manually verified)
- ✅ **setup.js** - Basic template, used as reference
- ✅ **digikala-uploader.js** - Working implementation, but review uploads carefully

**Recommendation:**

- Test with 1-2 sample products first
- Verify they upload correctly on Digikala
- Then proceed with batch uploads

### Security Notes

- API token expires - refresh from DevTools periodically
- Don't commit CONFIG.cookie to git
- Use .env file for sensitive data
- Treat token like a password

---

## 📞 Questions?

Please provide feedback on:

1. **API Endpoints** - Are all 6 comprehensive?
2. **Required Fields** - Should anything change from optional to required?
3. **Product Types** - Any missing painting types?
4. **CSV Columns** - Any to remove/add?
5. **Attribute IDs** - Are these complete for your needs?
6. **Any other corrections** to the specification?

Once you validate this API spec, I can:

- ✅ Finalize the documentation
- ✅ Confirm the CLI tool is correct
- ✅ Prepare for your first test upload
