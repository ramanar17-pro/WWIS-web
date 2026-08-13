import { describe, expect, it, vi } from 'vitest';
import type { CollectionEntry } from 'astro:content';

const contactEntry = {
  id: 'main',
  data: {
    campusName: 'Wisdom Wealth International School',
    address: '123 Example Rd, Trichy',
    phone: '+91 00000 00000',
    email: 'info@example.com',
    mapUrl: 'https://maps.example.com',
    officeHours: 'Mon-Fri 9am-4pm',
    curriculumBoard: 'Cambridge',
    language: 'English',
    lastUpdated: new Date('2026-08-01'),
  },
} as unknown as CollectionEntry<'contact'>;

describe('contactToOrg', () => {
  it('maps a contact entry to an EducationalOrganization with a stable @id', async () => {
    const { contactToOrg, ORG_ID } = await import('./schema-mappers');
    const org = contactToOrg(contactEntry);
    expect(org).toMatchObject({
      '@type': 'EducationalOrganization',
      '@id': ORG_ID,
      name: 'Wisdom Wealth International School',
      address: '123 Example Rd, Trichy',
      telephone: '+91 00000 00000',
      email: 'info@example.com',
    });
  });
});

describe('tuitionToOffer', () => {
  it('uses annualFee as a numeric price when set', async () => {
    const { tuitionToOffer } = await import('./schema-mappers');
    const entry = {
      id: 'iplay',
      data: {
        programName: 'iPlay',
        gradeRange: 'Pre-K - KG2',
        annualFee: 75000,
        currency: 'INR',
        additionalFees: [],
        academicYear: '2026-2027',
        lastUpdated: new Date('2026-08-01'),
      },
    } as unknown as CollectionEntry<'tuition'>;

    const offer = tuitionToOffer(entry);
    expect(offer.price).toBe(75000);
    expect(offer.priceCurrency).toBe('INR');
  });

  // Regression for the documented fallback in PLANNING.md Dependencies:
  // if exact figures aren't approved for publication, a feeRange string
  // must be used instead of a numeric annualFee — this must not crash.
  it('falls back to feeRange text when annualFee is not set', async () => {
    const { tuitionToOffer } = await import('./schema-mappers');
    const entry = {
      id: 'ilead',
      data: {
        programName: 'iLead',
        gradeRange: 'Grade 9 - 12',
        feeRange: '₹1,20,000 – ₹1,50,000',
        currency: 'INR',
        additionalFees: ['Admission fee', 'Transport'],
        academicYear: '2026-2027',
        lastUpdated: new Date('2026-08-01'),
      },
    } as unknown as CollectionEntry<'tuition'>;

    const offer = tuitionToOffer(entry);
    expect(offer.price).toBe('₹1,20,000 – ₹1,50,000');
    expect(offer.additionalProperty).toHaveLength(2);
  });

  it('references the canonical org by @id rather than duplicating its fields', async () => {
    const { tuitionToOffer, ORG_ID } = await import('./schema-mappers');
    const entry = {
      id: 'idiscover',
      data: {
        programName: 'iDiscover',
        gradeRange: 'Grade 1 - 5',
        annualFee: 90000,
        currency: 'INR',
        additionalFees: [],
        academicYear: '2026-2027',
        lastUpdated: new Date('2026-08-01'),
      },
    } as unknown as CollectionEntry<'tuition'>;

    const offer = tuitionToOffer(entry);
    expect(offer.provider).toEqual({ '@id': ORG_ID });
  });
});

describe('getCanonicalOrg', () => {
  it('throws a clear error when the canonical contact entry is missing', async () => {
    vi.resetModules();
    vi.doMock('astro:content', () => ({
      getEntry: vi.fn().mockResolvedValue(undefined),
    }));

    const { getCanonicalOrg } = await import('./schema-mappers');
    await expect(getCanonicalOrg()).rejects.toThrow(/Missing canonical contact entry/);

    vi.doUnmock('astro:content');
    vi.resetModules();
  });

  it('resolves to the mapped org when the contact entry exists', async () => {
    vi.resetModules();
    vi.doMock('astro:content', () => ({
      getEntry: vi.fn().mockResolvedValue(contactEntry),
    }));

    const { getCanonicalOrg, ORG_ID } = await import('./schema-mappers');
    const org = await getCanonicalOrg();
    expect(org['@id']).toBe(ORG_ID);

    vi.doUnmock('astro:content');
    vi.resetModules();
  });
});
