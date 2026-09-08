// Ported from faithspark-web/src/constants/data.ts — prayer board seed content
// (shown alongside real Firestore posts so the board never looks empty).

export type PrayerRequest = {
  id: string | number;
  name: string;
  text: string;
  hearts: number;
  prayed: boolean;
  time: string;
  cat: string;
  expanded: boolean;
  anonymous?: boolean;
  uid?: string;
  groupId?: string;
  isSparkPost?: boolean;
  requesterName?: string;
  ts?: number;
};

export type SeedComment = { id: string; author: string; text: string; time: string };
export const SEED_COMMENTS: Record<string, SeedComment[]> = {
  '1': [
    { id: 's1a', author: 'Deacon Ray', text: "Standing in agreement with you, Sarah. The Lord is Marcus's healer. Covering him and your whole family in prayer tonight.", time: '1h ago' },
    { id: 's1b', author: 'Pastor Angela', text: 'Isaiah 41:10 — "Fear not, for I am with you." We are praying with you.', time: '45m ago' },
  ],
  '3': [
    { id: 's3a', author: 'James W.', text: "90 days is HUGE. God's hand is all over this. Keep going brother, we're right here with you.", time: '3h ago' },
    { id: 's3b', author: 'Linda K.', text: 'Praying for supernatural strength every single moment. You are not alone in this fight.', time: '2h ago' },
    { id: 's3c', author: 'Grace C.', text: 'This brought tears to my eyes. What a testimony being written. Rooting for you!', time: '1h ago' },
  ],
  '7': [
    { id: 's7a', author: 'Anonymous', text: 'Praying for your whole family. What a beautiful life he lived. May heaven feel closer to you today.', time: '7h ago' },
    { id: 's7b', author: 'Maria R.', text: 'Grief is love with nowhere to go. Holding your family in prayer. God is near to the brokenhearted.', time: '6h ago' },
  ],
  '17': [
    { id: 's17a', author: 'Anonymous', text: "We walked this road too. Four years and three losses before our miracle. I'm praying with everything I have for yours.", time: '1d ago' },
    { id: 's17b', author: 'Pastor Mike', text: 'God knows every name, every dream, every tear. You are seen. Continuing to lift you both up.', time: '20h ago' },
  ],
  '23': [
    { id: 's23a', author: 'Amara O.', text: 'I was one of the ones praying! This is AMAZING news. God is so good. Praise Him!!', time: '2d ago' },
    { id: 's23b', author: 'Emmanuel A.', text: 'This made my whole day. Our God heals. Thank you for sharing the praise report!', time: '2d ago' },
    { id: 's23c', author: 'Naomi J.', text: 'Tears of joy reading this. You give me hope. So happy for you, sister.', time: '1d ago' },
  ],
};

export type PrayerGroup = { id: number; name: string; members: number; emoji: string };

export const SAMPLE_GROUPS: PrayerGroup[] = [
  { id: 1, name: "Grace Community Church", members: 47, emoji: "⛪" },
  { id: 2, name: "Monday Night Bible Study", members: 12, emoji: "📖" },
  { id: 3, name: "Moms in Prayer", members: 28, emoji: "🙏" },
];

// ─── PRAYER BOARD SEED DATA ───────────────────────────────────────────────────

export type SeedReactions = { pray: number; love: number; strong: number };

export const LOCAL_SEED_PRAYERS: PrayerRequest[] = [
  { id: -1,  name: 'Sarah Mitchell',        text: "Please pray for my mother going through chemotherapy. She starts her third round next week and we are believing God for complete healing. Isaiah 53:5 has been our anchor verse.", hearts: 47,  prayed: false, time: '2h ago',  cat: 'Health',   expanded: false, anonymous: false },
  { id: -2,  name: 'Marcus Thompson',       text: "Asking for prayer for my job interview tomorrow. I have been unemployed for 3 months and this feels like a God-opened door. Please agree with me for favor.", hearts: 34,  prayed: false, time: '4h ago',  cat: 'Work',     expanded: false, anonymous: false },
  { id: -3,  name: 'Anonymous',             text: "Please pray for my marriage. My husband and I have grown so far apart. I am believing God can restore what feels completely broken.", hearts: 89,  prayed: false, time: '6h ago',  cat: 'Marriage', expanded: false, anonymous: true  },
  { id: -4,  name: 'Pastor David Lewis',    text: "Please pray for our church building fund. We need $50,000 more to break ground on our new sanctuary. God has provided every step of the way.", hearts: 134, prayed: false, time: '8h ago',  cat: 'Praise',   expanded: false, anonymous: false },
  { id: -5,  name: 'Grace Williams',        text: "Please pray for my best friend who just found out she has stage 2 breast cancer. She is only 34 with two little girls ages 3 and 6. Believing God for a complete miracle.", hearts: 156, prayed: false, time: '12h ago', cat: 'Health',   expanded: false, anonymous: false },
  { id: -6,  name: 'Lisa and James Parker', text: "We have been trying to have a baby for 4 years. Three miscarriages and two failed IVF treatments. We are standing on Luke 1:37 -- nothing is impossible with God.", hearts: 203, prayed: false, time: '18h ago', cat: 'Family',   expanded: false, anonymous: false },
  { id: -7,  name: 'Anonymous',             text: "I have been struggling with addiction for 6 years. I feel so much shame but I know God loves me. Please pray that this time I find real freedom.", hearts: 112, prayed: false, time: '1d ago',  cat: 'Strength', expanded: false, anonymous: true  },
  { id: -8,  name: 'Robert and Nancy Kim',  text: "Our 8 year old son was diagnosed with leukemia. He told us Jesus will heal him. Please pray that his faith is rewarded and God heals our boy completely.", hearts: 289, prayed: false, time: '30h ago', cat: 'Health',   expanded: false, anonymous: false },
  { id: -9,  name: 'Brian Nguyen',          text: "I am a first responder dealing with PTSD after a mass casualty event. I cannot unsee what I saw. Please pray for healing of my mind and that my faith would be my anchor.", hearts: 143, prayed: false, time: '36h ago', cat: 'Strength', expanded: false, anonymous: false },
  { id: -10, name: 'Hannah Osei',           text: "I am a missionary in Haiti and things have become very dangerous. Our team is considering evacuation. Please pray for protection and wisdom about whether to stay or go.", hearts: 167, prayed: false, time: '2d ago',  cat: 'Salvation',expanded: false, anonymous: false },
];

