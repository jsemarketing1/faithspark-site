export type ReadingPlanPassage = {
  book: string;
  chapter: number;
  verseStart?: number;
  verseEnd?: number;
};

export type ReadingPlanDay = {
  day: number;
  title: string;
  passages: ReadingPlanPassage[];
  reflection?: string;
};

export type ReadingPlan = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: number;
  category: 'bible' | 'devotional' | 'topical' | 'beginner';
  emoji: string;
  color: string;
  estimatedMinutes: number;
  days: ReadingPlanDay[];
};

// ── Gospels in 40 Days ────────────────────────────────────────────────────────
const GOSPELS_40: ReadingPlanDay[] = [
  { day: 1, title: 'The Word Became Flesh', passages: [{ book: 'John', chapter: 1 }], reflection: 'Jesus existed before creation itself. How does knowing this change how you see Him today?' },
  { day: 2, title: 'The Birth of Jesus', passages: [{ book: 'Luke', chapter: 1 }], reflection: 'Mary said "let it be as you have said." What area of your life needs that surrender?' },
  { day: 3, title: 'God With Us', passages: [{ book: 'Matthew', chapter: 1 }], reflection: 'Emmanuel means God with us. Where do you most need to feel His presence today?' },
  { day: 4, title: 'The Shepherds and the Magi', passages: [{ book: 'Luke', chapter: 2 }], reflection: 'Both poor shepherds and wealthy wise men came to worship Jesus. What does this say about who Jesus came for?' },
  { day: 5, title: 'John the Baptist', passages: [{ book: 'Mark', chapter: 1 }], reflection: 'John prepared the way. How can you prepare your heart to receive more of God?' },
  { day: 6, title: 'The Baptism of Jesus', passages: [{ book: 'Matthew', chapter: 3 }], reflection: 'The Father said "This is my beloved Son." You are also called beloved. Does that feel real to you?' },
  { day: 7, title: 'Temptation in the Wilderness', passages: [{ book: 'Luke', chapter: 4, verseStart: 1, verseEnd: 13 }], reflection: 'Jesus defeated every temptation with Scripture. What verse could you memorize to fight your biggest temptation?' },
  { day: 8, title: 'First Disciples', passages: [{ book: 'John', chapter: 1, verseStart: 35, verseEnd: 51 }], reflection: 'Jesus said "come and see." What would it look like to accept that same invitation today?' },
  { day: 9, title: 'Water into Wine', passages: [{ book: 'John', chapter: 2, verseStart: 1, verseEnd: 11 }], reflection: 'Jesus saved the best for last. Where in your life are you waiting on God to come through?' },
  { day: 10, title: 'The Sermon on the Mount', passages: [{ book: 'Matthew', chapter: 5 }], reflection: 'Which Beatitude do you most need to receive today? Which do you most need to live out?' },
  { day: 11, title: 'Love Your Enemies', passages: [{ book: 'Matthew', chapter: 5, verseStart: 38, verseEnd: 48 }], reflection: 'Is there someone you need to pray for today — even someone who has hurt you?' },
  { day: 12, title: 'The Lord\'s Prayer', passages: [{ book: 'Matthew', chapter: 6, verseStart: 1, verseEnd: 18 }], reflection: 'Pray the Lord\'s Prayer slowly. What word or phrase stands out to you?' },
  { day: 13, title: 'Do Not Worry', passages: [{ book: 'Matthew', chapter: 6, verseStart: 19, verseEnd: 34 }], reflection: 'What worry do you need to surrender to God right now?' },
  { day: 14, title: 'Ask, Seek, Knock', passages: [{ book: 'Matthew', chapter: 7 }], reflection: 'Jesus promises those who ask receive. What bold request have you been afraid to bring to God?' },
  { day: 15, title: 'Jesus Heals Many', passages: [{ book: 'Mark', chapter: 1, verseStart: 21, verseEnd: 45 }], reflection: 'The leper said "if you are willing." Jesus immediately said "I am willing." Do you believe He is willing for you?' },
  { day: 16, title: 'The Paralyzed Man', passages: [{ book: 'Mark', chapter: 2, verseStart: 1, verseEnd: 12 }], reflection: 'His friends carried him to Jesus. Who in your life needs you to carry them to God in prayer?' },
  { day: 17, title: 'The Woman at the Well', passages: [{ book: 'John', chapter: 4 }], reflection: 'Jesus offered living water to someone society had rejected. Who might God be calling you to see differently?' },
  { day: 18, title: 'The Feeding of 5,000', passages: [{ book: 'John', chapter: 6, verseStart: 1, verseEnd: 21 }], reflection: 'A boy gave what little he had and Jesus multiplied it. What small offering can you give to God today?' },
  { day: 19, title: 'I Am the Bread of Life', passages: [{ book: 'John', chapter: 6, verseStart: 22, verseEnd: 59 }], reflection: 'Jesus says He is bread — something we need daily, not just weekly. How can you feast on Him today?' },
  { day: 20, title: 'The Good Samaritan', passages: [{ book: 'Luke', chapter: 10, verseStart: 25, verseEnd: 37 }], reflection: 'Who is your neighbor? Who is the person you tend to walk past?' },
  { day: 21, title: 'The Prodigal Son', passages: [{ book: 'Luke', chapter: 15, verseStart: 11, verseEnd: 32 }], reflection: 'The father ran to meet his returning son. Have you fully received the Father\'s embrace for yourself?' },
  { day: 22, title: 'Lazarus Raised', passages: [{ book: 'John', chapter: 11 }], reflection: 'Jesus wept. He is not distant from your grief. What sorrow do you need to bring to Him today?' },
  { day: 23, title: 'I Am the Good Shepherd', passages: [{ book: 'John', chapter: 10, verseStart: 1, verseEnd: 21 }], reflection: 'A good shepherd knows his sheep by name. Do you believe Jesus knows you by name — every detail?' },
  { day: 24, title: 'The Transfiguration', passages: [{ book: 'Luke', chapter: 9, verseStart: 28, verseEnd: 36 }], reflection: 'Jesus\' true glory was revealed on the mountain. How do you need a fresh glimpse of who He really is?' },
  { day: 25, title: 'The Triumphal Entry', passages: [{ book: 'Matthew', chapter: 21, verseStart: 1, verseEnd: 11 }], reflection: 'The crowd praised. Days later they crucified. What does your worship of Jesus look like when things are hard?' },
  { day: 26, title: 'The Last Supper', passages: [{ book: 'John', chapter: 13 }], reflection: 'Jesus washed feet. True greatness is serving others. Who can you serve today with no expectation of return?' },
  { day: 27, title: 'The Upper Room Discourse', passages: [{ book: 'John', chapter: 14 }], reflection: 'Jesus promised peace not as the world gives. What worry can you trade today for His peace?' },
  { day: 28, title: 'The Vine and the Branches', passages: [{ book: 'John', chapter: 15 }], reflection: 'Abide. Stay connected. What habit keeps you most connected to Jesus? What disconnects you?' },
  { day: 29, title: 'Gethsemane', passages: [{ book: 'Matthew', chapter: 26, verseStart: 36, verseEnd: 56 }], reflection: 'Not my will but yours be done. What is the hardest thing God might be asking of you right now?' },
  { day: 30, title: 'The Trial', passages: [{ book: 'Luke', chapter: 22, verseStart: 54, verseEnd: 71 }, { book: 'Luke', chapter: 23, verseStart: 1, verseEnd: 25 }], reflection: 'Jesus was silent before His accusers. What does His composure in suffering say about His love for you?' },
  { day: 31, title: 'The Crucifixion', passages: [{ book: 'Luke', chapter: 23, verseStart: 26, verseEnd: 56 }], reflection: '"Father forgive them." Is there someone you need to offer that same prayer for today?' },
  { day: 32, title: 'It Is Finished', passages: [{ book: 'John', chapter: 19, verseStart: 17, verseEnd: 42 }], reflection: 'Tetelestai — paid in full. What debt of shame or guilt can you lay down at the cross today?' },
  { day: 33, title: 'The Resurrection', passages: [{ book: 'John', chapter: 20 }], reflection: 'Mary recognized Jesus when He said her name. Jesus knows your name. Does that feel personal to you?' },
  { day: 34, title: 'He Has Risen', passages: [{ book: 'Matthew', chapter: 28 }], reflection: 'Go and make disciples. Who in your life most needs to hear about Jesus?' },
  { day: 35, title: 'The Road to Emmaus', passages: [{ book: 'Luke', chapter: 24, verseStart: 13, verseEnd: 35 }], reflection: 'Their hearts burned within them. When do you most sense Jesus walking with you?' },
  { day: 36, title: 'Doubting Thomas', passages: [{ book: 'John', chapter: 20, verseStart: 19, verseEnd: 31 }], reflection: 'Jesus showed Thomas his wounds. What doubt do you need to bring honestly to Jesus today?' },
  { day: 37, title: 'Breakfast on the Shore', passages: [{ book: 'John', chapter: 21 }], reflection: 'Peter denied Jesus three times. Jesus restored him three times. No failure is too far for His grace.' },
  { day: 38, title: 'The Great Commission', passages: [{ book: 'Matthew', chapter: 28, verseStart: 16, verseEnd: 20 }], reflection: 'All authority has been given to Jesus. What fear can you lay down knowing He has all authority?' },
  { day: 39, title: 'The Ascension', passages: [{ book: 'Luke', chapter: 24, verseStart: 44, verseEnd: 53 }], reflection: 'He promised to return. How does knowing Jesus is coming back change how you live today?' },
  { day: 40, title: 'In the Beginning Was the Word', passages: [{ book: 'John', chapter: 1, verseStart: 1, verseEnd: 18 }], reflection: 'We end where we began. Jesus was there from the very start — and He will be there at the end. What do you want to say to Him today?' },
];

