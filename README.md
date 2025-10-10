## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Updating the Global Tier List

* Navigate to src/global and open a terminal/powershell/etc window
* Run `db-convert.py` with the path to your master.db. On Windows, this is typically in `C:\Users\your username here\AppData\LocalLow\Cygames\Umamusume\master`
* If there are any warnings thrown, a card has a new effect, or the database format has changed
* * If the format has changed, you can probably just replace `src/global/db-convert.py` with `./db-convert.py`
* * Otherwise, copy the new effects from `./db-convert.py` into `src/global/db-convert.py` and run it again
* That will update cards.js
* Run `npm install` and `npm run start` to confirm that the new card is present.
* Make a pull request with the updated file

## Updating the JP Tier List

* Open a terminal/powershell/etc window in the root
* Run `db-convert.py` with the path to your master.db. On Windows, this is typically in `C:\Users\your username here\AppData\LocalLow\Cygames\Umamusume\master`
* If there are any warnings thrown, it means one of the new cards has a new effect.
* * Open the `db-convert.py` file and add support for the new effect. If possible, convert it to an existing effect so you don't have to change the actual tier list code.
* * If you do have to change the actual tier list code, it's in `src/components/TierList.js` and I wish you luck
* Move the generated cards.js file from the root into `src`.
* Add the card images to `public/cardImages`. I just use the icons from `https://gametora.com/umamusume/supports`, maybe they could be taken from the game files.
* Add the stats the cards give from events to `src/card-events.js`. Assume the best outcomes from reasonable cards (no agemasen, but also, not Fuku's +77), assume the player wants to take the path to the gold skill (no early chain ends), and otherwise use your best guess as to which option is better. You can run `event_extract.py` to take these from uma tools automatically, if uma tools has been updated, but it might not give accurate results.
* Run `npm install` and `npm run start` to confirm nothing exploded.
* Make a pull request with the updated files and images

## Updating the Tier List Site
It's hard to confirm by looking at the build whether you did anything weird, so I'll probably only accept this if I trust you or there's extenuating circumstances.

* Run `npm install` and `npm run start` to confirm the state is okay.
* Run `npm run build`
* Fork the `https://github.com/Euophrys/uma-tiers` repo.
* Copy the files from the `build` folder into the root of that repo.
* Make a pull request