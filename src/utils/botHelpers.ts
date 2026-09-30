import { CONFIG } from '../config.js';

export interface NormalizedBot {
  id: string;
  name: string;
  username: string;
  telegramUrl: string;
  category: string;
  status: 'active' | 'deactivated';
  description: string;
  recordType: 'detailed' | 'database';
}

export interface NormalizedCommunity {
  id: string;
  name: string;
  type: string;
  telegramUrl: string;
  description: string;
  status: 'active' | 'deactivated';
  memberCount?: string | number;
}

/**
 * Extracts a clean @username from a Telegram URL if no explicit username was provided.
 * Preserves the exact handle from the URL without altering characters.
 */
export function extractUsernameFromUrl(url: string, explicitUsername?: string): string {
  if (explicitUsername && explicitUsername.trim().length > 0) {
    const clean = explicitUsername.trim();
    return clean.startsWith('@') ? clean : `@${clean}`;
  }
  try {
    const parsed = new URL(url.trim());
    const pathSegment = parsed.pathname.replace(/^\/+/, '').split('/')[0];
    if (pathSegment && !pathSegment.startsWith('+')) {
      return `@${pathSegment}`;
    }
  } catch {
    // Fallback regex
    const match = url.match(/t\.me\/([^/?#]+)/i);
    if (match && match[1] && !match[1].startsWith('+')) {
      return `@${match[1]}`;
    }
  }
  return '';
}

/**
 * Combines `detailedBots` and `botDatabase` from CONFIG while:
 * 1. Keeping the 10 SUDO bot entries separate from the 4 detailed bots.
 * 2. Deduplicating if an identical Telegram URL or username appears more than once.
 * 3. Generating a short, strictly non-invented generic description for bots without detailed descriptions.
 */
export function getNormalizedBots(configData: typeof CONFIG = CONFIG): NormalizedBot[] {
  const seenUrls = new Set<string>();
  const seenUsernames = new Set<string>();
  const result: NormalizedBot[] = [];

  const rawDetailed = Array.isArray(configData.detailedBots) ? configData.detailedBots : [];
  const rawDatabase = Array.isArray(configData.botDatabase) ? configData.botDatabase : [];

  const processEntry = (
    raw: {
      id?: string;
      name: string;
      username?: string;
      telegramUrl: string;
      category?: string;
      status?: string;
      description?: string;
    },
    recordType: 'detailed' | 'database',
    index: number
  ) => {
    if (!raw || !raw.telegramUrl || !raw.name) return;

    const cleanUrl = raw.telegramUrl.trim();
    const urlKey = cleanUrl.toLowerCase().replace(/\/+$/, '');
    const derivedUsername = extractUsernameFromUrl(cleanUrl, raw.username);
    const usernameKey = derivedUsername.toLowerCase();

    // Prevent duplicate cards if identical Telegram URL or username is detected
    if (seenUrls.has(urlKey)) return;
    if (usernameKey && seenUsernames.has(usernameKey)) return;

    seenUrls.add(urlKey);
    if (usernameKey) {
      seenUsernames.add(usernameKey);
    }

    const normalizedStatus: 'active' | 'deactivated' =
      String(raw.status || 'active').toLowerCase() === 'active' ? 'active' : 'deactivated';

    const category =
      raw.category && raw.category.trim().length > 0
        ? raw.category.trim()
        : recordType === 'database'
          ? 'SUDO BOT'
          : 'TELEGRAM BOT';

    // Short generic description based ONLY on provided name/category when description is omitted
    const description =
      raw.description && raw.description.trim().length > 0
        ? raw.description.trim()
        : `${raw.name.trim()} — configured ${category.toLowerCase()} record in the GETO Telegram bot database.`;

    result.push({
      id: raw.id || `${recordType}-${index}-${raw.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: raw.name.trim(),
      username: derivedUsername,
      telegramUrl: cleanUrl,
      category,
      status: normalizedStatus,
      description,
      recordType,
    });
  };

  rawDetailed.forEach((bot, idx) => processEntry(bot, 'detailed', idx));
  rawDatabase.forEach((bot, idx) => processEntry(bot, 'database', idx));

  return result;
}

/**
 * Dynamically calculates TOTAL BOTS, ACTIVE BOTS, and DEACTIVATED BOTS from CONFIG.
 * Never hard-codes numbers.
 */
export function calculateBotCounters(bots: NormalizedBot[]) {
  const totalBots = bots.length;
  const activeBots = bots.filter((b) => b.status === 'active').length;
  const deactivatedBots = bots.filter((b) => b.status !== 'active').length;
  const detailedCount = bots.filter((b) => b.recordType === 'detailed').length;
  const databaseCount = bots.filter((b) => b.recordType === 'database').length;

  return {
    totalBots,
    activeBots,
    deactivatedBots,
    detailedCount,
    databaseCount,
  };
}
