# Digikala Automation Suite

A unified monorepo containing tools and services for automating product and variant management on the Digikala Seller Platform.

## 📦 Project Structure

This monorepo is built with **Nx** and uses **pnpm** workspaces. It is divided into several applications and shared libraries:

### Applications
- **`apps/desktop`**: An Electron-based desktop application providing a user-friendly interface for the automation tools.
- **`apps/frontend`**: A Next.js React frontend (used within the desktop app and potentially as a web dashboard).
- **`apps/backend`**: An Express API server that interfaces with the shared services and core utilities.

### Libraries & Services
- **`libs/core`**: Shared core utilities, database management, Digikala API client wrapper, and logging functionality.
- **`libs/services/product-uploader`**: A Node.js CLI tool and service for automatically creating and uploading new products (with images, attributes, and variants) to Digikala via CSV.
- **`libs/services/variant-creator`**: A specialized service for creating new variants (offers) for existing Digikala products based on configuration rules.

## 🚀 Quick Start

### Prerequisites
- Node.js v20+
- pnpm v10+

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up environment variables:
   You will need Digikala Seller API credentials (cookies and tokens). Create a `.env` file in the root or in the specific service directories you plan to use.
   ```bash
   # Example .env
   DIGIKALA_COOKIE="your_cookie_string_here"
   ```

### Running the Project

Nx is configured to manage tasks across the monorepo.

- **Start Desktop App (Development)**:
  ```bash
  pnpm run dev
  ```
  *(This will start the frontend development server and launch the Electron app.)*

- **Build Everything**:
  ```bash
  pnpm run build
  ```

- **Run Tests**:
  ```bash
  pnpm run test
  ```

- **Lint Code**:
  ```bash
  pnpm run lint
  ```

## 🛠️ Services

### Product Uploader
Located in `libs/services/product-uploader`. 
Allows bulk uploading of products via CSV files, handling image uploads, attribute assignment, and product creation workflows.
- See the [Product Uploader README](libs/services/product-uploader/README.md) for detailed usage instructions.

### Variant Creator
Located in `libs/services/variant-creator`.
Automates the creation of variants for existing products, managing pricing, stock, and status updates.
- See the [Variant Creator README](libs/services/variant-creator/README.md) for detailed usage instructions.

## 📚 Documentation
Additional documentation and specifications can be found in the respective library directories:
- `libs/services/product-uploader/API-SPEC.md`
- `libs/services/product-uploader/CSV-SPEC.md`
- `libs/services/variant-creator/LOGGING.md`

## 📄 License
This tool is intended for automated product management on the Digikala Seller Platform. Users must comply with Digikala's Terms of Service and API guidelines.
