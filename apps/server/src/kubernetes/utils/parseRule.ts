export function parseTraefikRule(rule: string) {
  const result = {
    domain: null,
    prefix: null,
  };

  const hostMatch = rule.match(/Host\s*\(\s*["'`]([^"'`]+)["'`]\s*\)/);
  if (hostMatch) {
    result.domain = hostMatch[1];
  }

  const prefixMatch = rule.match(/Path(?:Prefix)?\s*\(\s*["'`]([^"'`]+)["'`]\s*\)/);
  if (prefixMatch) {
    result.prefix = prefixMatch[1];
  }

  return result;
}
