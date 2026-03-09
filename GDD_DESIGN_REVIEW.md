# Iron Dominion — GDD Design Review (Mobile F2P Lens)

> **Reviewer:** Claude | **Date:** March 9, 2026
> **Documents reviewed:** GAME_DESIGN_DOCUMENT.md, ECONOMY.md, PROGRESSION.md, MONETIZATION.md, LEVELS.md, MOBILE_UX.md, TECH_STACK.md
> **Framework:** Game Design Principles (core loop, player psychology, balancing, progression, anti-patterns)

---

## Overall Verdict

**Iron Dominion has a strong foundation.** The GDD is unusually thorough for an indie mobile project — it covers core loop, economy, meta-progression, monetization ethics, and mobile UX in interconnected documents that reference each other. The railway-tycoon-meets-puzzle framing is a proven genre on mobile (Mini Metro, Train Valley, Pocket Trains), and the historical era progression gives the game a natural content arc.

That said, there are several design tensions and gaps that could hurt retention, monetization, and the early player experience on mobile. Below is a section-by-section analysis.

---

## 1. Core Loop — Solid, But the 30-Second Hook Is Buried

### What works

The meta loop (play level → earn RP → upgrade → replay harder) is textbook and well-suited to mobile. The in-level flow (build → earn → expand → win) is clear and has a satisfying cadence. The 10–15 minute session target is appropriate for mobile.

### Concerns

**The first 2–4 minutes are pure spending, not earning.** The in-level flow starts with a "Build" phase where the player only spends money. On mobile F2P, the critical window is the first 30–60 seconds — the player needs to *feel* something rewarding almost immediately. Right now, the design says players should see positive income within 2 minutes, but the actual "feel-good moment" (watching a train complete its first route and money tick up) could easily be 3–4 minutes into a level.

**Recommendation:** For at least the first 3–5 levels, pre-place some track or give the player a free starter train that's already running a short route when the level loads. Let them *see revenue immediately*, then challenge them to expand. This is the "Candy Crush first move" principle — show the reward loop before asking the player to create it.

**The core loop is missing a variable reward.** The skill framework identifies variable-ratio reward schedules as the most engaging. Iron Dominion's rewards are entirely fixed: complete a level, get a predictable star rating and RP amount. There's no surprise, no loot, no "what will I get this time?" moment.

**Recommendation:** Consider adding a small variable reward on level completion — a mystery chest with a random cosmetic shard, a bonus RP roll (e.g., "spin for 10–50 bonus RP"), or a random event during gameplay (gold rush on a resource tile, surprise bonus city). Even a small element of surprise dramatically improves the dopamine loop.

---

## 2. Player Psychology — Good for Achievers, Weak for Other Types

### Motivation type coverage

| Type | Coverage | Notes |
|---|---|---|
| **Achiever** | Strong | Stars, career ranks, upgrade tree, 60-level campaign |
| **Explorer** | Moderate | Fog of war, 5 eras, procedural maps in sandbox |
| **Socializer** | Absent | No social features at all |
| **Killer/Competitor** | Weak | "Rival Junction" level hints at competition but it's PvE only |

The game is laser-focused on achievers, which is fine for a strategy game, but you're leaving retention on the table by ignoring socializers entirely. Mobile F2P games live and die on social mechanics — even light ones.

**Recommendations:**
- Add a **weekly leaderboard** for Endless Mode (already mentioned in PROGRESSION.md but not designed in detail). Even a local/friends leaderboard drives competition.
- Consider **asynchronous ghost rivals** — when replaying a level, show a ghost timeline of your best previous run or a friend's run. Zero server cost, adds a competitive layer.
- The Daily Challenges are a good start for re-engagement. Consider adding a community challenge ("Iron Dominion players collectively built 1M track segments this week — bonus RP for everyone").

---

## 3. Economy Balance — Numbers Are Tight but Have Edge Cases

### Revenue vs. cost analysis

The ECONOMY.md revenue estimates assume a 10-hex route with ~3 trips/month. Let's stress-test the early game (Chapter 1):

