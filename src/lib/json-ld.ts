// JSON.stringify does not escape "</script>", which would let content
// containing that literal sequence break out of the script tag early.
// Escaping "<" as its unicode form closes that hole without touching valid JSON.
export function toSafeJson(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