export const LOCAL_SEED_COMMENTS: Record<string, SeedComment[]> = {
  '-1':  [{ id: 'sc1a', author: 'Pastor David Lewis', text: "Praying right now Sarah. Our God is a healer!", time: '1h ago' }, { id: 'sc1b', author: 'Grace Williams', text: "Sending love and prayers. My aunt was completely healed!", time: '30m ago' }],
  '-2':  [{ id: 'sc2a', author: 'Jennifer R.', text: "Praying for supernatural favor! You got this!", time: '2h ago' }, { id: 'sc2b', author: 'Lisa Parker', text: "God goes before you into that room. We are all praying!", time: '1h ago' }],
  '-3':  [{ id: 'sc3a', author: 'Lisa Parker', text: "God is a restorer. Praying right now!", time: '4h ago' }, { id: 'sc3b', author: 'Pastor Rosa M.', text: "Marriage is worth fighting for. Praying for breakthrough.", time: '3h ago' }, { id: 'sc3c', author: 'Grace Williams', text: "God restored my parents marriage. Nothing is impossible. Praying!", time: '2h ago' }],
  '-4':  [{ id: 'sc4a', author: 'Sarah Mitchell', text: "Praying and believing with you Pastor David!", time: '6h ago' }, { id: 'sc4b', author: 'Michael B.', text: "God came through in the final week for us too. Praying!", time: '5h ago' }],
  '-5':  [{ id: 'sc5a', author: 'Lisa Parker', text: "Jesus is still in the healing business!", time: '10h ago' }, { id: 'sc5b', author: 'Pastor Rosa M.', text: "She will live and not die! Praying with everything I have!", time: '8h ago' }, { id: 'sc5c', author: 'Anonymous', text: "I survived stage 3 breast cancer. God is faithful. Praying!", time: '7h ago' }],
  '-6':  [{ id: 'sc6a', author: 'Sarah Mitchell', text: "Sarah and Abraham waited too. God is not finished writing your story.", time: '15h ago' }, { id: 'sc6b', author: 'Anonymous', text: "I was told I could never have children. I now have 3. Praying!", time: '14h ago' }, { id: 'sc6c', author: 'Pastor Rosa M.', text: "Elizabeth was called barren and then John the Baptist was born. Your miracle is coming!", time: '12h ago' }],
  '-7':  [{ id: 'sc7a', author: 'Pastor David Lewis', text: "There is NO condemnation in Christ Jesus. God is reaching for you right now.", time: '22h ago' }, { id: 'sc7b', author: 'Anonymous', text: "I have 3 years sober through faith. You are not alone. Praying!", time: '20h ago' }],
  '-8':  [{ id: 'sc8a', author: 'Grace Williams', text: "That little boys faith is moving mountains. Praying with everything I have!", time: '28h ago' }, { id: 'sc8b', author: 'Pastor Rosa M.', text: "Jesus is holding your son. Praying for complete healing!", time: '26h ago' }, { id: 'sc8c', author: 'Anonymous', text: "My nephew had leukemia at 6. He is 14 now and completely healthy. God heals!", time: '25h ago' }],
  '-9':  [{ id: 'sc9a', author: 'Thomas Kennedy', text: "Thank you for your service. Praying for God to heal every memory.", time: '34h ago' }, { id: 'sc9b', author: 'Anonymous', text: "Fellow first responder here. You are not alone in this. Praying!", time: '32h ago' }],
  '-10': [{ id: 'sc10a', author: 'Pastor Emmanuel A.', text: "Praying for your safety and for Gods wisdom to guide every decision!", time: '46h ago' }, { id: 'sc10b', author: 'Grace Williams', text: "Praying for supernatural protection over you and your whole team!", time: '44h ago' }],
};

export const LOCAL_SEED_REACTIONS: Record<number, SeedReactions> = {
  [-1]: { pray: 47, love: 12, strong: 8 }, [-2]: { pray: 34, love: 9, strong: 14 },
  [-3]: { pray: 89, love: 31, strong: 7 }, [-4]: { pray: 134, love: 22, strong: 11 },
  [-5]: { pray: 156, love: 44, strong: 9 }, [-6]: { pray: 203, love: 61, strong: 18 },
  [-7]: { pray: 112, love: 28, strong: 35 }, [-8]: { pray: 289, love: 77, strong: 42 },
  [-9]: { pray: 143, love: 33, strong: 57 }, [-10]: { pray: 167, love: 39, strong: 21 },
};