// ── Psalms in 30 Days ─────────────────────────────────────────────────────────
const PSALMS_30: ReadingPlanDay[] = [
  { day: 1, title: 'Blessed Is the One', passages: [{ book: 'Psalms', chapter: 1 }] },
  { day: 2, title: 'The Lord Is My Shepherd', passages: [{ book: 'Psalms', chapter: 23 }] },
  { day: 3, title: 'The Heavens Declare', passages: [{ book: 'Psalms', chapter: 19 }] },
  { day: 4, title: 'Create in Me a Clean Heart', passages: [{ book: 'Psalms', chapter: 51 }] },
  { day: 5, title: 'God Is Our Refuge', passages: [{ book: 'Psalms', chapter: 46 }] },
  { day: 6, title: 'The Lord Is My Light', passages: [{ book: 'Psalms', chapter: 27 }] },
  { day: 7, title: 'Wait on the Lord', passages: [{ book: 'Psalms', chapter: 37 }] },
  { day: 8, title: 'My Soul Thirsts', passages: [{ book: 'Psalms', chapter: 63 }] },
  { day: 9, title: 'Fearfully and Wonderfully Made', passages: [{ book: 'Psalms', chapter: 139 }] },
  { day: 10, title: 'The Lord Reigns', passages: [{ book: 'Psalms', chapter: 97 }] },
  { day: 11, title: 'His Love Endures Forever', passages: [{ book: 'Psalms', chapter: 136 }] },
  { day: 12, title: 'Bless the Lord', passages: [{ book: 'Psalms', chapter: 103 }] },
  { day: 13, title: 'Enter His Gates', passages: [{ book: 'Psalms', chapter: 100 }] },
  { day: 14, title: 'The Lord Is My Rock', passages: [{ book: 'Psalms', chapter: 18 }] },
  { day: 15, title: 'A Psalm of Ascent', passages: [{ book: 'Psalms', chapter: 121 }] },
  { day: 16, title: 'Praise in the Storm', passages: [{ book: 'Psalms', chapter: 77 }] },
  { day: 17, title: 'I Lift My Eyes', passages: [{ book: 'Psalms', chapter: 121 }] },
  { day: 18, title: 'The Lord\'s Lovingkindness', passages: [{ book: 'Psalms', chapter: 36 }] },
  { day: 19, title: 'Refuge in God Alone', passages: [{ book: 'Psalms', chapter: 62 }] },
  { day: 20, title: 'Thy Word Is a Lamp', passages: [{ book: 'Psalms', chapter: 119, verseStart: 1, verseEnd: 48 }] },
  { day: 21, title: 'Great Is the Lord', passages: [{ book: 'Psalms', chapter: 145 }] },
  { day: 22, title: 'Joy Comes in the Morning', passages: [{ book: 'Psalms', chapter: 30 }] },
  { day: 23, title: 'When I Am Afraid', passages: [{ book: 'Psalms', chapter: 56 }] },
  { day: 24, title: 'Steadfast Heart', passages: [{ book: 'Psalms', chapter: 112 }] },
  { day: 25, title: 'The Lord Is Close', passages: [{ book: 'Psalms', chapter: 34 }] },
  { day: 26, title: 'God\'s Faithfulness', passages: [{ book: 'Psalms', chapter: 89 }] },
  { day: 27, title: 'A New Song', passages: [{ book: 'Psalms', chapter: 96 }] },
  { day: 28, title: 'The Earth Is the Lord\'s', passages: [{ book: 'Psalms', chapter: 24 }] },
  { day: 29, title: 'Let Everything Praise', passages: [{ book: 'Psalms', chapter: 148 }] },
  { day: 30, title: 'Let Everything That Has Breath', passages: [{ book: 'Psalms', chapter: 150 }] },
];

