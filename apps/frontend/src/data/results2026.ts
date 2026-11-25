import snapshotData from './snapshot2026.json';

export interface ReplayClip {
  id: number;
  title: string;
  artist: string;
  songTitle: string;
  difficulty: string;
  fullTitle: string;
  src: string;
  startTime: number;
  mapUrl: string;
}

export interface TopPlayItem {
  title: string;
  artist: string;
  difficulty: string;
  coverUrl: string;
  mapUrl: string;
  mods: string[];
  grade: string;
  accuracy: string;
  pp: number;
  date?: string;
}

export interface VoterRemarkItem {
  id: number;
  username: string;
  avatarUrl: string;
  ranking: number;
  remarks: string;
}

export interface PlayerResultEntry {
  rank: number;
  id: number;
  username: string;
  avatarUrl: string;
  coverUrl: string;
  globalRank: string;
  countryRank: string;
  votes: string;
  commentatorName: string;
  commentaryAudioSrc: string;
  scriptParagraphs: string[];
  skinLink: string;
  replays: ReplayClip[];
  topPlays2026: TopPlayItem[];
  voterRemarks: VoterRemarkItem[];
}

interface SnapshotPlayer {
  id: number;
  username: string;
  avatarUrl: string;
  coverUrl: string;
  globalRank: string;
  countryRank: string;
  votes?: string;
  topPlays2026?: TopPlayItem[];
}

const snapshotPlayers = (snapshotData.players || {}) as Record<string, SnapshotPlayer>;

const baseShowcaseEntries: Record<number, Partial<PlayerResultEntry>> = {
  7: {
    commentatorName: 'Johan (Duox)',
    commentaryAudioSrc: '/players%20submissions/10/ecoelement.mp3',
    skinLink: 'https://drive.google.com/file/d/17iR9olNFSnm1a7dnn3JM9NywUoLxiQwu/view',
    replays: [
      {
        id: 1,
        title: 'Replay 1',
        artist: 'Tatsh',
        songTitle: 'Xevel',
        difficulty: 'CAN YOU HEAR MY SOUL AND DARKNESS',
        fullTitle: 'Tatsh - Xevel [CAN YOU HEAR MY SOUL AND DARKNESS]',
        src: '/players%20submissions/10/replays/eco1.mp4',
        startTime: 100, // 01:40
        mapUrl: 'https://osu.ppy.sh/beatmapsets/1174491#osu/2449759'
      },
      {
        id: 2,
        title: 'Replay 2',
        artist: 'DystopiaGround',
        songTitle: 'AugoEidEs',
        difficulty: 'oyasumi',
        fullTitle: 'DystopiaGround - AugoEidEs [oyasumi]',
        src: '/players%20submissions/10/replays/eco2.mp4',
        startTime: 340, // 05:40
        mapUrl: 'https://osu.ppy.sh/beatmapsets/346104#osu/764082'
      },
      {
        id: 3,
        title: 'Replay 3',
        artist: 'Manticora',
        songTitle: 'Humiliation Supreme',
        difficulty: 'Extra',
        fullTitle: 'Manticora - Humiliation Supreme [Extra]',
        src: '/players%20submissions/10/replays/eco3.mp4',
        startTime: 0, // 00:00
        mapUrl: 'https://osu.ppy.sh/beatmapsets/2364885#osu/5109853'
      }
    ],
    scriptParagraphs: [
      'Here’s the updated script with the added detail about this being Jason’s first time in the top 10 of osu! Malaysia:',
      'Coming up at 7th place is Jason, a player renowned for his mastery of the Hidden mod and precise aim on high-star-rating maps. 2024 has been a breakout year for Jason, as he achieved a top 6 finish in the osu! Malaysia Tournament and his first time ever breaking into the top 10 list of osu Malaysia players !',
      "Among his standout achievements this year is his incredible full combo on Xevel's AugoEidEs, a map notorious for its demanding aim and unforgiving patterns. This play highlighted his exceptional consistency and reading ability, earning its place as one of his best performances of the year.",
      'With his talent and determination, Jason continues to climb the ranks. Let’s see what he brings to the table this year. Good luck, Jason!"',
      'Let me know if there’s anything else you’d like to adjust!'
    ],
    voterRemarks: [
      {
        id: 3995630,
        username: 'Rampax',
        avatarUrl: 'https://a.ppy.sh/3995630',
        ranking: 6,
        remarks:
          'Incredible consistency and tournament plays throughout the year, especially that AugoEidEs FC! Truly deserving of top 10.'
      },
      {
        id: 8226107,
        username: 'Chiyuu',
        avatarUrl: 'https://a.ppy.sh/8226107',
        ranking: 7,
        remarks:
          'Super clean HD aim player and huge breakthrough in the OMT tourney this year. Great teammate and solid growth!'
      },
      {
        id: 10343292,
        username: 'mint breeze',
        avatarUrl: 'https://a.ppy.sh/10343292',
        ranking: 8,
        remarks:
          'Insane reading and high-star aim. Jason has been grinding like crazy in 2024 and his skill ceiling is ridiculously high.'
      },
      {
        id: 2932510,
        username: 'wuhua',
        avatarUrl: 'https://a.ppy.sh/2932510',
        ranking: 7,
        remarks:
          'One of the most reliable HD aimers in the country right now. Excited to see him push even further in future tournaments!'
      },
      {
        id: 9364594,
        username: 'Sagisawa Arisu',
        avatarUrl: 'https://a.ppy.sh/9364594',
        ranking: 9,
        remarks:
          'Solid all-round performance and tournament consistency. Very impressive jump into the top 10 this year, keep it up!'
      }
    ]
  }
};

/**
 * Resolves the showcase data for a given 2026 rank (1..15).
 * Combines the snapshot fetched via osu! API v2 (`snapshot2026.json`)
 * with curated replay media, scripts, skin links, and voter remarks.
 * Falls back to rank 7 preview entry when testing unpopulated ranks.
 */
export function getPlayerResult2026(rank: number): PlayerResultEntry {
  const snap = snapshotPlayers[String(rank)] || snapshotPlayers['7'];
  const showcase = baseShowcaseEntries[rank] || baseShowcaseEntries[7];

  return {
    rank,
    id: snap.id,
    username: snap.username,
    avatarUrl: snap.avatarUrl || `https://a.ppy.sh/${snap.id}`,
    coverUrl: snap.coverUrl,
    globalRank: snap.globalRank || '',
    countryRank: snap.countryRank || '',
    votes: snap.votes || '',
    commentatorName: showcase.commentatorName || '',
    commentaryAudioSrc: showcase.commentaryAudioSrc || '',
    scriptParagraphs: showcase.scriptParagraphs || [],
    skinLink: showcase.skinLink || '',
    replays: showcase.replays || [],
    topPlays2026: snap.topPlays2026 || [],
    voterRemarks: showcase.voterRemarks || []
  };
}
