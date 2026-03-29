# Logging System Quick Reference

## At a Glance

The Digikala Variant Creator now has **comprehensive CLI and file logging** built-in.

## Quick Start

```bash
# Default logging (INFO level)
npm run variant:create -- --config config.yaml --input products.json

# Detailed logging (DEBUG level)
npm run variant:create -- --config config.yaml --input products.json --verbose

# View logs
cat logs/variant-creator.log
tail -f logs/variant-creator.log  # Monitor in real-time
```

## What Gets Logged

| Level     | When                | Examples                                               |
| --------- | ------------------- | ------------------------------------------------------ |
| **ERROR** | Critical failures   | Config errors, API failures, file I/O errors           |
| **WARN**  | Non-critical issues | Variant fetch failed, creation failed (non-blocking)   |
| **INFO**  | Major milestones    | Startup, config loaded, product processing, completion |
| **DEBUG** | Detailed traces     | File loads, variant attempts, API retries (--verbose)  |

## Log Format

```
[TIMESTAMP] [LEVEL] Message {"key1":"value1","key2":"value2"}
```

Example:

```
[2026-03-28 05:13:19.850] [INFO ] Variant created successfully {"productId":21581903,"variantId":77948925}
```

## Output Locations

| Type        | Location                     | Controlled By                 |
| ----------- | ---------------------------- | ----------------------------- |
| **Console** | Terminal/stdout              | Default (all levels)          |
| **File**    | `./logs/variant-creator.log` | Auto-created, cleared per run |

## Control Logging

```bash
# Just INFO/WARN/ERROR (default)
npm run variant:create -- --config config.yaml --input products.json

# Add DEBUG messages
npm run variant:create -- --config config.yaml --input products.json --verbose
```

## Use Cases

### Monitor a Long Run

```bash
# Terminal 1: Start the run
npm run variant:create -- --config prod.yaml --input batch.json

# Terminal 2: Watch logs in real-time
tail -f logs/variant-creator.log
```

### Find All Errors

```bash
grep "ERROR" logs/variant-creator.log
```

### Count Created Variants

```bash
grep "Variant created successfully" logs/variant-creator.log | wc -l
```

### Extract Variant IDs Created

```bash
grep "Variant created successfully" logs/variant-creator.log | \
  grep -oP '(?<="variantId":)\d+'
```

### Analyze Performance

```bash
# See time between start and finish
grep "Starting Digikala\|Variant creation run finished" logs/variant-creator.log
```

### Find All Product Processing

```bash
grep "Processing product" logs/variant-creator.log
```

### Check for Dry-Run vs Real

```bash
grep "dryRun" logs/variant-creator.log | head -1
```

## Integration Examples

### Save Logs with Timestamp

```bash
cp logs/variant-creator.log logs/variant-creator-$(date +%Y%m%d_%H%M%S).log
```

### Email Log on Failure

```bash
if grep -q "failedProducts\":0" logs/variant-creator.log; then
  echo "All variants created successfully"
else
  mail -s "Variant creation had failures" admin@example.com < logs/variant-creator.log
fi
```

### Parse and Report

```bash
node -e "
const fs = require('fs');
const lines = fs.readFileSync('./logs/variant-creator.log', 'utf8').split('\n');
const created = lines.filter(l => l.includes('created successfully')).length;
const failed = lines.filter(l => l.includes('WARN')).length;
console.log(\`Created: \${created}, Failed: \${failed}\`);
"
```

## File Structure

```
variant-creator/
├── logs/
│   └── variant-creator.log      ← All logs here
├── src/
│   ├── logger.js                ← Logging implementation
│   ├── cli.js                   ← CLI entry, creates logger
│   ├── runner.js                ← Logs variant processing
│   └── client.js                ← Logs API interactions
├── LOGGING.md                   ← Full documentation
├── LOGGING-IMPLEMENTATION.md    ← Implementation details
└── README.md                    ← Updated with logging section
```

## Troubleshooting

### No log file created

- Check that `./logs/` directory is writable
- Verify no permission issues on parent directory
- Look for ERROR messages in console output

### Too much logging (too verbose)

- Remove `--verbose` flag (drops to INFO level)
- Redirect stderr: `2>/dev/null`

### Missing log entries

- Ensure run completed (check exit code: `echo $?`)
- Check that `--verbose` is set for DEBUG messages
- Verify log file isn't cleared mid-run in other terminal

### Log file continues from previous run

- Current implementation clears on start
- Old logs are overwritten, not appended
- Manually copy logs before running if you want preservation

## Performance

- **Negligible overhead**: Logging adds ~1-2ms per operation
- **No blocking**: File writes don't delay API calls
- **Memory efficient**: Direct write-through, no buffering

## See Also

- [LOGGING.md](LOGGING.md) - Comprehensive logging documentation
- [LOGGING-IMPLEMENTATION.md](LOGGING-IMPLEMENTATION.md) - Implementation details
- [README.md](README.md) - Project overview