// ── 7 Days of Peace ───────────────────────────────────────────────────────────
const PEACE_7: ReadingPlanDay[] = [
  { day: 1, title: 'Peace That Passes Understanding', passages: [{ book: 'Philippians', chapter: 4, verseStart: 4, verseEnd: 9 }], reflection: 'Name three things you\'re anxious about. Now hand them to God one by one.' },
  { day: 2, title: 'God\'s Perfect Peace', passages: [{ book: 'Isaiah', chapter: 26, verseStart: 3, verseEnd: 4 }], reflection: 'A mind stayed on God receives perfect peace. What are your thoughts stayed on today?' },
  { day: 3, title: 'Be Still and Know', passages: [{ book: 'Psalms', chapter: 46 }], reflection: 'Sit in silence for two minutes after reading. What did you notice?' },
  { day: 4, title: 'My Peace I Give You', passages: [{ book: 'John', chapter: 14, verseStart: 25, verseEnd: 31 }], reflection: 'Jesus gives peace not as the world gives. What\'s the difference between His peace and the world\'s version?' },
  { day: 5, title: 'Cast Your Anxiety', passages: [{ book: '1 Peter', chapter: 5, verseStart: 6, verseEnd: 11 }], reflection: 'The word cast means to throw forcefully. What worry do you need to throw at God today?' },
  { day: 6, title: 'The God of Peace', passages: [{ book: 'Romans', chapter: 15, verseStart: 13, verseEnd: 13 }], reflection: 'God is described as the God of peace. What would your day look like if you stayed connected to Him?' },
  { day: 7, title: 'I Have Overcome', passages: [{ book: 'John', chapter: 16, verseStart: 31, verseEnd: 33 }], reflection: 'Jesus says "take heart" — present tense. Speak this over yourself: "He has overcome. I have peace."' },
];

