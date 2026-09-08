export type TaggedVerse = { ref: string; text: string; tags: string[] };

// 50 KJV verses keyed to profile tag categories
export const TAGGED_VERSES: TaggedVerse[] = [
  // anxiety / depression
  { ref: 'Philippians 4:6-7', text: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.', tags: ['anxiety', 'depression'] },
  { ref: '1 Peter 5:7', text: 'Casting all your care upon him; for he careth for you.', tags: ['anxiety', 'depression', 'grief'] },
  { ref: 'Isaiah 41:10', text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.', tags: ['anxiety', 'depression', 'doubt'] },
  { ref: 'Matthew 11:28', text: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.', tags: ['anxiety', 'depression', 'nurse', 'teacher'] },
  { ref: '2 Timothy 1:7', text: 'For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.', tags: ['anxiety', 'depression', 'doubt'] },

  // grief / widowed
  { ref: 'Psalm 34:18', text: 'The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.', tags: ['grief', 'widowed', 'divorced'] },
  { ref: 'Revelation 21:4', text: 'And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain.', tags: ['grief', 'widowed', 'depression'] },
  { ref: 'Psalm 23:4', text: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.', tags: ['grief', 'widowed', 'health'] },
  { ref: 'Romans 8:28', text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.', tags: ['grief', 'doubt', 'divorced', 'health'] },

  // financial / business
  { ref: 'Philippians 4:19', text: 'But my God shall supply all your need according to his riches in glory by Christ Jesus.', tags: ['financial', 'business'] },
  { ref: 'Matthew 6:33', text: 'But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.', tags: ['financial', 'business', 'student'] },
  { ref: 'Proverbs 3:9-10', text: 'Honour the LORD with thy substance, and with the firstfruits of all thine increase: So shall thy barns be filled with plenty.', tags: ['financial', 'business'] },
  { ref: 'Proverbs 16:3', text: 'Commit thy works unto the LORD, and thy thoughts shall be established.', tags: ['business', 'work', 'doctor', 'nurse'] },

  // health
  { ref: 'Psalm 103:3', text: 'Who forgiveth all thine iniquities; who healeth all thy diseases.', tags: ['health', 'nurse', 'doctor'] },
  { ref: 'Jeremiah 30:17', text: 'For I will restore health unto thee, and I will heal thee of thy wounds, saith the LORD.', tags: ['health', 'nurse', 'doctor'] },
  { ref: 'James 5:15', text: 'And the prayer of faith shall save the sick, and the Lord shall raise him up.', tags: ['health', 'nurse', 'doctor'] },
  { ref: '3 John 1:2', text: 'Beloved, I wish above all things that thou mayest prosper and be in health, even as thy soul prospereth.', tags: ['health'] },

  // parent / family
  { ref: 'Proverbs 22:6', text: 'Train up a child in the way he should go: and when he is old, he will not depart from it.', tags: ['parent', 'single_mom', 'empty_nester', 'teacher'] },
  { ref: 'Psalm 127:3', text: 'Lo, children are an heritage of the LORD: and the fruit of the womb is his reward.', tags: ['parent', 'single_mom', 'newlywed'] },
  { ref: 'Joshua 24:15', text: 'But as for me and my house, we will serve the LORD.', tags: ['parent', 'married', 'single_mom'] },
  { ref: 'Lamentations 3:22-23', text: 'It is of the LORD\'s mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.', tags: ['single_mom', 'parent', 'grief', 'returning'] },

  // married / newlywed
  { ref: 'Genesis 2:24', text: 'Therefore shall a man leave his father and his mother, and shall cleave unto his wife: and they shall be one flesh.', tags: ['married', 'newlywed'] },
  { ref: '1 Corinthians 13:4-5', text: 'Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up; Doth not behave itself unseemly, seeketh not her own.', tags: ['married', 'newlywed', 'divorced'] },
  { ref: 'Proverbs 31:10', text: 'Who can find a virtuous woman? for her price is far above rubies.', tags: ['married', 'single_mom'] },

  // single / loneliness
  { ref: 'Psalm 68:6', text: 'God setteth the solitary in families: he bringeth out those which are bound with chains.', tags: ['single', 'single_mom', 'loneliness', 'divorced', 'widowed'] },
  { ref: 'Hebrews 13:5', text: 'I will never leave thee, nor forsake thee.', tags: ['loneliness', 'single', 'widowed', 'divorced', 'single_mom', 'anxiety'] },
  { ref: 'Psalm 139:14', text: 'I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well.', tags: ['single', 'depression', 'anxiety'] },
  { ref: 'Isaiah 54:5', text: 'For thy Maker is thine husband; the LORD of hosts is his name; and thy Redeemer the Holy One of Israel; The God of the whole earth shall he be called.', tags: ['single', 'widowed', 'divorced', 'loneliness'] },

  // divorced
  { ref: 'Isaiah 61:3', text: 'To give unto them beauty for ashes, the oil of joy for mourning, the garment of praise for the spirit of heaviness.', tags: ['divorced', 'grief', 'returning'] },

  // empty nester
  { ref: 'Jeremiah 29:11', text: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.', tags: ['empty_nester', 'returning', 'doubt'] },
  { ref: 'Isaiah 43:18-19', text: 'Remember ye not the former things, neither consider the things of old. Behold, I will do a new thing; now it shall spring forth.', tags: ['empty_nester', 'returning', 'divorced'] },

  // nurse / doctor / caregiver
  { ref: 'Isaiah 40:31', text: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.', tags: ['nurse', 'doctor', 'teacher', 'parent', 'business', 'depression'] },
  { ref: 'Colossians 3:23', text: 'And whatsoever ye do, do it heartily, as to the Lord, and not unto men.', tags: ['nurse', 'teacher', 'doctor', 'business', 'student'] },
  { ref: 'Matthew 25:40', text: 'Verily I say unto you, Inasmuch as ye have done it unto one of the least of these my brethren, ye have done it unto me.', tags: ['nurse', 'doctor', 'teacher', 'pastor'] },

  // teacher / student
  { ref: 'Deuteronomy 6:6-7', text: 'And these words, which I command thee this day, shall be in thine heart: And thou shalt teach them diligently unto thy children.', tags: ['teacher', 'parent'] },
  { ref: 'Psalm 25:4-5', text: 'Shew me thy ways, O LORD; teach me thy paths. Lead me in thy truth, and teach me: for thou art the God of my salvation.', tags: ['student', 'new_believer', 'teacher'] },
  { ref: 'Proverbs 4:7', text: 'Wisdom is the principal thing; therefore get wisdom: and with all thy getting get understanding.', tags: ['student', 'teacher', 'mature'] },

  // pastor / ministry
  { ref: '1 Timothy 4:12', text: 'Let no man despise thy youth; but be thou an example of the believers, in word, in conversation, in charity, in spirit, in faith, in purity.', tags: ['pastor', 'teacher', 'new_believer'] },
  { ref: '2 Timothy 2:15', text: 'Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth.', tags: ['pastor', 'teacher', 'student', 'mature'] },
  { ref: 'Mark 10:45', text: 'For even the Son of man came not to be ministered unto, but to minister, and to give his life a ransom for many.', tags: ['pastor', 'nurse', 'teacher'] },

  // new believer / returning
  { ref: '2 Corinthians 5:17', text: 'Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.', tags: ['new_believer', 'returning', 'addiction'] },
  { ref: 'John 3:16', text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.', tags: ['new_believer', 'returning', 'doubt'] },
  { ref: 'Luke 15:20', text: 'And he arose, and came to his father. But when he was yet a great way off, his father saw him, and had compassion, and ran, and fell on his neck, and kissed him.', tags: ['returning', 'doubt', 'grief', 'addiction'] },
  { ref: 'Romans 5:8', text: 'But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.', tags: ['new_believer', 'returning', 'addiction', 'doubt'] },

  // addiction
  { ref: '1 Corinthians 10:13', text: 'There hath no temptation taken you but such as is common to man: but God is faithful, who will not suffer you to be tempted above that ye are able; but will with the temptation also make a way to escape.', tags: ['addiction', 'doubt'] },
  { ref: 'Galatians 5:1', text: 'Stand fast therefore in the liberty wherewith Christ hath made us free, and be not entangled again with the yoke of bondage.', tags: ['addiction', 'returning'] },
  { ref: 'Romans 6:14', text: 'For sin shall not have dominion over you: for ye are not under the law, but under grace.', tags: ['addiction', 'returning', 'doubt'] },

  // mature faith / doubt
  { ref: 'Hebrews 11:1', text: 'Now faith is the substance of things hoped for, the evidence of things not seen.', tags: ['mature', 'doubt', 'new_believer'] },
  { ref: 'James 1:2-3', text: 'My brethren, count it all joy when ye fall into divers temptations; Knowing this, that the trying of your faith worketh patience.', tags: ['mature', 'grief', 'health', 'doubt'] },
  { ref: 'Philippians 4:13', text: 'I can do all things through Christ which strengtheneth me.', tags: ['mature', 'student', 'business', 'nurse', 'teacher', 'doctor'] },
];

// Short personalized greeting lines per top profile tag
const TAG_GREETING_LINES: Record<string, string> = {
  nurse:        'Your care for others reflects the heart of God.',
  doctor:       'Healing hands, faithful heart — He works through you.',
  teacher:      'You are shaping futures for His glory.',
  pastor:       'Lead well — He who calls you equips you.',
  parent:       'Your family is your greatest ministry.',
  student:      'God is guiding every step of your journey.',
  business:     'Let your work be your worship today.',
  single_mom:   'His strength is made perfect in your faithfulness.',
  divorced:     'His mercies are new every morning — for you.',
  widowed:      'He holds you close in every season of loss.',
  newlywed:     'A cord of three strands is not quickly broken.',
  empty_nester: 'A new chapter, written by His faithful hand.',
  single:       'Complete in Him — fully known and deeply loved.',
  married:      'Let Him be the center of your home today.',
  anxiety:      'Cast your cares — He is carrying you today.',
  depression:   'The joy of the Lord is your strength.',
  grief:        'He is close to the brokenhearted today.',
  addiction:    'Freedom is yours through Christ — hold fast.',
  financial:    'Your Provider sees every need you carry.',
  health:       'The healing God is still at work in you.',
  loneliness:   'You are never alone — He is right here.',
  doubt:        'Your faith, even small, moves mountains.',
  new_believer: 'Welcome home — heaven celebrates you.',
  returning:    'He ran to meet you — and He still does.',
  mature:       'Your roots run deep — keep bearing fruit.',
};

// Detect tags from profile fields (no API calls — purely local)
export function detectTags(
  freeText: string,
  season: string,
  struggles: string[],
  faith: string,
): string[] {
  const tags = new Set<string>();
  const lower = freeText.toLowerCase();

  const PROFESSIONS: Array<[string, string[]]> = [
    ['nurse',   ['nurse', 'nursing', 'rn ', ' rn,', 'lpn', 'cna', 'healthcare worker', 'med-surg', 'icu nurse']],
    ['teacher', ['teacher', 'teaching', 'educator', 'professor', 'tutor', 'classroom', 'school teacher', 'homeschool']],
    ['pastor',  ['pastor', 'minister', 'ministry', 'preacher', 'chaplain', 'church leader', 'lead pastor']],
    ['doctor',  ['doctor', 'physician', 'surgeon', 'psychiatrist', ' md,', 'medical doctor', 'pcp']],
    ['parent',  ['parent', ' mom ', 'mother', ' dad ', 'father', 'raising kids', 'my kids', 'my children', 'my son', 'my daughter']],
    ['student', ['student', 'college', 'university', 'studying', 'degree', 'grad school', 'high school', 'seminary']],
    ['business',['business', 'entrepreneur', 'startup', 'company owner', 'ceo', 'self-employed', 'small business', 'run a business']],
  ];

  for (const [tag, keywords] of PROFESSIONS) {
    if (keywords.some(k => lower.includes(k))) tags.add(tag);
  }

  const SITUATIONS: Array<[string, string[]]> = [
    ['single_mom', ['single mom', 'single mother', 'solo parent', 'raising my kids alone', 'raising kids alone', 'raising them alone']],
    ['divorced',   ['divorced', 'divorce', 'separated', 'separation', 'going through a divorce']],
    ['widowed',    ['widowed', 'widow', 'widower', 'lost my husband', 'lost my wife', 'lost my spouse', 'husband passed', 'wife passed']],
    ['newlywed',   ['newlywed', 'just married', 'newly married', 'new husband', 'new wife', 'recently married', 'got married']],
    ['empty_nester',['empty nest', 'empty nester', 'kids left home', 'children left', 'kids are grown', 'kids moved out']],
  ];

  for (const [tag, keywords] of SITUATIONS) {
    if (keywords.some(k => lower.includes(k))) tags.add(tag);
  }

  const SEASON_MAP: Record<string, string> = {
    'Single': 'single',
    'Married': 'married',
    'Parent': 'parent',
    'Widowed': 'widowed',
    'Divorced': 'divorced',
    'Empty Nester': 'empty_nester',
  };
  if (SEASON_MAP[season]) tags.add(SEASON_MAP[season]);

  const STRUGGLE_MAP: Record<string, string> = {
    'Anxiety': 'anxiety',
    'Grief': 'grief',
    'Financial': 'financial',
    'Health': 'health',
    'Relationships': 'loneliness',
    'Addiction': 'addiction',
    'Loneliness': 'loneliness',
    'Purpose': 'doubt',
    'Doubt': 'doubt',
    'Work Stress': 'business',
    'Depression': 'depression',
  };
  for (const s of struggles) {
    if (STRUGGLE_MAP[s]) tags.add(STRUGGLE_MAP[s]);
  }

  const FAITH_MAP: Record<string, string> = {
    'New believer': 'new_believer',
    'Growing in faith': 'mature',
    'Mature believer': 'mature',
    'Returning to faith': 'returning',
  };
  if (FAITH_MAP[faith]) tags.add(FAITH_MAP[faith]);

  return Array.from(tags);
}

const DEFAULT_VERSES = [
  { ref: 'Philippians 4:13',  text: 'I can do all things through Christ which strengtheneth me.' },
  { ref: 'Jeremiah 29:11',    text: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.' },
  { ref: 'Psalm 23:1',        text: 'The Lord is my shepherd; I shall not want.' },
  { ref: 'Romans 8:28',       text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.' },
  { ref: 'Isaiah 40:31',      text: 'But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles.' },
  { ref: 'Proverbs 3:5',      text: 'Trust in the Lord with all thine heart; and lean not unto thine own understanding.' },
  { ref: 'John 3:16',         text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.' },
  { ref: 'Matthew 11:28',     text: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.' },
  { ref: 'Psalm 46:1',        text: 'God is our refuge and strength, a very present help in trouble.' },
  { ref: 'Romans 15:13',      text: 'Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost.' },
  { ref: '2 Timothy 1:7',     text: 'For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.' },
  { ref: 'Psalm 34:18',       text: 'The Lord is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.' },
  { ref: 'Joshua 1:9',        text: 'Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.' },
  { ref: 'Lamentations 3:23', text: 'They are new every morning: great is thy faithfulness.' },
];

// Pick a verse that matches the user's profile tags, rotating daily
export function getVerseForTags(tags?: string[], dayOfYear = 0): { ref: string; text: string } {
  if (!tags?.length) {
    return DEFAULT_VERSES[dayOfYear % DEFAULT_VERSES.length];
  }
  const tagSet = new Set(tags);
  const scored = TAGGED_VERSES
    .map(v => ({ v, score: v.tags.filter(t => tagSet.has(t)).length }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score);

  if (!scored.length) {
    return DEFAULT_VERSES[dayOfYear % DEFAULT_VERSES.length];
  }

  // Build a pool: all top-tier matches, expanded to next tier if pool is small
  const topScore = scored[0].score;
  const topTier = scored.filter(x => x.score === topScore);
  const pool = topTier.length >= 7 ? topTier : scored.slice(0, Math.max(topTier.length, 7));

  const picked = pool[dayOfYear % pool.length];
  return { ref: picked.v.ref, text: picked.v.text };
}

// Return a personalized greeting line based on the user's top tag
export function getGreetingForTags(tags?: string[]): string {
  if (!tags?.length) return 'He has good plans for you today.';
  for (const tag of tags) {
    if (TAG_GREETING_LINES[tag]) return TAG_GREETING_LINES[tag];
  }
  return 'He has good plans for you today.';
}