**Level 1 scenario:** $70K starting funds, connect 2 cities.
- Minimum infrastructure: ~5 track hexes × $500 = $2,500 + 2 stations × $3,000 = $6,000. Total: $8,500.
- Cheapest train (Freight): $5,000. Total spend: $13,500.
- Monthly income from Freight on 5-hex route: ~$1,500/trip × 3 trips = $4,500, minus $50 maintenance, minus ~$25 track maintenance = ~$4,425 net.
- Breakeven: Month 1. Very comfortable.

This seems fine — but $70K starting funds is *extremely* generous for a 2-city connection level. The player will have $56K+ sitting idle. This undercuts the tension the economy is supposed to create.

**Level 4 scenario:** $30K starting funds, connect 4 cities. Now things get interesting — building to 4 cities across hills could easily cost $15K–$20K in track alone, plus $12K in stations. That leaves almost nothing for trains. This could create a frustrating cliff after three easy levels.

### Identified issues

1. **Inconsistency between ECONOMY.md and GDD.** ECONOMY.md says Chapter 1 starting funds are $5,000–$15,000, but the GDD level table shows $30K–$70K. This is a significant discrepancy that needs resolving. The GDD values feel too generous; the ECONOMY.md values might be too tight for a tutorial chapter.

2. **Maintenance scaling feels punitive.** The maintenance-by-era table (Section 5.5 of the GDD) shows costs scaling 1.5× per era. A Freight train costs $50/mo in Steam but $165/mo in Maglev era. But the player doesn't choose when eras advance — it's time-based. So a player who's slow to complete a level gets punished with escalating costs through no fault of their own. This could feel unfair and confusing, especially since the in-level tech tree is separate from era advancement.

   **Recommendation:** Either (a) decouple maintenance scaling from eras and tie it to the player's tech tree choices, or (b) clearly communicate to the player that maintenance will rise as time passes (add a "maintenance forecast" to the economy panel), or (c) soften the scaling curve (1.2× instead of 1.5×).

3. **Train retirement at 25% refund is harsh.** In a 10-minute level, a bad train purchase wastes 75% of that investment. On mobile, where sessions are short and mistakes are easy on a small screen, this feels overly punishing. Consider 40–50% refund, at least in Chapter 1.

---

## 4. Progression Design — Strong Structure, Pacing Risk

### What works

The three-layer progression model (Campaign → Meta-game → Collection) is well-designed and follows mobile best practice. The separation of in-level currency ($) from meta-currency (RP) is clean and avoids confusion. The Upgrade Hub with 3 branches × 5 tiers gives meaningful choices without overwhelming the player.

### Pacing concerns

**The RP economy might be too tight early on.** After completing all 10 Chapter 1 levels at 1-star, a player earns ~200 RP (per ECONOMY.md). The cheapest upgrades cost 60–80 RP. So after an hour of play, the player can afford 2–3 upgrades. That's fine — but the player can't really *feel* most of them.

T1 Steel Rails saves 10% on track cost. On a $500 track segment, that's $50 saved. In a level where you build maybe 15 segments, you save $750 total. On a $30K–$70K budget, this is almost imperceptible.

**Recommendation:** Make the first upgrade in each branch either (a) cheaper (30–40 RP) or (b) more impactful (20–25% reduction instead of 10%). The first upgrade purchase is a critical moment — it needs to feel like a genuine power-up, not a rounding error. Consider a "first upgrade free" mechanic after completing Level 1.

**Career ranks are spaced too far apart.** Track Foreman requires 10 levels (reasonable). Railway Manager requires 25 levels AND 50 stars — that's potentially the entire Chapter 1 and most of Chapter 2 at high performance. The gap between ranks 2 and 3 is very large. Consider adding an intermediate rank at 15–18 levels.

### Missing: Prestige or Reset Mechanic

For a game with 60 levels and an Endless Mode, there's no long-tail retention mechanic beyond star-chasing. Once a player 3-stars everything and maxes upgrades, there's nothing left but Endless Mode. Consider a prestige system where players can reset their campaign progress for cosmetic rewards and a permanent small bonus, giving completionists a reason to replay the whole arc.

---