// ── Proverbs in 31 Days ───────────────────────────────────────────────────────
const PROVERBS_31: ReadingPlanDay[] = Array.from({ length: 31 }, (_, i) => ({
  day: i + 1,
  title: `Proverbs ${i + 1} — Day ${i + 1} of 31`,
  passages: [{ book: 'Proverbs', chapter: i + 1 }],
}));

// ── New Testament in 90 Days ──────────────────────────────────────────────────
const NT_90_BOOKS = [
  { book: 'Matthew', chapters: 28 },
  { book: 'Mark', chapters: 16 },
  { book: 'Luke', chapters: 24 },
  { book: 'John', chapters: 21 },
  { book: 'Acts', chapters: 28 },
  { book: 'Romans', chapters: 16 },
  { book: '1 Corinthians', chapters: 16 },
  { book: '2 Corinthians', chapters: 13 },
  { book: 'Galatians', chapters: 6 },
  { book: 'Ephesians', chapters: 6 },
  { book: 'Philippians', chapters: 4 },
  { book: 'Colossians', chapters: 4 },
  { book: '1 Thessalonians', chapters: 5 },
  { book: '2 Thessalonians', chapters: 3 },
  { book: '1 Timothy', chapters: 6 },
  { book: '2 Timothy', chapters: 4 },
  { book: 'Titus', chapters: 3 },
  { book: 'Philemon', chapters: 1 },
  { book: 'Hebrews', chapters: 13 },
  { book: 'James', chapters: 5 },
  { book: '1 Peter', chapters: 5 },
  { book: '2 Peter', chapters: 3 },
  { book: '1 John', chapters: 5 },
  { book: '2 John', chapters: 1 },
  { book: '3 John', chapters: 1 },
  { book: 'Jude', chapters: 1 },
  { book: 'Revelation', chapters: 22 },
];

