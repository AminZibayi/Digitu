# Logging System Documentation

## Overview

The Digikala Variant Creator includes a comprehensive logging system that captures all operations to both the console and a dedicated log file. Logs include timestamps, severity levels, and structured data for easy debugging and monitoring.

## Features

- **Dual Output**: Logs go to both console and file simultaneously
- **Severity Levels**: error, warn, info, debug
- **Timestamps**: ISO 8601 format with millisecond precision `[YYYY-MM-DD HH:MM:SS.mmm]`
- **Structured Data**: JSON objects attached to log messages for easy parsing
- **Verbose Mode**: Enable debug-level logging with `--verbose` flag
- **Automatic File Management**: Logs are stored in `./logs/variant-creator.log`
- **No Dependencies**: Custom implementation, zero external dependencies

## Usage

### Running with Default Logging (INFO level)

```bash
npm run variant:create -- --config ./config.yaml --input ./products.json
```

**Output:**

- Console: INFO, WARN, and ERROR messages
- File: Same INFO, WARN, and ERROR messages to `./logs/variant-creator.log`

### Running with Verbose Logging (DEBUG level)

```bash
npm run variant:create -- --config ./config.yaml --input ./products.json --verbose
```

**Output:**

- Console: INFO, WARN, ERROR, and DEBUG messages
- File: All messages at DEBUG level

### Example Output

```
[2026-03-28 05:13:19.680] [INFO ] Starting Digikala Variant Creator {"config":"./config.yaml","input":"./products.json","dryRun":false,"outputDir":"./output"}
[2026-03-28 05:13:19.684] [DEBUG] Loading configuration from ./config.yaml
[2026-03-28 05:13:19.732] [INFO ] Configuration loaded successfully
[2026-03-28 05:13:19.735] [DEBUG] Loading products from ./products.json
[2026-03-28 05:13:19.739] [INFO ] Products loaded successfully {"count":5}
[2026-03-28 05:13:19.742] [INFO ] Running variant creation {"productCount":5,"dryRun":false}
[2026-03-28 05:13:19.746] [INFO ] Processing product {"productId":123456,"title":"Sample Product"}
[2026-03-28 05:13:19.756] [DEBUG] Creating variant {"productId":123456,"size":"10x15","themeValueId":106087,"price":300000}
[2026-03-28 05:13:19.850] [INFO ] Variant created successfully {"productId":123456,"size":"10x15","variantId":77948925,"price":300000}
[2026-03-28 05:13:20.146] [INFO ] Product processing completed {"productId":123456,"variantsCreated":8,"variantsFailed":0}
[2026-03-28 05:13:20.189] [INFO ] Variant creation run finished {"dryRun":false,"resultFilePath":"/path/to/results-1774674799781.json","totalProducts":1,"failedProducts":0}
[2026-03-28 05:13:20.194] [INFO ] Log file saved to /path/to/logs/variant-creator.log
```

## Log Levels

### ERROR

Logged when operations fail critically. Examples:

- Configuration validation failures
- API request failures (after retries)
- File I/O errors
- Invalid JSON responses

### WARN

Logged for non-critical issues that may affect results. Examples:

- Failed to fetch existing variants (idempotency check)
- Variant creation failures (individual, not blocking overall run)
- Network timeouts (if retried successfully)

### INFO

Logged for major operation checkpoints. Examples:

- CLI startup with arguments
- Configuration and product file loading
- Product processing begin/end
- Variant creation success
- Run completion with summary

### DEBUG (only with `--verbose`)

Logged for detailed operation tracking. Examples:

- Configuration file loading paths
- Individual API request details
- Variant duplicate detection
- File write operations
- API retry attempts

## Log File Location

**Default path**: `./logs/variant-creator.log`

The log file is:

- Created automatically if the `logs/` directory doesn't exist
- Cleared on each new run (fresh start, not appended)
- Appended to in real-time as operations progress

### Custom Log Directory (if needed in future)

The logger can be configured with a custom directory:

```javascript
const logger = createLogger({
  logDir: "/custom/path/logs",
  logFile: "/custom/path/logs/my-variant-creator.log",
  level: "debug",
  consoleOutput: true,
  fileOutput: true,
});
```

## Log Format

Each log line follows this format:

```
[TIMESTAMP] [LEVEL] Message {"key1":"value1","key2":"value2"}
```

Example:

```
[2026-03-28 05:13:19.850] [INFO ] Variant created successfully {"productId":123456,"size":"10x15","variantId":77948925,"price":300000}
```

- **TIMESTAMP**: `YYYY-MM-DD HH:MM:SS.mmm` (ISO 8601, millisecond precision)
- **LEVEL**: `ERROR`, `WARN`, `INFO`, or `DEBUG` (left-padded to 5 characters)
- **Message**: Human-readable description
- **Data**: JSON object with contextual information (keys vary by operation)

## Parsing Logs Programmatically

Since structured data is in JSON format, logs can be parsed and processed:

```javascript
const fs = require("fs");

const logs = fs
  .readFileSync("./logs/variant-creator.log", "utf8")
  .split("\n")
  .filter(Boolean)
  .map((line) => {
    const match = line.match(/\[(.+?)\] \[(.+?)\] (.+) (.+)/);
    if (!match) return null;
    const [, timestamp, level, message, data] = match;
    return {
      timestamp,
      level,
      message,
      data: JSON.parse(data || "{}"),
    };
  })
  .filter(Boolean);

// Filter for variant creations
const createdVariants = logs.filter((log) => log.message === "Variant created successfully");
console.log(createdVariants);
```

## Integration with Monitoring

The structured log format makes it easy to send logs to monitoring systems:

```javascript
// Future: Could stream to Datadog, CloudWatch, Splunk, etc.
// JSON format + timestamps support immediate integration
```

## Performance Impact

- **Minimal**: Custom lightweight logger with direct file I/O
- **No external dependencies**: No npm packages required
- **Async-safe**: File operations don't block API calls
- **Memory efficient**: Writes immediately, doesn't buffer

## Architecture

The logging system consists of:

1. **src/logger.js**: Core `Logger` class and `createLogger()` factory
   - Timestamp generation
   - Message formatting
   - File I/O management
   - Level filtering

2. **src/cli.js**: Instantiates logger based on `--verbose` flag
   - Passes to runVariantCreation
   - Logs startup, configuration, and completion

3. **src/runner.js**: Logs variant processing loop
   - Product processing
   - Variant creation attempts
   - Success/failure tracking
   - Idempotency state

4. **src/client.js**: Logs API interactions
   - Request initiation
   - Retry attempts
   - HTTP responses
   - Parse errors

## Best Practices

1. **Use `--verbose` for debugging**: Enable DEBUG level when investigating issues
2. **Check logs folder after runs**: Review `./logs/variant-creator.log` for operation details
3. **Parse logs for automation**: Extract structured data for monitoring/alerting
4. **Keep logs organized**: Log files are cleared on each run (no cleanup needed)
5. **Share logs for support**: Include log files when reporting issues

## Example: Monitoring a Batch Run

```bash
# Run with verbose logging
npm run variant:create -- --config prod.yaml --input batch.json --verbose

# While running, tail logs in another terminal
tail -f logs/variant-creator.log

# After completion, analyze results
cat logs/variant-creator.log | grep "Variant created successfully" | wc -l
# Output: number of variants created
```

## Future Enhancements

Possible future logging improvements:

- Log rotation by size or date
- Multiple log files (separate API, validation, variant logs)
- JSON-only output format
- Syslog integration
- Remote logging endpoints
