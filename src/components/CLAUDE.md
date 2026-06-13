# Support Card Tier List — Codebase Context

This tier list ranks Umamusume support cards. Read this before touching tier list logic.

## Game Mechanics

Players build decks of 6 support cards. Each turn, the player chooses from 5 training rooms — Speed, Stamina, Power, Guts, Wit — and cards are randomly distributed among them.

### Stat Calculation

```
(BaseValue + Sum of StatBonus)
  * (1 + MoodMultiplier * Sum of MoodEffect)
  * Sum of TrainingBonus
  * PRODUCT of FriendshipBonus
  * (1 + 0.05 * NumberOfSupportCards)
```

**Mood (Motivation):** Affects training output by ±10% per stage. Max mood = +20%, assumed by default.

**FriendshipBonus:** Multiplicative. Only applies when a card is on its preferred training type with high bond. This causes a rainbow border — referred to as the card "rainbowing" throughout the code.

### Appearance Rate

Each training slot has a base weight of 100; there's also a weight-50 "no training" option, giving a default appearance rate of 100/550 per card.

**Specialty Priority** increases how often a card lands on its preferred training:
- Base specialty adds directly to the weight
- Unique specialty multiplies the total weight (like FriendshipBonus)

Example — Kitasan: 100 (base) + 80 (specialty) = 180, then × 1.2 (unique) = 216. Speed appearance rate: 216/666 = **32.4%**.

Up to 5 cards can appear on the same training (NPCs can take slots), but the calculator allows all 6 for simplicity — it's a rare edge case.

### Other Stats

| Stat | Description |
|------|-------------|
| Initial `<Stat>` | Bonus stats granted at the start of the run |
| Wit Friendship Recovery | Wit/Group cards only. Acts as StatBonus for energy during Wit training |
| Race Bonus | % increase to stats and skill points gained from races. No rounding — going from +3 to +4 all stats requires 34% Race Bonus |