function buildNT90(): ReadingPlanDay[] {
  const days: ReadingPlanDay[] = [];
  let dayNum = 1;
  for (const book of NT_90_BOOKS) {
    for (let ch = 1; ch <= book.chapters; ch += 3) {
      if (dayNum > 90) break;
      const passages: ReadingPlanPassage[] = [];
      for (let c = ch; c < ch + 3 && c <= book.chapters; c++) {
        passages.push({ book: book.book, chapter: c });
      }
      days.push({ day: dayNum, title: `${book.book} ${ch}${ch + 2 <= book.chapters ? '–' + (ch + 2) : ''}`, passages });
      dayNum++;
    }
  }
  return days;
}

// ── 14 Days of Gratitude ──────────────────────────────────────────────────────
const GRATITUDE_14: ReadingPlanDay[] = [
  { day: 1, title: 'Give Thanks to the Lord', passages: [{ book: 'Psalms', chapter: 107, verseStart: 1, verseEnd: 9 }], reflection: 'Write 5 specific things you\'re grateful for today. Not generic — specific.' },
  { day: 2, title: 'In Everything Give Thanks', passages: [{ book: '1 Thessalonians', chapter: 5, verseStart: 16, verseEnd: 18 }], reflection: 'Even in difficulty. What\'s one hard thing in your life you can choose to thank God for?' },
  { day: 3, title: 'Ten Lepers', passages: [{ book: 'Luke', chapter: 17, verseStart: 11, verseEnd: 19 }], reflection: 'Only one came back to say thank you. Are you more of a 9 or a 1 in your life right now?' },
  { day: 4, title: 'A Grateful Heart', passages: [{ book: 'Colossians', chapter: 3, verseStart: 12, verseEnd: 17 }], reflection: 'Let the word of Christ dwell richly. What scripture are you most grateful for today?' },
  { day: 5, title: 'The Sacrifice of Thanks', passages: [{ book: 'Psalms', chapter: 50, verseStart: 14, verseEnd: 23 }], reflection: 'Gratitude is called a sacrifice — it costs something. What does choosing gratitude cost you today?' },
  { day: 6, title: 'God\'s Indescribable Gift', passages: [{ book: '2 Corinthians', chapter: 9, verseStart: 6, verseEnd: 15 }], reflection: 'Thanks be to God for His indescribable gift. Take one minute to thank God just for Jesus.' },
  { day: 7, title: 'Rejoice Always', passages: [{ book: 'Philippians', chapter: 4, verseStart: 4, verseEnd: 7 }], reflection: 'Rejoice always. Not feel happy always. What\'s the difference and why does it matter?' },
  { day: 8, title: 'The Lord Has Done Great Things', passages: [{ book: 'Psalms', chapter: 126 }], reflection: 'When did the Lord do great things for you? Tell the story out loud today.' },
  { day: 9, title: 'Abounding in Thanksgiving', passages: [{ book: 'Colossians', chapter: 2, verseStart: 6, verseEnd: 7 }], reflection: 'Abounding — not just having, but overflowing. What would overflow-level gratitude look like for you?' },
  { day: 10, title: 'Enter His Gates', passages: [{ book: 'Psalms', chapter: 100 }], reflection: 'We enter worship through thanksgiving. Start your prayer time today with 5 minutes of only gratitude.' },
  { day: 11, title: 'For Everything Give Thanks', passages: [{ book: 'Ephesians', chapter: 5, verseStart: 15, verseEnd: 20 }], reflection: 'What has been hardest to thank God for? Can you begin to move toward thankfulness for it?' },
  { day: 12, title: 'Thanks in the Valley', passages: [{ book: 'Habakkuk', chapter: 3, verseStart: 17, verseEnd: 19 }], reflection: '"Yet I will rejoice." Habakkuk praised when everything was stripped away. What remains when all else is gone?' },
  { day: 13, title: 'Bless the Lord', passages: [{ book: 'Psalms', chapter: 103, verseStart: 1, verseEnd: 5 }], reflection: 'Count your blessings — literally. Write as many as you can in five minutes.' },
  { day: 14, title: 'Thanks Be to God!', passages: [{ book: 'Romans', chapter: 7, verseStart: 24, verseEnd: 25 }, { book: '1 Corinthians', chapter: 15, verseStart: 57, verseEnd: 58 }], reflection: 'He gives us victory. End this plan by writing one letter of gratitude — to God, or to someone in your life.' },
];

