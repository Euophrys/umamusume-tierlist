export default function ChangeBanner() {
  return (
    <details className="group max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <summary className="flex items-center gap-2 cursor-pointer list-none select-none bg-amber-50 dark:bg-amber-950 border border-amber-300 dark:border-amber-700 rounded-lg px-4 py-3 text-amber-900 dark:text-amber-100 font-semibold text-sm hover:bg-amber-100 dark:hover:bg-amber-900 transition-colors">
        <span className="inline-block transition-transform duration-200 group-open:rotate-90">
          ▶
        </span>
        Hey, things changed! What gives?
      </summary>
      <div className="bg-amber-50 dark:bg-amber-950 border border-t-0 border-amber-300 dark:border-amber-700 rounded-b-lg px-4 py-3 text-sm text-amber-800 dark:text-amber-200">
        The tier list previously counted how much bond all the cards need, and then used that as the target for when the rainbow phase ends. <i>(Every turn, you get "Bond Rate" bond added, and once that number exceeds the total bond required for all your cards, it switches to calculating rainbow gains instead of normal training gains.)</i>
        <br />
        <br />
        Now, it assumes a full deck when it comes to bond, so the bond required before rainbows remains relatively constant whether there are 1 or 5 cards in the deck.
        <br />
        <br />
        Before this change, there was some weird behaviour where certain cards would have their score lowered the more cards you added, since adding them delays the rainbow phase. <i>(e.g. with 3 cards you need, say, 200 bond total after considering starting bond, but adding a fourth increases it to, say, 270 total. With the default 10 bond per turn set, that's an extra 7 turns where the cards aren't rainbowing.)</i>
        <br />
        <br />
        This should be more stable and closer to realistic when you don't have 5 cards selected.
      </div>
    </details>
  )
}
