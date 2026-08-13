import { describe, expect, it } from 'vitest';
import { toSafeJson } from './json-ld';

describe('toSafeJson', () => {
  it('serializes a plain object as valid JSON', () => {
    const result = toSafeJson({ '@type': 'Thing', name: 'WWIS' });
    expect(JSON.parse(result)).toEqual({ '@type': 'Thing', name: 'WWIS' });
  });

  // CRITICAL regression test: this is the exact injection vector flagged
  // during /plan-eng-review — free-text staff bios or other content can
  // contain "</script>", which JSON.stringify alone does not escape.
  it('escapes "</script>" so it cannot break out of the surrounding script tag', () => {
    const result = toSafeJson({ bio: 'He said "</script><script>alert(1)</script>"' });
    expect(result).not.toContain('</script>');
    expect(JSON.parse(result)).toEqual({
      bio: 'He said "</script><script>alert(1)</script>"',
    });
  });

  it('preserves nested @id references without altering their shape', () => {
    const result = toSafeJson({
      '@type': 'Offer',
      provider: { '@id': 'https://wwistrichy.com/#org' },
    });
    expect(JSON.parse(result)).toEqual({
      '@type': 'Offer',
      provider: { '@id': 'https://wwistrichy.com/#org' },
    });
  });
});