// ── Women of the Bible — 21 Days ──────────────────────────────────────────────
const WOMEN_21: ReadingPlanDay[] = [
  { day: 1, title: 'Eve — Made in His Image', passages: [{ book: 'Genesis', chapter: 2, verseStart: 18, verseEnd: 25 }], reflection: 'You were specifically designed and called very good. Do you believe that about yourself?' },
  { day: 2, title: 'Sarah — Laughing at Promises', passages: [{ book: 'Genesis', chapter: 18, verseStart: 1, verseEnd: 15 }], reflection: 'Is there a promise from God you\'ve given up believing? What would it mean to believe again?' },
  { day: 3, title: 'Hagar — God Sees Me', passages: [{ book: 'Genesis', chapter: 16 }], reflection: 'El Roi — the God who sees. Do you feel seen by God today, or hidden?' },
  { day: 4, title: 'Ruth — Loyalty and Love', passages: [{ book: 'Ruth', chapter: 1 }], reflection: 'Ruth\'s loyalty cost her everything. Who in your life deserves that kind of love?' },
  { day: 5, title: 'Hannah — Pouring Out Your Heart', passages: [{ book: '1 Samuel', chapter: 1 }], reflection: 'Hannah prayed with such intensity. What do you long for so deeply you can barely speak it?' },
  { day: 6, title: 'Esther — For Such a Time', passages: [{ book: 'Esther', chapter: 4 }], reflection: 'You are here for such a time as this. What unique opportunity is in front of you right now?' },
  { day: 7, title: 'Mary — Let It Be', passages: [{ book: 'Luke', chapter: 1, verseStart: 26, verseEnd: 56 }], reflection: 'Mary surrendered her entire plan. What plan are you holding onto that God might be asking you to release?' },
  { day: 8, title: 'Elizabeth — Filled with the Spirit', passages: [{ book: 'Luke', chapter: 1, verseStart: 39, verseEnd: 45 }], reflection: 'Elizabeth encouraged Mary at her most vulnerable moment. Who needs your encouragement today?' },
  { day: 9, title: 'The Woman at the Well', passages: [{ book: 'John', chapter: 4, verseStart: 1, verseEnd: 30 }], reflection: 'Jesus offered living water to someone hiding her shame. What shame are you hiding that He longs to heal?' },
  { day: 10, title: 'Mary Magdalene — First Witness', passages: [{ book: 'John', chapter: 20, verseStart: 1, verseEnd: 18 }], reflection: 'Jesus appeared first to Mary Magdalene — once demon-possessed, now first witness of the resurrection. What does that say?' },
  { day: 11, title: 'The Bleeding Woman — Reaching for Healing', passages: [{ book: 'Luke', chapter: 8, verseStart: 43, verseEnd: 48 }], reflection: 'She pressed through the crowd for just a touch of His robe. How desperate are you for a touch from Jesus today?' },
  { day: 12, title: 'Martha — Busy but Missing It', passages: [{ book: 'Luke', chapter: 10, verseStart: 38, verseEnd: 42 }], reflection: 'Are you more of a Martha or Mary right now? What would it look like to choose "the good portion" today?' },
  { day: 13, title: 'Lydia — A Heart God Opened', passages: [{ book: 'Acts', chapter: 16, verseStart: 13, verseEnd: 15 }], reflection: 'Lydia opened her home immediately after conversion. How did you respond when God first opened your heart?' },
  { day: 14, title: 'Phoebe — Servant Leader', passages: [{ book: 'Romans', chapter: 16, verseStart: 1, verseEnd: 2 }], reflection: 'Phoebe served without title or acclaim. What would it mean to serve faithfully with no recognition?' },
  { day: 15, title: 'The Proverbs 31 Woman — Strength and Dignity', passages: [{ book: 'Proverbs', chapter: 31, verseStart: 10, verseEnd: 31 }], reflection: 'She laughs at the days to come because she fears the Lord. What would it take to live with that confidence?' },
  { day: 16, title: 'Deborah — Bold in Faith', passages: [{ book: 'Judges', chapter: 4 }], reflection: 'Deborah led an entire nation without apology. What has God called you to that you\'ve been reluctant to step into?' },
  { day: 17, title: 'Abigail — Wisdom and Courage', passages: [{ book: '1 Samuel', chapter: 25, verseStart: 14, verseEnd: 35 }], reflection: 'Abigail acted wisely even when surrounded by foolishness. Where do you need wisdom over emotion today?' },
  { day: 18, title: 'The Widow of Zarephath — Last Resort Faith', passages: [{ book: '1 Kings', chapter: 17, verseStart: 8, verseEnd: 24 }], reflection: 'She gave her last meal. What\'s the last thing you\'d give? What does that reveal about your trust in God?' },
  { day: 19, title: 'Anna — A Life of Prayer', passages: [{ book: 'Luke', chapter: 2, verseStart: 36, verseEnd: 38 }], reflection: 'Anna prayed and fasted for decades. What has she taught you about persistent faithfulness?' },
  { day: 20, title: 'Rahab — Grace for the Unlikely', passages: [{ book: 'Joshua', chapter: 2 }], reflection: 'A prostitute who became part of Jesus\' lineage. Is there anything in your past you think disqualifies you from God\'s story?' },
  { day: 21, title: 'You — A Woman of Faith', passages: [{ book: 'Hebrews', chapter: 11, verseStart: 1, verseEnd: 16 }], reflection: 'By faith. By faith. By faith. This list includes you. What is your story of faith that God is writing?' },
];

