export default function ChangeBanner() {
  return (
    <details className="group max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <summary className="flex items-center gap-2 cursor-pointer list-none select-none bg-amber-50 dark:bg-amber-950 border border-amber-300 dark:border-amber-700 rounded-lg px-4 py-3 text-amber-900 dark:text-amber-100 font-semibold text-sm hover:bg-amber-100 dark:hover:bg-amber-900 transition-colors">
        <span className="inline-block transition-transform duration-200 group-open:rotate-90">▶</span>
        Hey, things changed! What gives?
      </summary>
      <div className="bg-amber-50 dark:bg-amber-950 border border-t-0 border-amber-300 dark:border-amber-700 rounded-b-lg px-4 py-3 text-sm text-amber-800 dark:text-amber-200">
        There was a bug in the tier list calculation. A pretty big one. It's more accurate now, but if you want the details, read on.
        <br /><br />
        When multiple cards land on the same training, they each increase the gains by 5%.
        <br /><br />
        However, I'd implemented this as (1.05 * Cards). Which means if three cards were there, they increased it by 215% instead of by 15%. People had the vague feeling for a while that the tier list overvalued specialty rate, and this is probably why.
        <br /><br />
        Now, it's the correct (1 + 0.05 * Cards). This massively lowers the value of stacked rainbows and accurately represents the true values.
        <br /><br />
        This had several knock-on effects. Fuku became the best card by a mile, because the "Minimum Training Value" was filtering out so many more trainings, her starting stats dwarfed everything. The default weights have been changed, minimum set to zero.
        <br /><br />
        The biggest evidence for this being a good change is the MANT race bonus cards. Sunday Power now tops that list in MANT/TB, but not in Aoharu/Unity. And Kitasan still tops the chart in Speed card builds.
      </div>
    </details>
  )
}
