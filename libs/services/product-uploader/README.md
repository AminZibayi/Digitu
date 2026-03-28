# Digikala Product Auto-Uploader

A comprehensive Node.js CLI tool for automatically adding products to Digikala via the Seller Platform API.

**Status:** ⚙️ Fully Automated  
**Category:** تابلو (Pictures/Tableaus) - ID: 6946  
**Languages:** Node.js 14+ | Supports Persian (Farsi) text

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v14 or higher (check: `node --version`)
- **npm** (comes with Node.js)
- **A Digikala Seller Account** with valid API credentials
- **Product CSV file** with your product data

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Get your API credentials:**
   - Log in to https://seller.digikala.com
   - Open DevTools (F12) → Network tab
   - Make any API request (reload page)
   - Right-click request → Copy → Copy as fetch
   - Look for these cookies in the request:
     - `PHPSESSID`
     - `seller_api_access_token` (JWT)
     - `tracker_session`
     - `seller_api_otp_token`

3. **Set up credentials:**

   ```bash
   # Recommended: .env file (auto-loaded)
   echo DIGIKALA_COOKIE="your_cookie_string_here" > .env

   # Alternative: environment variable
   export DIGIKALA_COOKIE="your_cookie_string_here"
   ```

4. **Prepare your CSV file:**
   - See CSV-SPEC.md for detailed column documentation
   - Use provided `products.csv` as a template
   - All images must exist as local files
   - Final publish requires at least 2 images
   - Accepted upload formats are JPG/JPEG

5. **Run the uploader:**

   ```bash
   # Validate your CSV first
   node cli.js --validate products.csv

   # Start interactive upload (review each product)
   node cli.js --upload products.csv

   # Skip review and auto-approve all products (yes-to-all mode)
   node cli.js --upload products.csv --yes
   node cli.js --upload products.csv -y   # shorthand
   ```

---

## 📋 Documentation Files

### 🔌 API-SPEC.md

**Complete API specification for Digikala Seller API (Category 6946)**

Contents:

- Authentication headers and requirements
- All API endpoints with examples
- HTTP methods, request/response formats
- Required vs optional fields
- Attribute IDs and constants
- Rate limiting guidelines
- Error handling
- Complete workflow example

**Use this to understand:** How the API works, what data to send, expected responses

---

### 📊 CSV-SPEC.md

**Detailed CSV column validation and documentation**

Contents:

- All 23 column definitions
- Data types and formats
- Required vs optional fields
- Validation rules for each column
- Valid value options
- Example rows (minimal, complete)
- Common errors and fixes
- Excel/Google Sheets tips
- Category 6946 specific requirements

**Use this to prepare:** Your CSV file with correct data format

---

### 🇮🇷 PERSIAN-GUIDE.md

**Complete Persian usage guide for operators**

Contents:

- Full setup in Persian
- Cookie/auth configuration
- CSV preparation rules
- Command usage examples
- API flow summary
- Common errors and quick fixes

**Use this when:** You want an end-to-end Persian operational guide

---

### 🖥️ Files Included

```
digikala-uploader.js        Complete uploader with all API calls
├── Handles product creation workflow
├── Image uploads
├── Batch processing
├── Error recovery & retry
└── Results logging (invoked by cli.js)

cli.js                      Interactive CLI tool
├── CSV validation
├── Data review/editing
├── Product by product confirmation
└── User-friendly prompts

products-db-viewer.js       Products database viewer
└── Query and view uploaded product records

API-SPEC.md                 API documentation
CSV-SPEC.md                 CSV column guide
PERSIAN-GUIDE.md            Persian usage guide
README.md                   This file

products.csv                Sample CSV (2 products)
products_live_test.csv      Single-row live test CSV
products-db.json            Persistent products database (auto-created)
upload_results.json         Latest upload results
scraped/apiExamples.js      Raw API call examples
scraped/seller.digikala.com.har  Network traffic capture
```

---

## 📦 Products Database

### Overview

All successfully uploaded products are automatically saved to a **persistent database** (`products-db.json`). This provides a complete history of all products created through this tool, including their product IDs and titles.

### View Your Products

```bash
# List all uploaded products
node products-db-viewer.js

# Get count of uploaded products
node products-db-viewer.js --count

# Search for a product by title or model
node products-db-viewer.js --search "نقاشی"

# Export as JSON
node products-db-viewer.js --json > products-export.json
```

### Database Structure

Each uploaded product record contains:

```json
{
  "timestamp": "2026-03-28T10:30:45.123Z",
  "productId": 12345678,
  "title": "تابلو نقاشی طرح طبیعت",
  "model": "model-001",
  "sourceFile": "products.csv"
}
```

