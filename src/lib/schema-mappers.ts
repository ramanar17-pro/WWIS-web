import { getEntry, type CollectionEntry } from 'astro:content';

export const ORG_ID = 'https://wwistrichy.com/#org';

export function contactToOrg(entry: CollectionEntry<'contact'>) {
  const { data } = entry;
  return {
    '@type': 'EducationalOrganization',
    '@id': ORG_ID,
    name: data.campusName,
    address: data.address,
    telephone: data.phone,
    email: data.email,
    ...(data.mapUrl ? { hasMap: data.mapUrl } : {}),
    ...(data.officeHours ? { openingHours: data.officeHours } : {}),
  };
}

// Every page that references the school entity by @id needs this entry to exist.
// Throwing here (instead of letting a missing entry silently produce an undefined
// @id) was flagged as a critical gap during /plan-eng-review — the failure must
// be loud, not a broken reference that ships quietly.
export async function getCanonicalOrg() {
  const entry = await getEntry('contact', 'main');
  if (!entry) {
    throw new Error(
      'Missing canonical contact entry at src/content/contact/main.md. ' +
        "Tuition/Curriculum pages reference the school's EducationalOrganization " +
        'entity by @id from this entry (see PLANNING.md Content Schema Sketch) — ' +
        'create it before building pages that depend on it.',
    );
  }
  return contactToOrg(entry);
}

export function tuitionToOffer(entry: CollectionEntry<'tuition'>) {
  const { data } = entry;
  return {
    '@type': 'Offer',
    name: data.programName,
    category: data.gradeRange,
    priceCurrency: data.currency,
    // annualFee (Number) when approved for publication; feeRange (Text) as the
    // documented fallback otherwise — see PLANNING.md Dependencies.
    price: data.annualFee ?? data.feeRange,
    availabilityStarts: data.academicYear,
    provider: { '@id': ORG_ID },
    ...(data.additionalFees.length
      ? {
          additionalProperty: data.additionalFees.map((fee) => ({
            '@type': 'PropertyValue',
            name: 'additionalFee',
            value: fee,
          })),
        }
      : {}),
  };
}