## 5. Monetization — Ethical and Smart, But Possibly Too Conservative

### What works

The monetization philosophy is excellent. No ads, no energy systems, no dark patterns, no pay-to-win. The "Free chapters 1–2, paid chapters 3–5 for $3.99" model is fair and proven (Alto's Odyssey, Monument Valley approach).

### Concerns

**Revenue projection of $62.5K on 50K downloads is optimistic for this model.** A 25% conversion rate on a chapter unlock for an indie game with no existing brand is very high. Industry benchmarks for premium unlocks in F2P games are closer to 2–5% for non-hypercasual titles. At 5% conversion, you'd be looking at ~$10K from chapter unlocks — not sustainable.

**The cosmetic catalog is too thin.** 3 train skin packs, 3 map themes, and 2 soundtracks. That's ~$10 total spend ceiling per player. Mobile games that survive on cosmetics need a much deeper catalog or a rotating/seasonal shop.

**Recommendations:**
- Consider a **Season Pass** model: $1.99/month for exclusive daily challenges, a seasonal train skin, and 2× RP on replays. This is non-pay-to-win but generates recurring revenue.
- Add **earnable cosmetics** through gameplay (daily challenges, star milestones) alongside paid ones. This makes the cosmetic system visible to all players, not just payers, which increases conversion.
- The $3.99 chapter unlock is correctly positioned. Consider also offering a "Supporter Bundle" at $7.99 that includes all chapters + a cosmetic pack as a perceived value play.
- Lower the conversion rate assumption to 3–5% for financial planning.

---

## 6. Mobile UX — Well-Thought-Out with a Few Gaps

### What works

The 44×44pt touch targets, zoom-gating for building, portrait-first orientation, and compact HUD design all follow mobile best practices. The bottom-sheet pattern for train purchases is exactly right for thumb-reach ergonomics. The decision to hide RP during gameplay and only show it in the Meta Hub is smart and reduces cognitive load.

### Concerns

1. **No haptic feedback design.** TECH_STACK.md lists `@capacitor/haptics` as a dependency, but no design doc specifies when haptics fire. For mobile, haptic feedback is critical for making track-laying and train purchases feel satisfying. Define haptic events: light tap on hex select, medium impact on track placement, success pattern on level complete, warning buzz on approaching bankruptcy.

2. **Notification toast change is too aggressive.** MOBILE_UX.md reduces desktop's 5 simultaneous notifications to 1 mobile toast at 2.5 seconds. In a 10-minute level where multiple trains are running, you could easily miss 80%+ of delivery notifications. Consider a **notification queue** (show them sequentially) or a **notification log** accessible via a bell icon, so players don't feel like they're missing information.

3. **No onboarding for the Meta Hub.** The tutorial covers Levels 1–3 (building, income, stations), but there's no designed onboarding for the Upgrade Hub. The first time a player earns RP and sees the 3-branch tree, they need guidance. Consider a post-Level-1 "tour" that highlights the Upgrade Hub, shows them their RP, and walks them through buying their first upgrade.

4. **Landscape support adds QA burden.** Supporting both orientations means designing and testing two HUD layouts. For Phase 1 / MVP, consider locking to portrait entirely (like most successful mobile strategy games — Clash Royale, Candy Crush). Add landscape in a later update if players request it.

---

## 7. Level Design — Strong Start, Needs Mid-Game Variety

### What works

Chapter 1's 10-level arc is well-paced: each level introduces a new mechanic (terrain costs, mail trains, passenger trains, etc.) in a logical sequence. The 80% completion gate for chapter advancement is forgiving without being trivial. The tutorial flow (Levels 1–3) is appropriately hand-held.

### Concerns

1. **Objective variety is narrow.** Five objective types across 60 levels will feel repetitive by Chapter 3. Most objectives are either "connect N cities" or "earn X income." Consider adding: time-pressure objectives (connect before a rival does), efficiency objectives (use fewer than N track segments), and scenario objectives (survive a disaster that destroys some track).

2. **Chapter 2 is the paywall chapter but isn't fully designed.** The level names and highlights are listed but no detailed configs (starting funds, time limits, star conditions). Since this is the chapter that drives conversion, it needs the most careful design. The first 2–3 levels of Chapter 2 should be the *best levels in the game* to justify the purchase. Design them before anything else.

3. **No difficulty settings.** The skill framework recommends letting players choose difficulty. Consider an optional "Casual Mode" toggle that removes time limits and softens bankruptcy thresholds, with the tradeoff of only earning 1-star maximum. This expands your audience significantly.

---

## 8. Identified Inconsistencies Across Documents

| Issue | Location | Detail |
|---|---|---|
| Starting funds mismatch | ECONOMY.md §1 vs GDD §9.5 | ECONOMY says $5K–$15K for Ch1; GDD shows $30K–$70K |
| RP per star mismatch | ECONOMY.md §5 vs GDD §8.1 | ECONOMY: 20/35/50 RP base; GDD: 40/70/100 RP base |
| Mountain track cost | ECONOMY.md §2 vs GDD §3.2 | ECONOMY: 3× ($1,500); GDD: 4× ($2,000) |
| Hex orientation | GDD §3.1 table vs §3.1 desc | Table says "Pointy-top" but the code description says "flat-top" |
| Station types | GDD §4.2 vs ECONOMY.md §2 | GDD has Junction at $5K; ECONOMY has Junction at $5K but different maintenance |
| T5 Hi-Speed Rail | PROGRESSION.md vs GDD §8.2 | PROGRESSION says "Unlocks Hi-Speed track type"; GDD says "All train speeds +10% additional" |

These inconsistencies need to be resolved before development continues. The GDD should be the source of truth, with ECONOMY.md and PROGRESSION.md updated to match.

---

## 9. Missing Design Areas

| Area | Impact | Priority |
|---|---|---|
| **Onboarding/FTUE flow** | Critical for D1 retention | High |
| **Haptic feedback spec** | Key mobile feel | Medium |
| **Analytics event plan** | Can't optimize what you don't measure | High |
| **A/B test plan** | Economy tuning needs data | Medium |
| **Accessibility beyond basics** | Screen reader support, one-handed mode | Low (Phase 2) |
| **Localization plan** | Revenue unlock (East Asia, Europe) | Medium |
| **Crash/error handling UX** | Auto-save frequency, recovery flow | Medium |
| **Social sharing** | Free marketing (screenshot of 3-star win) | Low |
| **App store metadata** | Screenshots, description, ASO keywords | Medium |
| **Player feedback loop** | In-app feedback button, bug reporting | Low |

---

## 10. Summary Scorecard

| Design Area | Score | Notes |
|---|---|---|
| Core Loop | 7/10 | Solid structure, needs faster first reward and variable rewards |
| Player Psychology | 6/10 | Strong for achievers, missing social and competitive hooks |
| Economy Balance | 7/10 | Good framework, numerical inconsistencies, some edge cases |
| Progression | 8/10 | Best-designed area; three-layer model is excellent |
| Monetization | 7/10 | Ethical and clear, but possibly too conservative for sustainability |
| Mobile UX | 8/10 | Well-designed, minor gaps (haptics, onboarding, notifications) |
| Level Design | 6/10 | Chapter 1 strong, Chapters 2–5 underdesigned, limited objective variety |
| Documentation | 7/10 | Thorough but has cross-document inconsistencies |
| **Overall** | **7/10** | Strong foundation that needs focused iteration on early game feel, social features, and monetization depth |

---

## Top 5 Priorities

1. **Resolve document inconsistencies** (especially economy numbers) — without a single source of truth, implementation will drift.
2. **Redesign the first 60 seconds of gameplay** — pre-placed track/train, instant gratification, then hand control to the player.
3. **Design Chapter 2 in detail** — it's the conversion chapter, and right now it's just a list of names.
4. **Add variable rewards** — a small random element on level completion dramatically improves retention.
5. **Deepen the cosmetic catalog and consider a Season Pass** — the current monetization ceiling is too low for sustainability.

---

*This review is based on the design documents as of March 2026. Recommendations should be validated through playtesting and player data once the MVP is in testers' hands.*
