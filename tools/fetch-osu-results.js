/**
 * One-time snapshot script to fetch osu! API v2 player stats and top 2026 PP plays
 * for the static results archive (`apps/frontend/src/data/snapshot2026.json`).
 *
 * Usage:
 *   1. Ensure `.env` has OSU_CLIENT_ID and OSU_CLIENT_SECRET (or set them in your environment).
 *   2. Populate `tools/players-2026.json` with ranks 1..15, their `osuId`, and `votes` / points label.
 *   3. Run: `npm run fetch:results` (or `node tools/fetch-osu-results.js`).
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Load .env if dotenv is available
try {
  require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
} catch (_) {
  // Fallback: env vars may already be provided in shell
}

const CLIENT_ID = process.env.OSU_CLIENT_ID;
const CLIENT_SECRET = process.env.OSU_CLIENT_SECRET;

const INPUT_PATH = path.resolve(__dirname, 'players-2026.json');
const OUTPUT_PATH = path.resolve(__dirname, '../apps/frontend/src/data/snapshot2026.json');

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Missing OSU_CLIENT_ID or OSU_CLIENT_SECRET in .env or environment.');
  process.exit(1);
}

function requestJson(method, urlString, headers, bodyObj) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlString);
    const body = bodyObj ? JSON.stringify(bodyObj) : null;
    const req = https.request(
      {
        hostname: url.hostname,
        path: url.pathname + url.search,
        method,
        headers: {
          Accept: 'application/json',
          ...(body ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } : {}),
          ...headers
        }
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          if (res.statusCode < 200 || res.statusCode >= 300) {
            return reject(new Error(`HTTP ${res.statusCode} for ${urlString}: ${data}`));
          }
          try {
            resolve(JSON.parse(data));
          } catch (err) {
            reject(err);
          }
        });
      }
    );
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function getAccessToken() {
  const res = await requestJson('POST', 'https://osu.ppy.sh/oauth/token', {}, {
    client_id: Number(CLIENT_ID),
    client_secret: CLIENT_SECRET,
    grant_type: 'client_credentials',
    scope: 'public'
  });
  return res.access_token;
}

function formatMonthYear(isoDate) {
  if (!isoDate) return '';
  const d = new Date(isoDate);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
}

function formatNumber(num) {
  if (num === null || num === undefined) return '';
  return Number(num).toLocaleString('en-US');
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchPlayerSnapshot(token, entry, targetYear, topPlaysCount) {
  const authHeader = { Authorization: `Bearer ${token}` };

  const user = await requestJson(
    'GET',
    `https://osu.ppy.sh/api/v2/users/${entry.osuId}/osu`,
    authHeader
  );

  // Small pause to stay well under osu! rate limits
  await delay(150);

  const scores = await requestJson(
    'GET',
    `https://osu.ppy.sh/api/v2/users/${entry.osuId}/scores/best?mode=osu&limit=100`,
    authHeader
  );

  const yearPrefix = `${targetYear}-`;
  const playsInYear = (scores || [])
    .filter((s) => {
      const ts = s.ended_at || s.created_at || '';
      return ts.startsWith(yearPrefix);
    })
    .sort((a, b) => (b.pp || 0) - (a.pp || 0))
    .slice(0, topPlaysCount)
    .map((s) => {
      const beatmapset = s.beatmapset || {};
      const beatmap = s.beatmap || {};
      const covers = beatmapset.covers || {};
      const timestamp = s.ended_at || s.created_at;

      return {
        title: beatmapset.title || 'Unknown Title',
        artist: beatmapset.artist || 'Unknown Artist',
        difficulty: beatmap.version || '',
        coverUrl:
          covers['card@2x'] ||
          covers.card ||
          covers['cover@2x'] ||
          covers.cover ||
          `https://assets.ppy.sh/beatmaps/${beatmapset.id}/covers/card@2x.jpg`,
        mapUrl:
          beatmap.url ||
          `https://osu.ppy.sh/beatmapsets/${beatmapset.id}#osu/${beatmap.id}`,
        mods: Array.isArray(s.mods) ? s.mods : [],
        grade: s.rank || 'S',
        accuracy: `${((s.accuracy || 0) * 100).toFixed(2)}%`,
        pp: Math.round(s.pp || 0),
        date: formatMonthYear(timestamp)
      };
    });

  const stats = user.statistics || {};
  const countryCode = (user.country_code || 'MY').toUpperCase();
  const coverUrl =
    (user.cover && (user.cover.custom_url || user.cover.url)) ||
    user.cover_url ||
    '';

  return {
    id: user.id,
    username: user.username,
    avatarUrl: `https://a.ppy.sh/${user.id}`,
    coverUrl,
    globalRank: stats.global_rank ? `#${formatNumber(stats.global_rank)}` : '',
    countryRank: stats.country_rank ? `${countryCode}#${formatNumber(stats.country_rank)}` : '',
    votes: entry.votes || '',
    topPlays2026: playsInYear
  };
}

async function main() {
  const input = JSON.parse(fs.readFileSync(INPUT_PATH, 'utf8'));
  const targetYear = input.year || 2026;
  const topPlaysCount = input.topPlaysCount || 3;

  console.log(`Fetching osu! API v2 snapshot for ${targetYear} (${input.players.length} players)...`);
  const token = await getAccessToken();

  const existing = fs.existsSync(OUTPUT_PATH)
    ? JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf8'))
    : { year: targetYear, players: {} };

  const playersMap = { ...(existing.players || {}) };

  for (const entry of input.players) {
    console.log(`  Fetching #${entry.rank} (osuId: ${entry.osuId})...`);
    const snap = await fetchPlayerSnapshot(token, entry, targetYear, topPlaysCount);
    playersMap[String(entry.rank)] = snap;
    console.log(
      `    -> ${snap.username} | ${snap.globalRank} | ${snap.countryRank} | ${snap.topPlays2026.length} plays in ${targetYear}`
    );
    await delay(200);
  }

  const output = {
    year: targetYear,
    generatedAt: new Date().toISOString(),
    players: playersMap
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2) + '\n', 'utf8');
  console.log(`\nSaved snapshot to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error('Snapshot fetch failed:', err);
  process.exit(1);
});