// ── Main export ───────────────────────────────────────────────────────────────
export const READING_PLANS: ReadingPlan[] = [
  {
    id: 'gospels-40',
    title: 'Life of Jesus',
    subtitle: '40 Days Through the Gospels',
    description: 'Walk step by step through the life, words, and resurrection of Jesus across all four Gospels. Perfect for new believers and those wanting a deeper encounter with Christ.',
    duration: 40,
    category: 'bible',
    emoji: '✝️',
    color: '#C8762A',
    estimatedMinutes: 10,
    days: GOSPELS_40,
  },
  {
    id: 'psalms-30',
    title: 'Psalms in 30 Days',
    subtitle: 'A Month of Praise & Prayer',
    description: 'Spend a month in the most honest, emotional, and beloved book of the Bible. The Psalms meet you wherever you are — in joy, grief, fear, or praise.',
    duration: 30,
    category: 'devotional',
    emoji: '🎵',
    color: '#7B5EA7',
    estimatedMinutes: 8,
    days: PSALMS_30,
  },
  {
    id: 'peace-7',
    title: '7 Days of Peace',
    subtitle: 'Overcome Anxiety with Scripture',
    description: 'When worry feels overwhelming, Scripture is your anchor. This 7-day plan walks you through the most powerful verses on peace, calm, and trusting God.',
    duration: 7,
    category: 'topical',
    emoji: '🕊️',
    color: '#4CAF50',
    estimatedMinutes: 6,
    days: PEACE_7,
  },
  {
    id: 'proverbs-31',
    title: 'Proverbs in 31 Days',
    subtitle: 'Daily Wisdom for Life',
    description: 'One chapter of Proverbs a day for 31 days — practical, powerful wisdom for every area of life. Money, relationships, speech, work, and character.',
    duration: 31,
    category: 'bible',
    emoji: '💡',
    color: '#F5A623',
    estimatedMinutes: 7,
    days: PROVERBS_31,
  },
  {
    id: 'nt-90',
    title: 'New Testament in 90 Days',
    subtitle: 'The Complete Story of Jesus',
    description: 'Read the entire New Testament in 90 days — about 15 minutes per day. From the birth of Jesus through Revelation, discover the full story of God\'s rescue plan.',
    duration: 90,
    category: 'bible',
    emoji: '📖',
    color: '#2196F3',
    estimatedMinutes: 15,
    days: buildNT90(),
  },
  {
    id: 'gratitude-14',
    title: '14 Days of Gratitude',
    subtitle: 'Transform Your Heart Through Thanks',
    description: 'Research shows gratitude rewires the brain for joy. This 2-week plan grounds every day in Scripture-based thankfulness that goes far deeper than positive thinking.',
    duration: 14,
    category: 'topical',
    emoji: '🙏',
    color: '#E91E63',
    estimatedMinutes: 7,
    days: GRATITUDE_14,
  },
  {
    id: 'women-21',
    title: 'Women of the Bible',
    subtitle: '21 Days of Courageous Faith',
    description: 'From Eve to Mary Magdalene, discover 21 women whose faith, courage, and imperfect lives shaped redemption history — and what their stories say to you today.',
    duration: 21,
    category: 'devotional',
    emoji: '👑',
    color: '#9C27B0',
    estimatedMinutes: 10,
    days: WOMEN_21,
  },
];

export function getPlanById(id: string): ReadingPlan | undefined {
  return READING_PLANS.find(p => p.id === id);
}

export function getTodaysDayForPlan(startDate: string, duration: number): number {
  const start = new Date(startDate);
  const today = new Date();
  const diff = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.min(diff + 1, duration);
}