- **timestamp**: When the product was uploaded
- **productId**: Digikala's assigned product ID (used for editing/managing)
- **title**: Product Persian title
- **model**: Product model/SKU from CSV
- **sourceFile**: Which CSV file was uploaded

### Database Benefits

✅ **Complete Audit Trail** — See every product ever uploaded  
✅ **Prevents Duplication** — Track what's already in the system  
✅ **Quick Reference** — Find product IDs for editing  
✅ **Pagination Support** — Identify gaps for bulk operations  
✅ **Persistent** — Survives script restarts (unlike upload_results.json)

### Access the Database from Code

```javascript
const uploader = require("./digikala-uploader");

// Get all products
const allProducts = uploader.getAllProductsFromDB();

// Check if a product exists
const exists = uploader.isProductInDB(12345678);

// Get info on a specific product
const product = uploader.getProductFromDB(12345678);

// Manually add a record (e.g., for imported products)
uploader.addProductToDB(12345678, "تابلو نقاشی", "model-001", "manual");
```

### Using npm Scripts

For convenience, you can use npm scripts instead of typing full commands:

```bash
# Validate your CSV
npm run validate

# Start interactive upload
npm run upload

# Dry run without API calls
npm run dry-run

# View all uploaded products
npm run list

# Show help
npm run help
```

### Product Management After Upload

Once products are uploaded, you can find their Digikala product IDs in the database:

```bash
# View all uploaded products and their Digikala IDs
npm run list

# Search for a specific product
node products-db-viewer.js --search "model-name"

# Get JSON export for external systems
npm run list --json > products-export.json

# Use product IDs for editing in Digikala UI
# Digikala product ID → Edit URL: https://seller.digikala.com/products/{productId}
```

**Example Workflow:**

1. Upload products: `npm run upload`
2. View assigned IDs: `npm run list`
3. Edit on Digikala: Open https://seller.digikala.com/products/123456789
4. Export for records: `npm run list --json`

---

## 🛠️ CLI Commands

### Validate CSV Only

```bash
# Check if CSV is valid without uploading
node cli.js --validate products.csv

# Exit codes:
#   0 = all valid
#   1 = errors found
```

### Interactive Upload (Recommended)

```bash
# Review each product before uploading
node cli.js --upload products.csv

# Prompts:
# 1. Load CSV
# 2. Validate all products
# 3. Review each product (edit/skip/continue)
# 4. Confirm before upload
# 5. Upload starts automatically from CLI
```

### Batch Upload (Auto-Approve)

```bash
# Upload all valid products without interactive review
node cli.js --upload products.csv --yes
node cli.js --upload products.csv -y      # shorthand
node cli.js --upload products.csv --no-review  # legacy

# Behavior:
# - Validates all products
# - Skips product-by-product review
# - Auto-approves all valid products
# - Starts upload immediately
# - Useful for batch processing or automation scripts
```

### Dry Run

```bash
# Test without making API calls
node cli.js --dry-run products.csv

# Shows what would be uploaded
```

### Show Help

```bash
node cli.js --help

# Shows all commands and options
```

## 🔁 Validated API Sequence

The final successful live run used this exact sequence:

1. `POST /product-creation/product/detail/validation` (basic info + returns `draft_product_id`)
2. `POST /product-creation/attributes` (attributes + dimensions)
3. `POST /product-creation/auto-title/save` (title)
4. `POST /product-creation/images/upload` (for each JPG/JPEG image)
5. `POST /product-creation/save` (finalize using `photos_detail`)

Notes from live behavior:

- Finalize requires at least 2 uploaded images.
- Image upload endpoint rejects non-JPEG formats.

---

## 📈 Workflow: Step by Step

### 1. Prepare CSV File

```bash
# Create your products.csv following CSV-SPEC.md format
# Minimum required:
#   - brand_id (integer)
#   - model (string)
#   - division_id (or painting_type in legacy format)
#   - product_type_ids (recommended)
#   - general_mefa_id (domestic or imported)
#   - title_fa (Persian title)
#   - image_paths (relative paths to image files)

# All images must be in accessible directory (e.g., ./images/)
# At least 2 images are required and each must be JPG/JPEG
```

### 2. Validate CSV

```bash
node cli.js --validate products.csv

# Check output for:
# ✓ All required fields present
# ✓ Data types correct
# ✓ Image files exist
# ⚠ Recommendations for better data
```

### 3. Review Products

```bash
node cli.js --upload products.csv

# For each product:
# - See summary of data
# - Choose: [E]dit / [S]kip / [N]ext / [Q]uit
# - Errors must be fixed before upload
# - Warnings are optional (proceed at own risk)
```

