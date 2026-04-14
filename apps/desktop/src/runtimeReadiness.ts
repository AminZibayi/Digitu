export function formatNativeModuleReadinessError(raw: string): string {
  if (/NODE_MODULE_VERSION/i.test(raw)) {
    return 'Native module ABI mismatch detected. Rebuild native dependencies for the current runtime.';
  }
  return 'Native module failed to load.';
}
