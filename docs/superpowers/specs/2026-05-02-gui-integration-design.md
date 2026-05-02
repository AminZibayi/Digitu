# Product Uploader & Variant Creator GUI Integration Design

## Goal
Integrate existing backend features (dry run, verify upload one by one editing on the fly) from the `product-uploader` and `variant-creator` libraries into the Next.js/Electron GUI. Additionally, expose the specific cause of any record failure directly in the GUI.

## Architecture & Data Flow

### 1. Product Uploader
- **Backend API (`apps/backend` / `electron` IPC)**
  - Add a `parseUpload` endpoint/handler. This will use the existing `parseCSV` and validation logic (from `cli.js` of `product-uploader`) to return an array of parsed product objects, including their validation `_errors` and `_warnings`.
  - Update the `runUpload` endpoint to accept either a file path or a direct array of modified product objects.
  - Add a `dryRun` boolean parameter to `runUpload`. When true, the uploader skips the API publish step.
  - Modify the `onUploadProgress` IPC event to emit the detailed `error` string instead of just `{ status: 'failed' }`.
- **Frontend GUI (`apps/frontend/src/app/uploader/page.tsx`)**
  - **State 1: Selection.** User selects a CSV file.
  - **State 2: Review & Edit.** The UI calls `parseUpload` and displays an editable data grid of the rows. Rows with validation errors are highlighted in red. The user can double-click cells to edit fields like `Title`, `Model`, `Brand`, etc. The UI validates the changes locally or calls the backend again.
  - **Controls:** Add a "Dry Run (Validation Only)" checkbox next to "Auto Publish".
  - **State 3: Upload.** Upon clicking "Start Upload", the edited array of products is sent to `runUpload`. The progress table displays the detailed error message in a new "Error Detail" column if `status === 'failed'`.

### 2. Variant Creator
- **Backend API (`apps/backend` / `electron` IPC)**
  - Add a `readFixture` endpoint/handler to return the raw JSON contents of a fixture file.
  - Modify `runVariantCreation` to accept the actual array of products and the full config object, rather than just reading from a file path. Ensure the returned results contain the detailed `error` message string.
- **Frontend GUI (`apps/frontend/src/app/variants/page.tsx`)**
  - **State 1: Selection.** User selects a fixture or uploads a new CSV.
  - **State 2: Configuration & Review.** 
    - The UI calls `readFixture` to fetch the products and displays them in an editable data grid. Users can edit `productId` or `productTitle`.
    - A dedicated Configuration Editor section is added for `Theme ID`, `Site`, and an array of `Sizes`. Each size has inputs for `Key`, `ThemeValueId`, `Price`, `WarrantyId`, and an `Active` toggle.
  - **Controls:** Add a "Dry Run" toggle next to "Start Variant Creation".
  - **State 3: Execution.** The UI sends the modified products array and configuration to `runVariantCreation`. The results table displays the detailed error cause next to each product.

## Error Handling
- Both pages will now render an "Error Detail" column in their results table.
- Backend services will map the internal error `e.message` to the response object rather than swallowing it or returning a generic "Failed" message.

## Testing Strategy
- Use existing `.csv` and `.json` fixtures to manually test the "Dry Run" mode.
- Ensure editing a field in the frontend data grid correctly propagates the change to the Digikala API payloads.
- Verify that a simulated network failure or validation failure properly propagates its exact text to the frontend.