### 4. Confirm Upload

```bash
# Final confirmation before sending to Digikala
Proceed with upload? [yes/no]: yes
```

### 5. Monitor Progress

```bash
# Uploader shows:
# [1/10] تابلو نقاشی طرح طبیعت
#   [1/5] Basic info ........... done
#   [2/5] Attributes ........... done
#   [3/5] Title ................ done
#   [4/5] Image 1/2 ............ done
#   [5/5] Finalize & publish ... done ✓

# Each product takes ~5-15 seconds
```

### 6. Check Results

```bash
# See upload_results.json
cat upload_results.json

# Shows:
# ✓ Successful uploads (product_id assigned)
# ✗ Failed uploads (error message)
# → Retry failures with: node cli.js --upload products.csv
```

---

## ❌ Troubleshooting

### Authentication Errors

```
Error: seller_api_access_token not found
→ Check DIGIKALA_COOKIE in .env or environment variables
→ Token expired? Update from browser DevTools
→ PHPSESSID also expired? Re-login to Digikala
```

### CSV Parsing Errors

```
Error: Non-JSON [/product-creation/save]
→ Check image_paths column - images must exist locally
→ Check painting_type - must be exactly: تابلو / تابلو نوری / تابلو پازل
→ Check CSV encoding - should be UTF-8 with BOM
```

### Image Upload Failures

```
Error: Image not found: images/photo.jpg
→ Ensure image file exists
→ Use relative paths from current directory
→ Check file permissions (readable)
→ Supported formats: JPG/JPEG only
```

### Rate Limiting

```
Error: Too many requests
→ Increase delayBetweenProducts in CONFIG
→ Default is 2000ms (2 seconds) between products
→ If still failing, increase to 5000ms or more
```

### Timeout During Upload

```
Error: Request timeout
→ Network connection issue
→ Digikala API temporarily down
→ Retry with: node cli.js --upload products.csv
```

### CSV Format Issues

```
Error: Invalid painting_type
→ Open CSV in text editor (not Excel)
→ Check exact spelling: تابلو (not TABLOO, tableau, etc.)
→ Check for extra spaces or punctuation
```

---

## 🔐 Security Notes

⚠️ **Important Security Information:**

1. **API Token:**
   - Contains sensitive authentication credentials
   - Don't commit to git/version control
   - Don't share with others
   - Expires periodically (refresh from DevTools)

2. **Cookie String:**
   - Includes PHPSESSID (session ID)
   - Keep it private and confidential
   - Treat like a password

3. **Safe Practices:**

   ```bash
   # ✓ Good: Set as environment variable
   export DIGIKALA_COOKIE="your_token"
   # Then run with cli.js

   # ✗ Avoid: Hardcoding in git repo
   # Don't: Push CONFIG.cookie to GitHub

   # Create .env file (add to .gitignore)
   echo "DIGIKALA_COOKIE=your_token" > .env
   ```

4. **After Upload:**
   - Consider refreshing your API token
   - Do this by logging out/in to Digikala
   - Generate new session cookies

---

## 📊 CSV Examples

### Minimal Valid Product

```csv
brand_id,model,painting_type,is_iranian,product_classes,general_mefa_id,title_fa,title_en,attr_subject_ids,attr_technique_ids,attr_description,attr_piece_count,advantages,disadvantages,width,height,length,weight,package_width,package_height,package_length,package_weight,image_paths
719,model-001,تابلو,true,,domestic,تابلو نقاشی,Painting,,,,,,,,,,,,,images/photo.jpg
```

### Complete Product with All Fields

```csv
719,مدل-طبیعت-001,تابلو,true,2,domestic,تابلو نقاشی طرح طبیعت,Nature Painting,21209|21210,15907,رنگ روغن بر روی بوم با موضوع طبیعت,1,رنگ آمیزی با کیفیت|ماندگاری بالا,حساس به رطوبت,400,600,5,800,420,620,30,900,images/tabloo_001_main.jpg|images/tabloo_001_detail.jpg
```

---

## 🧪 Testing

### Dry Run Test

```bash
# Test without uploading
node cli.js --dry-run products.csv --no-review

# Shows:
# ✓ What would be validated
# ✓ What would be uploaded
# → No actual API calls made
```

### Validate Only

```bash
# Check CSV format without API calls
node cli.js --validate products.csv

# Shows:
# ✓ All products are valid
# ✗ Errors found
# ⚠ Warnings to review
```

### Single Product Test

