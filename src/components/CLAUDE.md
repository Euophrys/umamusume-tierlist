This is a tier list about ranking support cards. If you'll be touching the tier list code, you must understand them.

## Game Mechanics

Players can build decks of 6 support cards. In a run, each turn the player has 5 ways to train their uma, and support cards will be randomly distributed among these 5 rooms. Speed, Stamina, Power, Guts, and Wit. (There are other options outside of training too, but not covered in depth in this tier list)

Each training has base benefits for how much stats it gives.

Each card has stats that affect the increase that training gives.

Mood (Motivation) - The uma's mood affects how well she trains, giving her +/- 10% per stage. Generally they are assumed to be at max mood, +20%.

The function for calculating the stat given is: `(BaseValue + Sum of StatBonus) * (1 + MoodMultiplier * (Sum of MoodEffect)) * (Sum of TrainingBonus) * (PRODUCT of FriendshipBonus) * (1 + 0.05 * NumberOfSupportCards)`

For determining if a card appears on a training, each training has a weighting of 100, with a weight of 50 for showing up on no trainings at all. So, each defaults to 100/550.

Specialty Priority is a stat that increases how often the card will land on its preferred training. Specialty adds to the weight, while specialty from the uniques multiplies it as if a percent, the same way Friendship Bonus works. For Kitasan, she has 80 base, so 100 + 80 = 180, then she has unique specialty, so 180 * 1.2 = 216, which is the same as having 116 base. Her Speed appearance rate would be 216/666, or 32.4%.

Only up to 5 cards can appear on the same training, and NPCs sometimes take up slots, but calculating that is beyond the scope of this so we allow all 6 to appear on the same training. It is a rare event anyway.

Other stats of note:

Initial <Stat>: Self explanatory. The card gives that many stats when the run starts.

Wit Friendship Recovery: Only found on Wit and Group cards. Basically Stat Bonus for energy when doing Wit training.

Race Bonus - increases the amount of stats and skill points you gain from finishing a race. No rounding, if you want to go from +3 all to +4 all you need 34% Race Bonus. On most umas, going from 33% to 34% would be +10 all stats.