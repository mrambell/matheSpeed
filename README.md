# matheSpeed

A math learning app for the 3rd and 4th class of German primary school. Plain HTML, CSS and JavaScript: no build step, no server, no accounts, no third-party requests. Installable on a phone or tablet and usable offline.

## What it does

- **Theory**: every topic has a rule, a worked example and a fresh step-by-step example.
- **Practice**: 19 topics (10 for class 3, 9 for class 4), three difficulty levels each, adapting to the child. A daily mission mixes weak and unseen topics.
- **Speed**: 60-second mental math rounds against the child's own record.
- **Help by exception**: a wrong answer or a tap on "Das weiß ich noch nicht" opens the rule and walks through that exact task step by step, then gives a similar task to retry.
- **Motivation**: points and levels, day streak with a forgiving "Pausen-Joker", surprise sticker after each round, badges (including ones for asking for help and for fixing mistakes).

Nothing is a stored list of tasks: every exercise is generated at random from rules.

## Files

```
index.html              page shell, loads everything below
css/style.css           all styling, light (Schulheft) and dark (Schultafel)
js/util.js              random numbers, formatting, answer comparison
js/explain.js           step-by-step explanation builders
js/stories.js           Sachaufgaben, composed from parts
js/money.js             Geld tasks: coins, comma amounts, shopping, change
js/topics.js            the 19 topics: rule, example, generator
js/blitz-data.js        task sets for the speed rounds
js/rewards.js           levels, stickers, badges, praise texts
js/state.js             saved progress, streak, levels
js/fx.js                sounds and confetti
js/views.js             header, navigation, home, topics, theory
js/session.js           practice rounds and the guided explanation
js/blitz.js             speed rounds
js/album.js             sticker and badge collection
js/parents.js           settings, progress table, JSON save and load
js/pwa.js               install prompt and offline registration
js/main.js              buttons, keyboard, start-up
sw.js                   service worker: keeps the app available offline
manifest.webmanifest    name, colours and icons for "Add to Home Screen"
icons/                  app icons
tools/bundle.py         optional: packs everything into one HTML file
```

The scripts are ordinary `<script>` files loaded in order (not ES modules), so the app also runs when `index.html` is opened straight from a folder.

## Deploy

Any static host works. Pick one.

### GitHub Pages (free, repeatable)

1. Push to the `main` branch of this repository.
2. Once only, on GitHub: Settings → Pages → Source "Deploy from a branch" → Branch `main`, folder `/ (root)` → Save.
3. After about a minute the app is live at `https://<user>.github.io/<repo>/`.

Every later push to `main` redeploys automatically. On a free GitHub account the repository must be public for Pages.

### Netlify Drop or Cloudflare Pages (free)

- Netlify: drag the whole folder onto https://app.netlify.com/drop.
- Cloudflare: Workers & Pages → Create → Pages → connect this repository. Build command: none. Output directory: `/`.

### Local test

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. Offline mode and installing need `https` or `localhost`.

## Install on a device ("Add to Home Screen")

Open the deployed address once while online, then:

- **iPhone / iPad**: Safari → Share → "Zum Home-Bildschirm".
- **Android**: Chrome → ⋮ → "App installieren". The app's ⚙ page also shows an install button there.

After that it starts from its own icon, full screen, and works without internet.

Updates: installed devices fetch a new version in the background when they are online. It shows up on the launch after next. There is no version number to bump.

## Saving

Progress is stored in the browser on that device only. Under ⚙ you can save it as a JSON file, or load one, to back up or move to another device.

- Progress belongs to the address the app is opened from. Before changing the address, export the JSON and import it at the new one.
- On iPhone and iPad, Safari may delete a website's data after about a week without visits. Apps added to the Home Screen are not affected, so install it there.

## One-file version

```bash
python3 tools/bundle.py
```

writes `dist/matheSpeed.html`, a single self-contained file you can mail or copy to a device. It has no offline installer; it simply runs wherever it is opened.

## Changing content

- Topics: the `T` array in `js/topics.js`. Each has `rule`, `ex` (example) and `gen(L)`, which returns a task `{t, a, steps}` for level 1 to 3.
- Sachaufgaben: `js/stories.js`. Add a container to `GRP`, a situation to `POOL` or goods to `SHOP` and new stories appear in every operation type.
- Geld: `js/money.js`. Add goods with a price range to `GOODS`.
- Speed rounds: `BL` in `js/blitz-data.js`.
- A new file must also be listed in `index.html` and in `FILES` in `sw.js`.
