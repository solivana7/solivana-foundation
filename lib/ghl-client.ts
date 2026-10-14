// Minimal GHL (LeadConnector v2) client — just the calls /library auth needs.
// Per reference_ghl_api_v2.md: search uses filters[] array, no filtersOperator,
// owner contact pinning is irrelevant here (we lookup by member's own email).

const GHL_API_BASE = 'https://services.leadconnectorhq.com';
const GHL_API_VERSION = '2021-07-28';

interface GhlContact {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  tags?: string[];
}

function getCreds() {
  const token = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) {
    throw new Error('GHL_API_KEY and GHL_LOCATION_ID must be set.');
  }
  return { token, locationId };
}

export async function findContactByEmail(
  email: string
): Promise<GhlContact | null> {
  const { token, locationId } = getCreds();
  const normalized = email.trim().toLowerCase();

  const res = await fetch(`${GHL_API_BASE}/contacts/search`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Version: GHL_API_VERSION,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      locationId,
      pageLimit: 1,
      filters: [
        {
          field: 'email',
          operator: 'eq',
          value: normalized,
        },
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`GHL search failed: ${res.status} ${text.slice(0, 200)}`);
  }

  const data = (await res.json()) as { contacts?: GhlContact[] };
  const first = data.contacts?.[0];
  return first ?? null;
}

export function hasFoundationAccess(contact: GhlContact | null): boolean {
  if (!contact?.tags) return false;
  return contact.tags.some(
    (t) => typeof t === 'string' && t.toLowerCase() === 'foundation-active-cohort'
  );
}

interface UpsertInput {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  source?: string;
}

// Create the contact if missing, otherwise return the existing one.
// Used by the /redeem free-access flow to onboard recipients of comp codes.
export async function createOrFindContact(
  input: UpsertInput
): Promise<GhlContact> {
  const existing = await findContactByEmail(input.email);
  if (existing) return existing;

  const { token, locationId } = getCreds();
  const res = await fetch(`${GHL_API_BASE}/contacts/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Version: GHL_API_VERSION,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      locationId,
      email: input.email.trim().toLowerCase(),
      firstName: input.firstName?.trim() || undefined,
      lastName: input.lastName?.trim() || undefined,
      phone: input.phone?.trim() || undefined,
      source: input.source || 'The Foundation - Free Redemption',
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`GHL create contact failed: ${res.status} ${text.slice(0, 200)}`);
  }

  const data = (await res.json()) as { contact?: GhlContact };
  if (!data.contact?.id) {
    throw new Error('GHL create contact returned no id');
  }
  return data.contact;
}

// Add one or more tags to a contact. Idempotent on the GHL side.
export async function addTagsToContact(
  contactId: string,
  tags: string[]
): Promise<void> {
  if (!tags.length) return;
  const { token } = getCreds();
  const res = await fetch(`${GHL_API_BASE}/contacts/${contactId}/tags`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Version: GHL_API_VERSION,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ tags }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`GHL add tags failed: ${res.status} ${text.slice(0, 200)}`);
  }
}