```bash
# Create test.csv with just 1 product
# Run full upload
node cli.js --upload test.csv

# Monitor successful upload before batching
# Check upload_results.json for product_id
```

---

## 📈 Production Usage

### For Large Batches (100+ products)

```bash
# Increase delays to avoid rate limiting
# Edit digikala-uploader.js CONFIG:
CONFIG.delayBetweenProducts = 3000;  // 3 seconds
CONFIG.delayBetweenSteps = 1000;     // 1 second

# Run overnight or on schedule:
node cli.js --upload products.csv --auto

# Monitor with:
tail -f upload_results.json
```

### Automation/Cron Job

```bash
#!/bin/bash
# upload.sh - Schedule with cron

cd /path/to/project
node cli.js --upload products.csv --auto >> upload.log 2>&1
echo "Upload complete: $(date)" >> upload.log

# Add to crontab:
# 0 2 * * * /path/to/upload.sh  # Run daily at 2 AM
```

### Stop & Resume

```bash
# If upload is interrupted:
# 1. Check upload_results.json
# 2. Fix any failed products
# 3. Retry:
node cli.js --upload products.csv
```

---

## 🐛 Debugging

### Verbose Logging

```bash
# Modify digikala-uploader.js to log API requests
// Uncomment near line 142:
console.log('API Call:', method, endpoint, JSON.stringify(body, null, 2));
```

### Check API Response

```bash
# Edit digikala-uploader.js apiCall function
// Add before return:
console.log('Response:', JSON.stringify(json, null, 2));
```

### Network Capture

```bash
# Look at seller.digikala.com.har for network traffic
# Use HAR viewer: https://harviewer.org

# Re-capture:
# 1. Open DevTools in browser
# 2. Network tab > right-click > Save as HAR
```

---

## 📞 Support & Issues

### Common Issues

| Issue               | Solution                                                |
| ------------------- | ------------------------------------------------------- |
| Token expired       | Get new one from DevTools                               |
| Image not found     | Check paths are relative to current directory           |
| Painting type error | Use exact Persian text: تابلو / تابلو نوری / تابلو پازل |
| CSV encoding        | Save as UTF-8 with BOM                                  |
| Too many requests   | Increase delayBetweenProducts                           |
| API 403 Forbidden   | Check PHPSESSID is valid                                |

### Enable Debug Mode

```bash
# Set environment variable
export DEBUG=digikala:*

# Run with debug output
DEBUG=digikala:* node cli.js --upload products.csv
```

---

## 📚 Category 6946 Info

**Official Name:** تابلو (Picture/Tableau)  
**Full Path:** خانه و آشپزخانه > دکوراسیون و دکوراتیو > قاب عکس و تابلو  
**Allowed Types:**

- تابلو (Paintings) → [4928]
- تابلو نوری (Light Paintings) → [9657]
- تابلو پازل (Puzzles) → [9655]

**Required Fields:**

- Category ID: 6946
- Brand ID: Any valid Digikala brand
- Product type: One or more painting types
- Title: Persian title required, English optional
- Images: At least 2 JPG/JPEG images (first image will be main)

**Default MEFA ID:** 893 (domestic)

---

## 💡 Tips & Best Practices

1. **Image Quality:**
   - Use high-quality images (min 800×800px recommended)
   - Multiple angles for better conversion
   - First image is the main/gallery image

2. **Titles:**
   - Persian titles: 50-200 characters ideal
   - English titles: For international customers
   - Include model number if applicable

3. **Attributes:**
   - Always include subject (طلوع، غروب، دریا، etc.)
   - Technique important (نقاشی، دیجیتال، عکس، etc.)
   - Piece count for multi-part artworks

4. **Batch Processing:**
   - Start with 10-20 products for testing
   - Increase delays if rate-limited
   - Resume feature handles failures gracefully

5. **Data Validation:**
   - Always validate before uploading
   - Check warnings even if not errors
   - Review final product on Digikala site

---

## 📝 License & Terms

This tool is for **automated product management on Digikala Seller Platform** only.

- Comply with Digikala Terms of Service
- Don't spam or upload inappropriate content
- Respect rate limits and API guidelines
- Keep credentials confidential
- Data is sent to Digikala servers - review privacy policy

---

## 🔗 Links

- **Digikala Seller:** https://seller.digikala.com
- **API Base:** https://seller.digikala.com/api/v2
- **Category 6946:** https://seller.digikala.com/products/6946

---

## Version History

**v1.0.0** - Initial Release

- ✅ Complete API specification
- ✅ CSV validation & documentation
- ✅ Interactive CLI tool
- ✅ Batch uploader with retry
- ✅ Support for Persian text
- ✅ Image upload handling
